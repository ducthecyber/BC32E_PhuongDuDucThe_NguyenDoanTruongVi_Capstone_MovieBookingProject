import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Login from '../../../../pages/Admin/Login/Login';
import { localService } from "../../../../Services/localService";

const Header = () => {
    const { userLogin } = useSelector(state => state.userReducer)
    const handleLogout = () => {
        window.localStorage.removeItem('USER_SIGNIN');
        window.location.href = "/admin/login";
    };
    const [login, setLogin] = useState(false)

    //lấy state từ localStorage
    const userStatus = JSON.parse(window.localStorage.getItem('USER_SIGNIN'));

    useEffect(() => {
        //nếu userStatus có tồn tại (khác null) thì mới set lại login
        if (userStatus !== null) {
            setLogin(true)
        }
    }, [userStatus])

    const checkLoginStatus =()=>{
        if(userLogin===''){
            alert('Bạn cần đăng nhập để thực hiện chức năng này!')
        }
    }

    return (
        <Container className="container mx-auto Login">
            <div className="container flex justify-between mx-auto h-20 items-center border-2 bg-amber-50">
                <div className="w-1/6 border-r-2 text-xl font-medium text-orange-700 h-full flex items-center justify-center">
                    DASHBOARD
                </div>
                <div className="w-5/6">
                    {login === false ? (
                        <div></div>)
                        : (
                            <div className="LoginUser pr-12">
                                Xin chào
                                <span className="ml-3 text-lg text-orange-700">{userLogin.taiKhoan}</span>
                                <button
                                    className="py-2 px-3 bg-red-500 text-white rounded-md ml-4"
                                    onClick={() => {
                                        handleLogout();
                                    }}
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                </div>
                {/* <div className="w-7/6 border-r-2 text-xl font-medium text-orange-700 h-full flex items-center justify-center">
                    {
                        userLogin ? (
                            <div className="pr-12">
                                Xin chào {userLogin.taiKhoan}
                                <span className="text-lg text-orange-700"></span>
                                <button
                                    className="py-2 px-3 bg-red-500 text-white rounded-md ml-4"
                                    onClick={() => {
                                        // handleLogout();
                                    }}
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )
                            : (<span></span>)
                    }
                    <NavLink to='login'>
                        <button className='mx-2 bg-transparent hover:bg-rose-500 text-rose-400 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded'>Login</button>
                    </NavLink>
                    <NavLink to='signup'>
                        <button className='mx-2 bg-transparent hover:bg-rose-500 text-rose-400 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded'>Sign Up</button>
                    </NavLink>
                </div> */}
            </div>
            <div className="flex border-2 border-t-0 h-screen">
                <div className="w-1/6 flex flex-col border-r-2 bg-amber-50">
                    <NavLink to="">
                        <button className="text-lg font-medium mt-8 mb-4 py-2 w-full text-orange-500 hover:underline" onClick={checkLoginStatus}>
                            Quản lý người dùng
                        </button>
                    </NavLink>
                    <NavLink to="film">
                        <button className="text-lg font-medium py-2 w-full  text-orange-500 hover:underline" >
                            Quản lý phim
                        </button>
                    </NavLink>
                </div>
                <div className="w-5/6 flex items-center justify-center">
                    <main className='h-full w-full'>

                        <Outlet />

                    </main>
                </div>
            </div>
        </Container>
    )
}

export default Header

const Container = styled.div`
    &.Login{
        .LoginUser{
            display:flex;
            align-items:center;
            justify-content:flex-end
        }
    }
`