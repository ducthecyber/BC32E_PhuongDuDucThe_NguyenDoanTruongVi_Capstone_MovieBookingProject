import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import Login from '../../../../pages/Admin/Login/Login';

const Header = () => {
    return (
        <div className="container mx-auto">
            <div className="container flex justify-between mx-auto h-20 items-center border-2 bg-amber-50">
                <div className="w-1/6 border-r-2 text-xl font-medium text-orange-700 h-full flex items-center justify-center">
                    DASHBOARD
                </div>
                <div className="w-7/6 border-r-2 text-xl font-medium text-orange-700 h-full flex items-center justify-center">
                    <NavLink to='login'>
                        <button className='mx-2 bg-transparent hover:bg-rose-500 text-rose-400 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded'>Login</button>
                    </NavLink>
                    <NavLink to='signup'>
                        <button className='mx-2 bg-transparent hover:bg-rose-500 text-rose-400 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded'>Sign Up</button>
                    </NavLink>
                </div>
            </div>
            <div className="flex border-2 border-t-0 h-screen">
                <div className="w-1/6 flex flex-col border-r-2 bg-amber-50">
                    <NavLink to="user">
                        <button className="text-lg font-medium mt-8 mb-4 py-2 w-full text-orange-500 hover:underline">
                            Quản lý người dùng
                        </button>
                    </NavLink>
                    <NavLink to="film">
                        <button className="text-lg font-medium py-2 w-full  text-orange-500 hover:underline">
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
        </div>
    )
}

export default Header