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
import LoginScreen from './screens/LoginScreen.jsx'
import { Helmet } from 'react-helmet'
import RegisterScreen from './screens/RegisterScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        index: true,
        element: <HomeScreen />
      },
      {
        path: '/wards/:id',
        element: <WardScreen />
      },
      {
        path: '/login',
        element: <LoginScreen />,
      },
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '/add-house',
            element: <AddHouseScreen />
          }
        ]
      },
      {
        path: '',
        element: <AdminRoute />,
        children: [
          {
            path: '/register',
            element: <RegisterScreen />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <Provider store={store}>
      {/* Restrict user from zooming on touch devices */}
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </Helmet>
      <RouterProvider router={router} />
    </Provider>
  </React.Fragment>,
)
