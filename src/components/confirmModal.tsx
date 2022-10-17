import { Dialog } from '@headlessui/react'

interface ConfirmModalProps {
  isOpen: boolean
  closeFn: () => void
  confirmLabel?: string
  cancelLabel?: string
  titleTxt?: string
  description?: React.ReactNode | string
  isLoading?: boolean
}

export const ConfirmModal = ({
  isOpen,
  closeFn,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  titleTxt = 'Are you sure?',
  description = '',
  isLoading = false
}: ConfirmModalProps) => {
  return (
    <Dialog open={isOpen} onClose={() => { closeFn() }} className="modal">
      <div className="modal__container">
        {!isLoading
          ? <Dialog.Panel className="modal__panel">
              <Dialog.Title>{titleTxt}</Dialog.Title>
              {description !== '' && <Dialog.Description as="div">{description}</Dialog.Description>}
              <div className="modal__actions">
                <button type="button" className="btn">{confirmLabel}</button>
                <button type="button" className="btn" onClick={() => { closeFn() }}>{cancelLabel}</button>
              </div>
            </Dialog.Panel>
          : <div>Loading</div>}
      </div>
    </Dialog>
  )
}
