'use client'

import { useEffect, useRef, useState } from 'react'
import { ColumnContentModal, TaskContentModal, TaskList } from '../'
import { UniqueIdentifier } from '@dnd-kit/core'
import { PenIcon, PlusIcon, Settings } from '../svg'
import { useColumnStore } from '@/app/state/columnStore'
import { ColumnModel } from '@/app/types/column'
import { useToastStore } from '@/app/state/toastStore'
import { applyStylingToKeywords } from '@/app/utils/functions'
import { useTaskStore } from '@/app/state/taskStore'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useModalStore } from '@/app/state/modalStore'

interface ColumnProps {
  columnId: string
  columnData: ColumnModel
}

const Column = ({ columnId, columnData }: ColumnProps) => {
  const { columns, editColumn } = useColumnStore()
  const { tasks } = useTaskStore()
  const { showToast, removeToast } = useToastStore()
  const { showModal } = useModalStore()

  const inputRef = useRef<HTMLInputElement>(null)

  const [editMode, setEditMode] = useState(false)
  const [data, setData] = useState<ColumnModel | null>(columns.find(col => col.columnId === columnId) ?? null)

  useEffect(() => {
    const column = columns.find(col => col.columnId === columnId)
    if (column) {
      setData(column)
    }
    if (inputRef.current) inputRef.current.focus
  }, [columns, columnId])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data?.columnId as UniqueIdentifier,
    data: {
      type: 'Column',
      columnData,
    },
  })

  const openColumnModal = () => {
    showModal((
      <ColumnContentModal column={columnData} />
    ))
  }

  const openTaskModal = () => {
    showModal((
      <TaskContentModal columnId={columnId} taskId={null} />
    ))
  }

  const saveNewName = () => {
    setEditMode(false)
    const localData = columns.find(col => col.columnId === columnId)
    if (data === null || data.name === '') {
      showToast('error', 'Empty field.')
      setTimeout(() => removeToast(), 2000)
      setData(localData ?? data)
      if (inputRef.current) inputRef.current.value = columns.find(col => col.columnId === columnId)?.name ?? 'Column Name'
      return true
    } else if (data.name.includes('<') || data.name.includes('>')) {
      showToast('error', 'You can\'t do that.')
      setTimeout(() => removeToast(), 2000)
      setData(localData ?? data)
      if (inputRef.current) inputRef.current.value = columns.find(col => col.columnId === columnId)?.name ?? 'Column Name'
      return true
    }
    if (localData) {
      if (localData.name === data.name) return
    }
    editColumn(data)

    showToast('success', 'Edited successfully!')
    setTimeout(() => removeToast(), 2000)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Translate.toString(transform),
          transition,
          height: (tasks.filter((task) => task.currentStage === columnId).length * 272),
        }}
        className="
          opacity-40
          border-4
          border-lime-500
          w-[342px]
          rounded-md
          flex
          flex-col
        "
      ></div>
    )
  }


  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className="min-h-[300px] h-auto text-black dark:text-white pt-2 pb-4 px-4 rounded-xl border-4 border-transparent dark:hover:border-white/20 hover:border-zinc-300/30"
    >
      <header
        className="rounded-xl flex justify-center items-center"
      >
        {!editMode && data?.name &&
          <h2
            onClick={() => setEditMode(true)}
            className="min-w-60 max-w-72 group"
          >
            <span dangerouslySetInnerHTML={{ __html: applyStylingToKeywords(data?.name) }}></span>
            <span><button><PenIcon className="w-4 h-4 ml-1 hidden group-hover:block hover:scale-110" /></button></span>
            <span className="font-semibold text-zinc-400 dark:text-zinc-200 text-sm ml-1">
              ({tasks.filter((task) => task.currentStage === columnId).length})
            </span>
          </h2>
        }
        {editMode && (
          <input
            className="bg-transparent rounded w-60 input-columnName"
            maxLength={24}
            defaultValue={data?.name ?? ''}
            ref={inputRef}
            autoFocus={true}
            onChange={(e) => data !== null ? setData({ ...data, name: e.target.value }) : ''}
            onBlur={saveNewName}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return
              saveNewName()
              if (inputRef.current) inputRef.current.blur()
            }}
          />
        )}

        <div className="flex justify-center items-center gap-x-4">
          <button
            className="w-auto h-auto p-0 m-0 hover:scale-95"
            title="New Task"
            onClick={openTaskModal}
          >
            <PlusIcon className="w-4 h-5 text-black dark:text-white" />
          </button>

          <button
            className="w-auto h-auto p-0 m-0 hover:scale-95"
            title="Settings"
            onClick={() => openColumnModal()}
          >
            <Settings className="w-5 h-5 text-black dark:text-white" />
          </button>

          <div className="w-[2px] h-8 rounded-full bg-[#756765] dark:bg-zinc-200" />
        </div>
      </header>

      <section className="relative flex flex-col items-center">
        <TaskList columnId={columnId} />
      </section>
    </div>
  )
}

export default Column
