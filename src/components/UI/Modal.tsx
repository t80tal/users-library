import BaseModal from 'react-modal'

type Props = {
  isOpen: boolean
  closeHandler: () => void
  className?: string
  children: React.ReactNode
}

const Modal = ({ isOpen, closeHandler, children, className }: Props) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={closeHandler}
      className={`modal ${className || ''}`}
      overlayClassName="modal-overlay"
    >
      {children}
    </BaseModal>
  )
}

export default Modal
