import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Tag, Input, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import styled from 'styled-components';
import { AudioOutlined } from '@ant-design/icons';
import { confirm } from "react-confirm-box";
import { userReducer } from '../../../store/reducers/userReducer'
import { userAction } from '../../../store/actions/userAction';
import AddUser from '../AddUser/AddUser'
import style from './style.scss';
import EditUser from '../EditUser/EditUser';

const { Search } = Input;




const UserManage = () => {
  const dispatch = useDispatch()
  const { userList } = useSelector((state) => state.userReducer)
  const { userLogin } = useSelector((state) => state.userReducer)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState({});
  const [isOpenModalModify, setOpenModalModify] = useState(false);
  const [update, setUpdate] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const {error} = useSelector((state)=>state.userReducer)

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: 150,
      // align:'center',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      // align:'center',
      width: 150,
      textWrap: 'word-break',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
      align: 'center',
      width: 150,

      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDT",
      key: "soDT",
      width: 100,
      align: 'center',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      width: 150,
      align: 'center',
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
      align: 'center',
      render: (action, item) => {
        return (
          <>
            <Button
              className="edit transition duration-200 border-none mr-1 "
              onClick={() => {
                onEdit(item);
                setEditUserInfo(item);
                console.log('editing item', item)
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              className="delete transition duration-200 border-none mr-1"
              onClick={() => {
                // onDelete(item);
                onClick(onConfirm, item)
                console.log('item',item)
              }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const data = userList


  useEffect(() => {
    dispatch(userAction.getUserList())
    console.log('userlist', data)
  }, [update])

  console.log('userList', data)
  const handleAddNewAccount = () => {
    setIsOpenModal(true);
  };

  const onSearch = (value) => {
    dispatch(userAction.getUserList(value))
    console.log(value);
  }

  const handleInputChange = (e) => {
    if (e.target.value != "") {
      setSearchInput(e.target.value);
    } else if (e.target.value == "") {
      setUpdate(Math.random());
    }
  };

  const onEdit = () => {
    setOpenModalModify(true);
    // setEditUserInfo(userInfor);
  }

  const onConfirm = {
    closeOnOverlayClick: false,
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  };

  const onClick = async (options, item) => {
    const result = await confirm("Continue deleting this user?", options);
    if (result) {
      // console.log('taikhoan',item.taiKhoan)
      dispatch(userAction.deleteUser(item.taiKhoan))
      dispatch(userAction.getUserList())
      message.success('Xoá thành công!')
      return;
    }
    console.log("Abort Delete!");
  };

  console.log('error',error)
  return (
    <Container className='UserManage mr-2 ml-2 pt-2'>
      <div className="flex justify-between mb-2">
        <span className='text-2xl semi-bold'>Quản Lý Người Dùng</span>
        <button className="py-2 px-3 bg-blue-500 text-neutral-100 rounded-md hover:bg-blue-700 transition duration-200 text-base"
          onClick={handleAddNewAccount}
        >+ Thêm Người Dùng</button>
      </div>
      <Search
        placeholder="Nhập từ khóa "
        onSearch={onSearch}
        className='mb-5 Search'
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <div className=''>
        <Table columns={columns} dataSource={data} rowKey='taiKhoan' scroll={{ x: 500, y: 500 }} />
        {isOpenModal && (
          <AddUser
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            setUpdate={setUpdate}
          />
        )}
        {isOpenModalModify && (
          <EditUser
            editUserInfo={editUserInfo}
            isOpenModalModify={isOpenModalModify}
            setOpenModalModify={setOpenModalModify}
            setUpdate={setUpdate}
          />
        )}

      </div>
    </Container>
  )
}

export default UserManage

const Container = styled.div`
&.UserManage{
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