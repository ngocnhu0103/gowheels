// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom'
import router from './router'
import Toast from './components/Toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <Toast />
    </PersistGate>

  </Provider>
  // </React.StrictMode>,
)
