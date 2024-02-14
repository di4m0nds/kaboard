'use client'

import React, { useEffect } from 'react'
import {
  Modal,
  Task,
  TaskContentModal,
  Toast,
  ToolsBar,
} from '../../components'
import { useModalStore } from '../../state/modalStore'
import { useToastStore } from '../../state/toastStore'
import { useTaskStore } from '@/app/state/taskStore'
import Link from 'next/link'
const TaskView = ({ params }: { params: { id: string } }) => {
  const { isToastVisible, status, heading } = useToastStore()
  const { isModalVisible, children: child, removeModal } = useModalStore()
  const { getTask } = useTaskStore()

  const bgBallsClassName = '-z-10 absolute rounded-full mix-blend-multiply filter blur-xl w-72 h-72 opacity-50 animate-blob dark:mix-blend-normal'

  useEffect(() => {
    if (isModalVisible) {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') removeModal()
      }, false)
    }
  }, [isModalVisible, removeModal])

  return (
    <>
      <div className='w-full flex text-center justify-center items-center'>
        <Toast varient={status} heading={heading} isToastVisible={isToastVisible} />
      </div>
      <Modal isModalVisible={isModalVisible}>
        {child}
      </Modal>
      <div className={`
        ${bgBallsClassName}
        top-[6%] left-[4%]
        md:top-[20%] md:left-[30%]
        bg-lime-400
        animation-delay-2000
      `} />
      <div className={`
        ${bgBallsClassName}
        bottom-[6%] left-[7%]
        md:bottom-[20%] md:left-[15%]
        bg-yellow-400
        animation-delay-4000
      `} />
      <div className={`
        ${bgBallsClassName}
        top-[6%] right-[8%]
        md:top-[30%] md:right-[30%]
        bg-sky-400
      `} />
      <div className={`
        ${bgBallsClassName}
        bottom-[6%] right-[6%]
        md:bottom-[30%] md:right-[20%]
        bg-red-400
        animation-delay-4000
      `} />

      <section className="z-30">
        <header className="w-full">
          <section className="max-w-[87%] flex justify-between items-center mx-auto">
            <div className="py-5">
              <Link href='/' data-testid="Kaboard" className="text-4xl font-semibold">
                Ka<span className="text-lime-500 font-bold">board</span>
              </Link>
            </div>
            <ToolsBar />
          </section>
        </header>

        <main className="mt-[2%] p-10 rounded-xl shadow-sm bg-white/50 dark:bg-black/40 flex flex-col md:flex-row justify-center items-start z-30 gap-x-16">
          {getTask(params.id) ? (
            <>
              <TaskContentModal columnId='' taskId={params.id} />
              <div className="hover:scale-110 duration-150">
                <h1 className="text-2xl">Preview</h1>
                <Task task={getTask(params.id)!} />
              </div>
            </>
          ) : (<h2>Something is wrong!</h2>) }
        </main>
      </section>
    </>
  )
}

export default TaskView
