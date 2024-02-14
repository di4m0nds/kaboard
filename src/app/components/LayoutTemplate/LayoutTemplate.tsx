// import React, { useEffect } from 'react'
// import {
//   Modal,
//   Toast,
//   ToolsBar,
// } from '../'
// import { useModalStore } from '../../state/modalStore'
// import { useToastStore } from '../../state/toastStore'

/* export default function Layout({ children }: { children: React.ReactNode}) {
  const { isToastVisible, status, heading } = useToastStore()
  const { isModalVisible, children: child, removeModal } = useModalStore()

  const bgBallsClassName = 'absolute rounded-full mix-blend-multiply filter blur-xl w-72 h-72 opacity-50 animate-blob dark:mix-blend-normal'

  useEffect(() => {
    if (isModalVisible) {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') removeModal()
      }, false)
    }
  }, [isModalVisible])

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
              <h1 data-testid="Kaboard" className="text-4xl font-semibold">
                Ka<span className="text-lime-600 font-bold">board</span>
              </h1>
            </div>
            <ToolsBar />
          </section>
        </header>

        <main className="flex justify-center items-center">
          {children}
        </main>
      </section>
    </>
  )
} */
