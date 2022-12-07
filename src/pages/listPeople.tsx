import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeActionModal } from '../redux/peopleSlice'
import { isActionModalOpen, getActiverPerson } from '../redux/selectors'
import { PeopleGrid } from '../components/peopleGrid'
import { ActionModal } from '../components/actionModal'
import { DeleteConfirmModal } from '../components/deleteConfirmModal2'

const ListPeople = () => {
  const dispatch = useDispatch()
  const isModalOpen = useSelector(isActionModalOpen)
  const activePersonId = useSelector(getActiverPerson)

  const closeModal = useCallback(() => {
    dispatch(closeActionModal())
  }, [])

  return (
    <>
        <main className="page-main">
            <PeopleGrid />
        </main>
        <ActionModal isOpen={isModalOpen} closeFn={closeModal} personId={activePersonId} />
        <DeleteConfirmModal />
    </>
  )
}

export default ListPeople
