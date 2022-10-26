import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Tag, Input } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import styled from 'styled-components';
import { AudioOutlined } from '@ant-design/icons';
import { userReducer } from '../../../store/reducers/userReducer'
import { userAction } from '../../../store/actions/userAction';

const { Search } = Input;
const onSearch = (value) => console.log(value);

const columns = [
  {
    title: "Họ tên",
    dataIndex: "hoTen",
    key: "hoTen",
    width: 80,
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Tài khoản",
    dataIndex: "taiKhoan",
    key: "taiKhoan",
    width: 100,

    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Mật khẩu",
    dataIndex: "matKhau",
    key: "matKhau",
    width: 200,

    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "soDt",
    key: "soDt",
    width: 150,

    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Loại Người Dùng",
    dataIndex: "maLoaiNguoiDung",
    key: "maLoaiNguoiDung",
    width: 300,
    render: (text) => {
      return (
        <span>
          {text == "KhachHang" ? (
            <Tag color="purple">Khách hàng</Tag>
          ) : (
            <Tag color="orange">Quản Trị</Tag>
           )} 
        </span>
      );
    },
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    render: (action) => {
      return (
        <>
          <Button
            className="edit transition duration-200 border-none mr-1 "
            onClick={() => {
              action.onEdit();
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            className="delete transition duration-200 border-none mr-1"
            onClick={() => {
              action.onDelete();
            }}
          >
            <DeleteOutlined />
          </Button>
        </>
      );
    },
  },
];


const UserManage = () => {
  const dispatch = useDispatch()
  const {userList} = useSelector((state)=>state.userReducer)
  const data = userList.items
  console.log('userList',userList)

  useEffect(() => {
    dispatch(userAction.getUserList())
  }, [])
  return (
    <Container className='FilmManage mr-2 ml-2'>
      <div className="flex justify-between mb-2">
        <span className='text-2xl semi-bold'>Quản Lý Người Dùng</span>
        <button className="py-2 px-3 bg-blue-500 text-neutral-100 rounded-md hover:bg-blue-700 transition duration-200 text-base">+ Thêm Người Dùng</button>
      </div>
      <Search
        placeholder="Nhập từ khóa "
        onSearch={onSearch}
        className='mb-5 Search'
      />
      <div className='h-screen'>
      <Table columns={columns} dataSource={data} />
      </div>
    </Container>
  )
}

export default UserManage

const Container = styled.div`
&.FilmManage{
    button{
    }
    button.delete{
    background-color:tomato;
    border:none;
    color:gray;
    &:hover{
        color:white
    }
    }
    button.edit{
    background-color:deepskyblue;
    border:none;
    color:gray;
    &:hover{
        color:white
    }
    }
    button.create{
    background-color:springgreen;
    border:none;
    color:gray;
    &:hover{
        color:white
    }
    }
    .Search{
    height:3rem;
        input,button{height:3rem}
}

}
`