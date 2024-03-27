import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import './index.css'
import WardScreen from './screens/WardScreen.jsx'
import AddHouseScreen from './screens/AddHouseScreen.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/wards/:id',
        element: <WardScreen />
      },
      {
        path: '/add-house',
        element: <AddHouseScreen/>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.Fragment>,
)
