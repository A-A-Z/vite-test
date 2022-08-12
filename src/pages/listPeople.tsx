import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeActionModal } from '../redux/peopleSlice'
import { isActionModalOpen, getActiverPerson } from '../redux/selectors'
import { PeopleGrid } from '../components/peopleGrid'
import { ActionModal } from '../components/actionModal'

const ListPeople = () => {
  const dispatch = useDispatch()
  const isModalOpen = useSelector(isActionModalOpen)
  const activePerson = useSelector(getActiverPerson)

  const closeModal = useCallback(() => {
    dispatch(closeActionModal())
  }, [])

  return (
    <>
        <div className="page">
            <PeopleGrid />
        </div>
        <ActionModal isOpen={isModalOpen} closeFn={closeModal} data={activePerson} />
    </>
  )
}

export default ListPeople
