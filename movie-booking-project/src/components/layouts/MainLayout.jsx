import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../Molecules'
import styled from 'styled-components'

// import Header from '../Molecules/Header/Header'
// import Footer from '../Molecules/Footer/Footer'

const MainLayout = () => {
  return (
    <Container className='MainLayout'>
      <Header />
      <main className='main-content'>
        <Outlet />
      </main>
      <Footer />
    </Container>
  )
}

export default MainLayout

//styled không hỗ trợ extend hay mixin
const Container = styled.div`
&.MainLayout{
  min-height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:space-between;

  .Header{

  }

  .main-content{
    flex:1;
  }

  .Footer{

  }
}
// `