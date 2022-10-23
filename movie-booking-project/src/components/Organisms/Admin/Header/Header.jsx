import React from 'react'
import { NavLink } from 'react-router-dom';
import Login from '../../../../pages/Admin/Login/Login';

const Header = () => {
    return (
        <div className="container mx-auto">
            <div className="container flex justify-between mx-auto h-20 items-center border-2">
                <div className="w-1/6 border-r-2 text-xl font-medium text-orange-700 h-full flex items-center justify-center">
                    DASHBOARD
                </div>
            </div>
            <div className="flex border-2 border-t-0">
                <div className="w-1/6 flex flex-col border-r-2">
                    <NavLink to="/user">
                        <button className="text-lg font-medium mt-8 mb-4 py-2 w-full focus:bg-gray-200 hover:text-black text-black">
                            Quản lý người dùng
                        </button>
                    </NavLink>
                    <NavLink to="/film">
                        <button className="text-lg font-medium py-2 w-full focus:bg-gray-200 hover:text-black text-black">
                            Quản lý phim
                        </button>
                    </NavLink>
                </div>
                <div className="w-5/6">
                    
                </div>
            </div>
        </div>
    )
}

export default Header