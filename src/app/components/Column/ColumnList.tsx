'use client'

import { useColumnStore } from '@/app/state/columnStore'
import { Column, Task } from '..'

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove
} from '@dnd-kit/sortable'

import { useMemo, useState } from 'react'
import { ColumnModel } from '@/app/types/column'
import { TaskModel } from '@/app/types/task'
import { useTaskStore } from '@/app/state/taskStore'
import { createPortal } from 'react-dom'
import SkeletonColumn from '../Skeleton/SkeletonColumn'

const ColumnList = () => {
  const { columns, setColumns } = useColumnStore()
  const { setTasks, tasks } = useTaskStore()

  const columnsId = useMemo(() => columns.map((col) => col.columnId), [columns])

  const [activeColumn, setActiveColumn] = useState<ColumnModel | null>(null)
  const [activeTask, setActiveTask] = useState<TaskModel | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  setTimeout(() => setIsLoading(false), 300)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
      return
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAColumn = active.data.current?.type === 'Column'
    if (!isActiveAColumn) return

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.columnId === activeId)

      const overColumnIndex = columns.findIndex((col) => col.columnId === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timer)
      timer = setTimeout(() => func.apply(this, args), delay)
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveTask = active.data.current?.type === 'Task'
    const isOverTask = over.data.current?.type === 'Task'

    if (!isActiveTask) return

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.taskId === activeId)
        const overIndex = tasks.findIndex((t) => t.taskId === overId)

        if (tasks[activeIndex].currentStage !== tasks[overIndex].currentStage) {
          tasks[activeIndex].currentStage = tasks[overIndex].currentStage
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    if (isActiveTask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.taskId === activeId)

        tasks[activeIndex].currentStage = overId.toString()
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={debounce(onDragOver, 80)}
    >
      <div className="relative p-2 overflow-x-auto bg-gray-100/40 dark:bg-transparent">
        <ul className="flex  gap-x-4 justify-start min-h-[100px]">
          <SortableContext items={columnsId}>
            {!isLoading && columns.length > 0
              ? columns.map((data, i) =>
                <li key={i}>
                  <Column columnData={data} columnId={data.columnId} />
                </li>
              ) : !isLoading && (
                <h3 className="w-full flex justify-center text-[#756765]/60 font-semibold text-lg">
                  No columns have been created yet.
                </h3>
              )
            }
          </SortableContext>
        </ul>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <Column columnData={activeColumn} columnId={activeColumn.columnId} />
          )}
          {activeTask && (
            <Task task={activeTask} />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}

export default ColumnList
