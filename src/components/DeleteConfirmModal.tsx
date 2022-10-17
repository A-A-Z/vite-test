import { useDispatch, useSelector } from 'react-redux'
import { deleteCancel } from '../redux/peopleSlice'
import { selectIsDeleteConfirmOpen, selectDeleteSelected } from '../redux/selectors'
import { ConfirmModal } from '../components/confirmModal'

export const DeleteConfirmModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsDeleteConfirmOpen)
  const selected = useSelector(selectDeleteSelected)
  const handleClose = () => { dispatch(deleteCancel()) }
  const MAX_LINES = 7
  const underCapCount = MAX_LINES - 1
  const overCapCount = selected.length - underCapCount

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
    confirmLabel={'Delete'}
    titleTxt={selected.length === 1 ? 'Delete person' : `Delete ${selected.length} people`}
    description={descBody}
  />
}
