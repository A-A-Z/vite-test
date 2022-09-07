import { Dialog } from '@headlessui/react'
import { useGetPeopleQuery } from '../features/api/apiSlice'

interface RowActionProps {
    isOpen: boolean
    closeFn: () => void
    personId: string | null
}

export const ActionModal = ({ isOpen, closeFn, personId }: RowActionProps) => {
  const { person } = useGetPeopleQuery(undefined, {
    selectFromResult: ({ data }) => ({
      person: personId !== null ? data?.results.find(person => person.id.value === personId) : undefined
    })
  })

  if (person === undefined) {
    return null
  }

  const { name } = person

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
