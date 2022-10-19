import { Dialog } from '@headlessui/react'
import { Icon } from './icon'

interface ConfirmModalProps {
  isOpen: boolean
  closeFn: () => void
  confirmFn: () => void
  confirmLabel?: string
  cancelLabel?: string
  titleTxt?: string
  description?: React.ReactNode | string
  isLoading?: boolean
  loadingTxt?: string
}

export const ConfirmModal = ({
  isOpen,
  closeFn,
  confirmFn,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  titleTxt = 'Are you sure?',
  description = '',
  isLoading = false,
  loadingTxt = 'Loading'
}: ConfirmModalProps) => {
  return (
    <Dialog open={isOpen} onClose={() => { closeFn() }} className="modal confirm-modal">
      <div className="modal__container">
        <Dialog.Panel className="modal__panel">
          {!isLoading
            ? <>
                <Dialog.Title className={'confirm-modal__title'}><Icon icon='ExclamationTriangleIcon'>{titleTxt}</Icon></Dialog.Title>
                {description !== '' && <Dialog.Description as="div">{description}</Dialog.Description>}
                <div className="confirm-modal__actions">
                  <button type="button" className="btn btn--large" onClick={() => { confirmFn() }}>{confirmLabel}</button>
                  <button type="button" className="btn btn--large btn--alt" onClick={() => { closeFn() }}>{cancelLabel}</button>
                </div>
              </>
            : <div>{loadingTxt}</div>}
          </Dialog.Panel>
      </div>
    </Dialog>
  )
}
