'use client'

import { useColumnStore } from '@/app/state/columnStore'
import { useToastStore } from '@/app/state/toastStore'
import { ColumnModel } from '@/app/types/column'
import { applyStylingToKeywords, generateID } from '@/app/utils/functions'
import React, { useEffect, useRef, useState } from 'react'
import { BinIcon } from '../svg'
import { useModalStore } from '@/app/state/modalStore'
import { useTaskStore } from '@/app/state/taskStore'

interface ColumnContentModalProps {
  column: ColumnModel | null
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

const ColumnContentModal: React.FC<ColumnContentModalProps> = ({ column }) => {
  const { addColumn, editColumn, getColumn, removeColumn } = useColumnStore()
  const { tasks, removeTask } = useTaskStore()
  const { showToast, removeToast } = useToastStore()
  const { removeModal } = useModalStore()

  const inputRef = useRef<HTMLInputElement>(null)

  const [columnName, setColumnName] = useState('')

  useEffect(() => {
    setColumnName(column?.name ?? '')
    if (inputRef.current) {
      inputRef.current.focus
      inputRef.current.value = column?.name ?? ''
    }
  }, [column])

  const deleteColumn = () => {
    if (column) {
      const columnTasks = tasks.filter(task => task.currentStage === column.columnId)
      columnTasks.forEach(task => removeTask(task.taskId))
      removeColumn(column?.columnId)
      showToast('success', 'Removed correctly!')
      setTimeout(() => removeToast(), 2000)
      removeModal()
      return
    }

    setColumnName('')
    removeModal()

    showToast('error', 'Something went wrong.')
    setTimeout(() => removeToast(), 2000)
  }

  const saveSettings = () => {
    if (!columnName && !column) {
      showToast('error', 'Empty Field.')
      setTimeout(() => removeToast(), 2000)
      return
    }

    if (!columnName) {
      showToast('error', 'Something went wrong.')
      setTimeout(() => removeToast(), 2000)
      return
    }

    if (column && getColumn(column.columnId)) {
      showToast('success', 'Edited successfully!')
      setTimeout(() => removeToast(), 2000)
      column.name = columnName
      editColumn(column)
    } else {
      addColumn({
        columnId: generateID(),
        name: columnName,
        createdAt: new Date(),
        color: null,
        boardId: '---',
        owner: '---',
        status: 1,
      })
      showToast('success', 'Created successfully!')
      setTimeout(() => removeToast(), 2000)
    }

    setColumnName('')
    if (inputRef.current) {
      inputRef.current.focus
      inputRef.current.value = column?.name ?? ''
    }
    removeModal()
  }

  return (
    <div className="p-4 text-black dark:text-white max-w-md mx-auto">
      {column
        ? <h2 className="text-2xl font-semibold mb-4">
          <span dangerouslySetInnerHTML={{ __html: applyStylingToKeywords(`${column?.name}&apos;s Settings`) }}></span>
        </h2>
        : <h2 className="text-2xl font-semibold mb-4">New Column</h2>
      }

      <div className="mb-4">
        <label htmlFor="columnName" className="block text-sm mb-1">
          {column ? 'Edit ' : ''}Column Name:
        </label>
        <input
          ref={inputRef}
          type="text"
          id="columnName"
          maxLength={24}
          defaultValue={column ? column?.name : ''}
          onChange={(e) => setColumnName(e.target.value)}
          className={`w-full px-3 py-2 border rounded focus:outline-none ${columnName ? 'border-lime-500' : 'border-red-500'} dark:bg-transparent`}
          autoFocus={true}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            saveSettings()
          }}
        />
      </div>

      {column && <button
        type="button"
        onClick={deleteColumn}
        className={`
          text-red-600 flex gap-x-2 justify-start items-center
          px-4 py-0
          border-2 border-solid border-red-500 rounded-lg
          hover:bg-red-400 hover:text-white
          mb-4
        `}
      >
        <span><BinIcon className="w-4 h-4" /></span>
        Remove
      </button>}

      <button
        type="button"
        onClick={saveSettings}
        className="w-full mt-4 px-4 py-2 border-2 border-solid border-lime-300 dark:bg-lime-500/50 bg-lime-300 text-black dark:text-white rounded"
      >
        Save Column
      </button>
    </div>
  )
}

export default ColumnContentModal
