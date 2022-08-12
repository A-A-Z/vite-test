import './App.css'
import './assets/style/app.scss'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeActionModal } from './redux/peopleSlice'
import { isActionModalOpen, getActiverPerson } from './redux/selectors'
import { PeopleGrid } from './components/peopleGrid'
import { ActionModal } from './components/actionModal'

function App() {
  const dispatch = useDispatch()
  const isModalOpen = useSelector(isActionModalOpen)
  const activePerson = useSelector(getActiverPerson)

  const closeModal = useCallback(() => {
    dispatch(closeActionModal())
  }, [])

  return (
    <div className="App">
      <h1>Paul's Vite Test</h1>
      <PeopleGrid />
      <ActionModal isOpen={isModalOpen} closeFn={closeModal} data={activePerson} />
    </div>
  )
}

export default App
