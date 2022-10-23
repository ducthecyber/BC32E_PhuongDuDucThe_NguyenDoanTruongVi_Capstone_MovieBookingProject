import React from 'react'
import { useRoutes } from 'react-router-dom'
import UserMainLayout from '../components/layouts/UserMainLayout'
import AdminMainLayout from '../components/layouts/AdminMainLayout'
import Home from '../pages/Home/Home'
import Login from '../pages/Admin/Login/Login'
import FilmManage from '../pages/Admin/FilmManage/FilmManage'
import UserManage from '../pages/Admin/UserManage/UserManage'

const Routers = () => {
  //useRoutes nhận vào 1 mảng
  const routing = useRoutes([
    {
      path: '/',
      element: <UserMainLayout />,
      children: [
        {
          path: 'home',
          element: <Home />,
        }
      ]
    },
    {
      path: '/admin',
      element: <AdminMainLayout />,
      children: [
        {
          path: 'login',
          element:<Login/>,
        },
        {
          path: 'film',
          element:<FilmManage/>,
        },
        {
          path: 'user',
          element:<UserManage/>,
        },
      ]
    }
  ])

  return routing

}

export default Routers