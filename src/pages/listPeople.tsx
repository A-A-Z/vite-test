import { PeopleGrid } from '../components/peopleGrid'
import { DeleteConfirmModal } from '../components/deleteConfirmModal2'

const ListPeople = () => {
  return (
    <>
      <main className="page-main">
        <PeopleGrid />
      </main>
      <DeleteConfirmModal />
    </>
  )
}

export default ListPeople
