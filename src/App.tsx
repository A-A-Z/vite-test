import React from 'react'
import './assets/style/app.scss'
import { Routes, Route } from 'react-router-dom'
import { PageHeader } from 'components/pageHeader'
import { NoticeList } from 'features/notices'
import ListPeople from './pages/listPeople'
import PersonDetail from './pages/personDetail'
import WeekView from './pages/weekView'

function App () {
  return (
    <div className="App">
      <PageHeader title="Vite POC Test" />
      <Routes>
        <Route path="" element={<ListPeople />} />
        <Route path="/week/:divisionId" element={<WeekView />} />
        <Route path="/week" element={<WeekView />} />
        <Route path="person/:id" element={<PersonDetail />} />
      </Routes>
      <NoticeList />
    </div>
  )
}

export default App
