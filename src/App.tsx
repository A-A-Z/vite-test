import './App.css'
import './assets/style/app.scss'
import { Routes, Route } from 'react-router-dom'
import ListPeople from './pages/listPeople'

function App() {
  return (
    <div className="App">
      <h1>Paul's Vite Test</h1>
      <Routes>
        <Route path="/" element={<ListPeople />} />
      </Routes>
    </div>
  )
}

export default App
