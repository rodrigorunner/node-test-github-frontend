import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import RegisterUser from './pages/RegisterUser'
import EditUser from './pages/EditUser'
import UserPet from './pages/UserPet'
import RegisterPet from './pages/RegisterPet'
import EditPet from './pages/EditPet'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/register',
        element: <RegisterUser />
      },
      {
        path: '/user/:id/edit',
        element: <EditUser />
      },
      {
        path: '/details/:id',
        element: <UserPet />
      },
      {
        path: '/register/:id/pet',
        element: <RegisterPet />
      },
      {
        path: '/pet/:id/edit',
        element: <EditPet />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

