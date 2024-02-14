'use client'

import { useBoardStore } from '@/app/state/boardStore'
import { useModalStore } from '@/app/state/modalStore'
import { useToastStore } from '@/app/state/toastStore'
import { BoardModel } from '@/app/types/board'
import { useState } from 'react'

interface BoardContentModalProps {
  boardId: string
}

const BoardContentModal: React.FC<BoardContentModalProps> = ({ boardId }) => {
  const { getBoard, editBoard } = useBoardStore()
  const { showToast, removeToast } = useToastStore()
  const { removeModal } = useModalStore()

  const [board, setBoard] = useState<BoardModel>(getBoard(boardId) ?? {
    name: '',
    createdAt: new Date(),
    boardId: '',
    description: '',
    ownerId: '',
    backgroundImage: null,
  })

  const saveSettings = () => {
    if (board.name.includes('<') || board.name.includes('>') ||
        board.description.includes('<') || board.description.includes('>')) {

      showToast('error', 'Something went wrong!')
      setTimeout(() => removeToast(), 2000)
      return
    }
    editBoard(board)

    showToast('success', 'Edited successfully!')
    setTimeout(() => removeToast(), 2000)

    removeModal()
  }

  return (
    <div className="p-4 text-black dark:text-white max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="boardName" className="block text-sm mb-1">
          Edit Board Name
        </label>
        <input
          type="text"
          id="boardName"
          defaultValue={board.name ?? ''}
          onChange={(e) => setBoard( prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border rounded focus:outline-none dark:bg-transparent"
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            saveSettings()
          }}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="boardDescription" className="block text-sm mb-1">
          Edit Board Description
        </label>
        <input
          type="text"
          id="boardDescription"
          defaultValue={board.description ?? ''}
          onChange={(e) => setBoard( prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border rounded focus:outline-none dark:bg-transparent"
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            saveSettings()
          }}
        />
      </div>

      <button
        type="button"
        onClick={saveSettings}
        className="w-full mt-4 px-4 py-2 border-2 border-solid border-lime-300 dark:bg-lime-500/50 bg-lime-300 text-black dark:text-white rounded"
      >
        Save Board
      </button>
    </div>
  )
}

export default BoardContentModal
