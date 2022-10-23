import React from 'react'
import { useRoutes } from 'react-router-dom'
import UserMainLayout from '../components/layouts/UserMainLayout'
import Home from '../pages/Home/Home'

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
    }
  ])

  return routing

}

export default Routers