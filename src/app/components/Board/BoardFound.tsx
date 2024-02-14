'use client'

import { BoardModel } from '@/app/types/board'
import { PlusIcon, Settings } from '../svg'
import { ColumnContentModal } from '..'
import { applyStylingToKeywords } from '@/app/utils/functions'
import { useColumnStore } from '@/app/state/columnStore'
import { useModalStore } from '@/app/state/modalStore'
import BoardContentModal from '../Modal/BoardContentModal'

interface BoardFoundProps {
  board: BoardModel
}
const BoardFound = ({ board }: BoardFoundProps) => {
  const { showModal } = useModalStore()
  const { columns } = useColumnStore()

  const { name, description, boardId } = board

  const openBoardPopUp = () => {
    showModal((
      <BoardContentModal boardId={boardId} />
    ))
  }

  const openCreateColumnPopUp = () => {
    showModal((
      <ColumnContentModal column={null} />
    ))
  }

  return (
    <>
      <header className="w-full flex justify-start items-center relative">
        <section className="w-full text-black dark:text-white">
          <h1
            className="text-4xl font-bold group"
            dangerouslySetInnerHTML={{ __html: applyStylingToKeywords(name) }}
          ></h1>
          <p
            className="mt-2 text-pretty w-full md:w-[60%] text-xl font-normal group"
            dangerouslySetInnerHTML={{ __html: applyStylingToKeywords(description) }}
          ></p>

          <nav className={`w-full ${name !== '' || description !== '' ? 'mt-5' : 'mt-0'}`}>
            <ul className="flex gap-x-2">
              <li className="flex flex-col md:flex-row items-start md:items-end">
                <button
                  data-testid="Edit Board"
                  className={`
                    group text-black dark:text-white
                    flex gap-x-2 justify-center items-center
                    px-4 py-2 rounded-xl
                    border-2 border-solid border-lime-300/70
                    hover:scale-[95%] hover:bg-lime-300/70 hover:shadow-lg
                    bg-lime-200/60
                    dark:bg-lime-600 dark:hover:bg-lime-500 
                    active:scale-100
                    duration-200
                  `}
                  onClick={openBoardPopUp}
                >
                  <Settings className="w-4 h-4 group-hover:scale-75 duration-300" />Edit Board
                </button>
              </li>
              <li className="flex flex-col md:flex-row items-start md:items-end">
                <button
                  data-testid="New Column"
                  className={`
                    group text-black dark:text-white
                    flex gap-x-2 justify-center items-center
                    px-4 py-2 rounded-xl
                    border-2 border-solid border-lime-300/70
                    hover:scale-[95%] hover:bg-lime-300/70 hover:shadow-lg
                    bg-lime-200/60
                    dark:bg-lime-600 dark:hover:bg-lime-500 
                    active:scale-100
                    duration-200
                  `}
                  onClick={openCreateColumnPopUp}
                >
                  <PlusIcon className="w-4 h-4 group-hover:scale-75 duration-300" />New Column
                </button>
                <span className="text-sm text-gray-400 ml-2">{columns.length} columns created.</span>
              </li>
            </ul>
          </nav>
        </section>
        <p className="w-full text-right text-9xl text-gray-100 dark:text-gray-800/20 font-bold hidden md:block absolute right-2 z-[-10] select-none">
          #{boardId}
        </p>
      </header>
    </>
  )
}

export default BoardFound
