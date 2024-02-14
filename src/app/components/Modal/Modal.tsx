import { useModalStore } from '@/app/state/modalStore'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  isModalVisible?: boolean
}

const Modal: React.FC<ModalProps> = ({
  children,
  isModalVisible,
}) => {
  const { removeModal } = useModalStore()
  const visibility = isModalVisible ? 'block' : 'hidden'

  return (
    <div className={`modal fixed ${visibility} inset-0 z-40 overflow-auto bg-smoke flex items-center justify-center`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white/90 dark:bg-zinc-900/80 w-11/12 md:max-w-md mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
        <header className="modal-header py-2 px-5">
          <button className="float-right text-gray-700 dark:text-zinc-400 hover:text-gray-900" onClick={removeModal}>
            <span className="text-4xl">&times;</span>
          </button>
        </header>

        <div className="modal-body p-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
