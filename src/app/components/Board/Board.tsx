'use client'

import { useBoardStore } from '@/app/state/boardStore'
import { BoardModel } from '@/app/types/board'
import { useEffect, useState } from 'react'
import { DEFAULT_BG_IMAGE, DEFAULT_BOARD } from '@/app/configs'
import BoardFound from './BoardFound'
import ColumnList from '../Column/ColumnList'
import { useToastStore } from '@/app/state/toastStore'
import { SkeletonBoard } from '../Skeleton'

const Board = () => {
  const { showToast, removeToast } = useToastStore()
  const { boards, getBoard, addBoard } = useBoardStore()

  const [board, setBoard] = useState<BoardModel | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  setTimeout(() => setIsLoading(false), 300)

  useEffect(() => setBoard(
    getBoard(boards[0]?.boardId ?? DEFAULT_BOARD.boardId)
  ), [boards, getBoard])

  const createNewBoard = () => {
    addBoard(DEFAULT_BOARD)
    showToast('success', 'New Board created.')
    setTimeout(() => removeToast(), 2000)
  }

  return (
    <section className="w-full h-auto rounded-xl shadow-sm overflow-hidden text-white max-w-[90%] mb-10 md:scale-100 scale-95">
      <div
        className="w-full h-full relative text-black dark:text-white"
        style={{
          backgroundImage: `url(${DEFAULT_BG_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-white/20 dark:bg-black/30"></div>
        {isLoading && (
          <div className="relative z-10 px-5 md:px-8 py-5 md:flex flex-col justify-start dark:hidden">
            <SkeletonBoard />
          </div>
        )}
        <div className="relative z-10 px-5 md:px-8 py-5 flex flex-col justify-start">
          {board && !isLoading
            ? <BoardFound board={board} />
            : !isLoading && (
              <div className="w-full flex flex-col justify-start items-start text-[#756765]/70 dark:text-zinc-200">
                <h1
                  className="font-semibold text-lg"
                >
                  No boards have been created yet.
                </h1>
                <button
                  className="text-start underline bg-transparent border-0"
                  onClick={createNewBoard}
                >
                  Click here to create new board!
                </button>
              </div>
            )}
        </div>

        {boards.length > 0 && board && <ColumnList />}
      </div>
    </section>
  )
}

export default Board
