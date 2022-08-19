import './App.css'
import './assets/style/app.scss'
import { Routes, Route } from 'react-router-dom'

import ListPeople from './pages/listPeople'
import PersonDetail from './pages/personDetail'

function App() {
  return (
    <div className="App">
      <header className="page-header">
        <h1 className="page-header__title">Paul's Vite Test</h1>
      </header>
      <Routes>
        <Route path="/" element={<ListPeople />} />
        <Route path="person/:id" element={<PersonDetail />} />
      </Routes>
    </div>
  )
}

export default App
