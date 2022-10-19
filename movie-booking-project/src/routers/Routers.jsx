import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'
import Home from '../pages/Home/Home'

const Routers = () => {
  //useRoutes nhận vào 1 mảng
  const routing = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: 'home',
          element: <Home />,
        }
      ]
    }
  ])

  return routing

}

export default Routers