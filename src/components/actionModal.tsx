import { Dialog } from '@headlessui/react'
import { Person } from '../global/types'

interface RowActionProps {
    isOpen: boolean
    closeFn: () => void
    data: Person | null
}

export const ActionModal = ({ isOpen, closeFn, data }: RowActionProps) => {
  if (data === null) {
    return null
  }

  const { name } = data

  return (
    <Dialog open={isOpen} onClose={() => { closeFn() }} className="modal">
      <div className="modal__container">
        <Dialog.Panel className="modal__panel">
          <Dialog.Title>Person: {name.first} {name.last}</Dialog.Title>
          <Dialog.Description>
            Welcome to the modal.
          </Dialog.Description>

          <button type="button" className="btn" onClick={() => { closeFn() }}>Close</button>

        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
