import React from 'react'
import './assets/style/app.scss'
import { Routes, Route } from 'react-router-dom'
import { PageHeader } from './components/pageHeader'
import { NoticeList } from './components/noticeList'
import ListPeople from './pages/listPeople'
import PersonDetail from './pages/personDetail'

function App () {
  return (
    <div className="App">
      <PageHeader title="Vite Test" />
      <Routes>
        <Route path="/" element={<ListPeople />} />
        <Route path="person/:id" element={<PersonDetail />} />
      </Routes>
      <NoticeList />
    </div>
  )
}

export default App
