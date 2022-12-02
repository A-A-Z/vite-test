import { useDispatch, useSelector } from 'react-redux'
import { deleteClose } from '../redux/peopleSlice'
import { selectIsDeleteConfirmOpen, selectDeleteSelected } from '../redux/selectors'
import { ConfirmModal } from './confirmModal'
import { useDeletePeopleMutation } from '../features/api/apiSlice'

export const DeleteConfirmModal = () => {
  const MAX_LINES = 7
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsDeleteConfirmOpen)
  const selected = useSelector(selectDeleteSelected)
  const handleClose = () => { dispatch(deleteClose()) }
  const underCapCount = MAX_LINES - 1
  const overCapCount = selected.length - underCapCount

  const selectedIds = selected.map(({ id }) => id)
  const [deletePeople, { isLoading }] = useDeletePeopleMutation()
  const handleConfirm = () => { deletePeople(selectedIds) }
  // test
  let descBody

  if (selected.length === 1) {
    descBody = <p>Are you sure you want to delete <strong>{selected[0].name}</strong>?</p>
  } else {
    descBody = (<>
      <p>Are you sure you want to delete:</p>
      <ul>
        {selected.slice(0, underCapCount).map(person => <li key={person.id}>{person.name}</li>)}
        {overCapCount === 1 && <li>{selected[underCapCount].name}</li>}
        {overCapCount > 1 && <li>Plus {overCapCount} others...</li>}
      </ul>
    </>)
  }

  return <ConfirmModal
    isOpen={isOpen}
    closeFn={handleClose}
    confirmFn={handleConfirm}
    confirmLabel={'Delete'}
    titleTxt={selected.length === 1 ? 'Delete this person?' : `Delete ${selected.length} people?`}
    description={descBody}
    isLoading={isLoading}
    loadingTxt="Deleting"
  />
}
