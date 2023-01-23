import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'

import { worker } from './mocks/handlers'

worker.start({
  onUnhandledRequest (req, print) {
    if (req.url.host === 'randomuser.me' || req.url.host === 'fonts.gstatic.com' || req.url.pathname.startsWith('/vite-test/')) {
      return
    }

    print.warning()
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={'vite-test/'}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
