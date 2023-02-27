import axios from "axios"
import { GET_MOVIELIST } from '../types/movieType'
import { ADD_MOVIELIST } from "../types/movieAddType"
import { GET_MOVIEINFO } from '../types/movieGetType'
import { UPDATE_MOVIEINFO } from '../types/movieUpdateType'
import { DELETE_MOVIELIST } from '../types/movieDeleteType'

export const movieActions = {
    getMovieList: (tenPhim = '') => {
        if (tenPhim.trim() !== '') {
            return async (dispatch) => {
                const result = await axios({

                    url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`,
                    method: 'GET',
                    headers: {
                        TokenCyberSoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjUiLCJIZXRIYW5TdHJpbmciOiIxNS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODQxMDg4MDAwMDAiLCJuYmYiOjE2NjY3MTcyMDAsImV4cCI6MTY4NDI1NjQwMH0.vdVVhPEIB7ZV9oEaVDyxq430wfBgJgeYqiM5JTcdwqo'
                    }
                })
                dispatch({
                    type: GET_MOVIELIST,
                    payload: result.data.content,
                })
            }
        }
        return async (dispatch) => {
            const result = await axios({

                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
                method: 'GET',
                headers: {
                    TokenCyberSoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjUiLCJIZXRIYW5TdHJpbmciOiIxNS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODQxMDg4MDAwMDAiLCJuYmYiOjE2NjY3MTcyMDAsImV4cCI6MTY4NDI1NjQwMH0.vdVVhPEIB7ZV9oEaVDyxq430wfBgJgeYqiM5JTcdwqo'
                }
            })
            dispatch({
                type: GET_MOVIELIST,
                payload: result.data.content,
            })
        }
    },
    addMovieList: (formData) => {
        return async (dispatch) => {
            const result = await axios({
                url: (`https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh`),
                method: 'POST',
                headers: {
                    "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjUiLCJIZXRIYW5TdHJpbmciOiIxNS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODQxMDg4MDAwMDAiLCJuYmYiOjE2NjY3MTcyMDAsImV4cCI6MTY4NDI1NjQwMH0.vdVVhPEIB7ZV9oEaVDyxq430wfBgJgeYqiM5JTcdwqo',
                    "Content-Type": "multipart/form-data"

                },
                data: formData,
            })
            if (result.data.statusCode === 200) {
                dispatch({
                    type: ADD_MOVIELIST,
                    payload: result.data.content,
                })
            }
        }
    },
    getMovieInfo: (maPhim) => {
        return async (dispatch) => {
            const result = await axios({
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
                method: 'GET',
                headers: {
                    TokenCyberSoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjUiLCJIZXRIYW5TdHJpbmciOiIxNS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODQxMDg4MDAwMDAiLCJuYmYiOjE2NjY3MTcyMDAsImV4cCI6MTY4NDI1NjQwMH0.vdVVhPEIB7ZV9oEaVDyxq430wfBgJgeYqiM5JTcdwqo'
                },
            })
            dispatch({
                type: GET_MOVIEINFO,
                payload: result.data.content,
            })
        }
    },
    updateMovieInfo: (formData) => {
        return async (dispatch) => {
            const result = await axios({
                url: (`https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload`),
                method: 'POST',
                headers: {
                    "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjUiLCJIZXRIYW5TdHJpbmciOiIxNS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODQxMDg4MDAwMDAiLCJuYmYiOjE2NjY3MTcyMDAsImV4cCI6MTY4NDI1NjQwMH0.vdVVhPEIB7ZV9oEaVDyxq430wfBgJgeYqiM5JTcdwqo',

                    "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMjUwMTk2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiY3RkMTIzMkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUXVhblRyaSIsImN0ZDEyMzJAZ21haWwuY29tIiwiR1AwMSJdLCJuYmYiOjE2Nzc1MDE4OTMsImV4cCI6MTY3NzUwNTQ5M30.gQiaaH63vCL9TyI38trnjTZ06sZ7MyE_qjW0P2E-0Os',

                    "Content-Type": "multipart/form-data"
                },

                data: formData,
            })
            // alert('Cập nhật phim thành công')
            if (result.data.statusCode === 200) {
                dispatch({
                    type: UPDATE_MOVIEINFO,
                    payload: result.data.content,
                })
            }
        }
    },
    deleteMovieInfo: (maPhim) => {
        return async (dispatch) => {
            try {
                const result = await axios({
                    url: (`https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XP?MaPhim=${maPhim}`),
                    method: 'DELETE',
                    headers: {
                        "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjUiLCJIZXRIYW5TdHJpbmciOiIxNS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODQxMDg4MDAwMDAiLCJuYmYiOjE2NjY3MTcyMDAsImV4cCI6MTY4NDI1NjQwMH0.vdVVhPEIB7ZV9oEaVDyxq430wfBgJgeYqiM5JTcdwqo',

                        "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMjUwMTk2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiY3RkMTIzMkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUXVhblRyaSIsImN0ZDEyMzJAZ21haWwuY29tIiwiR1AwMSJdLCJuYmYiOjE2Nzc1MDE4OTMsImV4cCI6MTY3NzUwNTQ5M30.gQiaaH63vCL9TyI38trnjTZ06sZ7MyE_qjW0P2E-0Os',

                    },

                })
                if (result.data.statusCode === 200) {
                    dispatch({
                        type: DELETE_MOVIELIST,
                        payload: result.data.content,
                    })
                    console.log(result.data)
                }
            } catch (error) {
                dispatch({
                    type: DELETE_MOVIELIST,
                    payload: error.response.data.content,
                })
            }
        }
    },
}