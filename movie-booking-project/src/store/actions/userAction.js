import axios from 'axios'
import { GET_USERLIST } from '../types/userType'

export const userAction = {
    getUserList: () => {
        return async (dispatch) => {
            const result = await axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=1&soPhanTuTrenTrang=20',
                method: 'GET',
                headers: {
                    TokenCyberSoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY'
                }
            })
            dispatch({
                type: GET_USERLIST,
                payload: result.data.content,
            })
        }
    }
}