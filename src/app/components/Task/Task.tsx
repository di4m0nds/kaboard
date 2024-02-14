'use client'

import { TaskModel } from '@/app/types/task'
import { applyStylingToKeywords } from '@/app/utils/functions'
import { BinIcon, ExternalLinkIcon, PenIcon } from '../svg'
import { useSortable } from '@dnd-kit/sortable'
import { useColumnStore } from '@/app/state/columnStore'
import { useEffect, useState } from 'react'
import { useModalStore } from '@/app/state/modalStore'
import { TaskContentModal } from '..'
import { useTaskStore } from '@/app/state/taskStore'
import Link from 'next/link'

interface TaskProps {
  uniqueId?: string
  task: TaskModel
}

const Task = ({ task }: TaskProps) => {
  const { showModal } = useModalStore()
  const { columns, getColumn } = useColumnStore()
  const { removeTask } = useTaskStore()

  const { title, description, color, comments, plannedStartDate, plannedEndDate, tags } = task

  const [progressBar, setProgressBar] = useState<number>(0)

  const pSD = new Date(plannedStartDate ?? new Date)
  const pED = new Date(plannedEndDate ?? '')
  const iconsSize = 'w-6 h-5'

  const formatDate = (date: Date) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    return `${month} ${day}`
  }

  const editTask = () => {
    showModal((
      <TaskContentModal columnId={getColumn(task.currentStage)?.columnId ?? ''} taskId={task.taskId} />
    ))
  }

  const deleteTask = () => {
    removeTask(task.taskId)
  }

  const {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
  } = useSortable({
    id: task.taskId,
    data: {
      type: 'Task',
      task,
    },
  })

  useEffect(() => {
    let currentColumnPosition = 0
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].columnId === task.currentStage) {
        currentColumnPosition = i + 1
        break
      }
    }

    const percentage = Math.floor((currentColumnPosition * 100) / columns.length)
    setProgressBar(percentage)
  }, [])

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{ border: `4px solid ${color}` }}
        {...attributes}
        {...listeners}
        className="opacity-30 p-2.5 h-[248px] mt-4 items-center flex text-left rounded-xl border-4 border-lime-500 relative"
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ border: `2px solid ${color}`, cursor: isDragging ? 'grabbing' : 'grab', background: `${color}10` }}
      className="w-[300px] p-4 hover:shadow-md duration-200 rounded-xl mt-4 border-[2px] border-solid border-lime-500 group"
    >

      <div className="flex gap-x-2 items-center justify-between mb-2">
        {plannedStartDate  && (
          <p
            style={{ border: `2px solid ${color}`, background: `${color}10` }}
            className="border-2 border-solid border-lime-500 py-[2px] px-2 rounded-md text-sm"
          >
            {formatDate(new Date(pSD.getTime() + pSD.getTimezoneOffset() * 60 * 1000))} - {plannedEndDate ? formatDate(new Date(pED.getTime() + pED.getTimezoneOffset() * 60 * 1000)) : 'Infinity'}
          </p>
        )}

        <div className="flex gap-x-2 hidden">
          <div className="flex items-center text-zinc-500 dark:text-zinc-200" title='Comming soon!'>
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 5h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2v3l-4-3H8m4-13H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2v3l4-3h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
            </svg>
            <span className="px-1 py-1 text-xs font-bold">{comments.length}</span>
          </div>

          <p className="py-[2px] px-2 my-2 rounded-md text-black bg-yellow-300 text-sm">
            Important
          </p>
        </div>
      </div>

      <h2
        className="text-2xl font-medium text-black dark:text-white text-pretty"
        dangerouslySetInnerHTML={{ __html: applyStylingToKeywords(title, color) }}
      ></h2>

      <p
        className="text-sm md:text-[16px] font-normal text-black/60 dark:text-white/80 text-pretty mt-2"
        dangerouslySetInnerHTML={{ __html: applyStylingToKeywords(description, color) }}
      ></p>


      <div className="flex flex-wrap w-[80%]">
        {tags.map((tag, i) => <span key={i} className="mt-3 mr-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-md text-xs">{tag}</span>)}
      </div>

      <div className="hidden group-hover:flex flex-col gap-y-1 mt-3" title={`Current Progress: ${progressBar}%`}>
        <span className="text-xs font-semibold">In Progress</span>
        <div
          style={{ background: `${color}50` }}
          className="w-full h-2 rounded-full bg-gray-200 dark:bg-zinc-600"
        >
          <div
            style={{ width: `${progressBar}%`, background: `${color}` }}
            className="h-full rounded-full bg-lime-300"
          ></div>
        </div>
      </div>

      <section className={`
        hidden group-hover:flex
        justify-between items-center
        mt-4 gap-x-2 md:gap-x-5 group 
        text-black/20 dark:text-white/40
        hover:text-black/80 hover:dark:text-white
        cursor-auto duration-300
      `}>
        <button onClick={deleteTask} className="cursor-pointer" title="Delete Task">
          <BinIcon className={`${iconsSize} duration-200 hover:scale-110 hover:text-red-500`} />
        </button>

        <button onClick={editTask} className="cursor-pointer" title="Edit Task">
          <PenIcon className={`${iconsSize} duration-200 hover:scale-110 hover:text-yellow-500`} />
        </button>

        <Link href={`/TaskView/${task.taskId}`} className="cursor-pointer" title="Task">
          <ExternalLinkIcon className={`${iconsSize} duration-200 hover:scale-110 hover:text-blue-500`} />
        </Link>
      </section>
    </div>
  )
}

export default Task
