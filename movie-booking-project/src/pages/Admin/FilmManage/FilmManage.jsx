import React from 'react'
import { Button, Space, Table, Tag, Input } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    VideoCameraAddOutlined,
} from "@ant-design/icons";
import styled from 'styled-components';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value) => console.log(value);

const columns = [
    {
        title: "Mã phim",
        dataIndex: "maPhim",
        key: "maPhim",
        width: 80,
        // render: (text) => <a>{text}</a>,
    },
    {
        title: "Tên phim",
        dataIndex: "tenPhim",
        key: "tenPhim",
        width: 100,

        // render: (text) => <a>{text}</a>,
    },
    {
        title: "Trailer phim",
        dataIndex: "trailer",
        key: "trailer",
        width: 200,
        // render: (text) => <a>{text}</a>,
    },
    {
        title: "Hình ảnh",
        dataIndex: "hinhAnh",
        key: "hinhAnh",
        width: 200,

        // render: (text) => <a>{text}</a>,
    },
    {
        title: "Ngày khởi chiếu",
        dataIndex: "ngayKhoiChieu",
        key: "ngayKhoiChieu",
        width: 150,

        // render: (text) => <a>{text}</a>,
    },
    {
        title: "Mô tả",
        dataIndex: "moTa",
        key: "moTa",
        width: 300,

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
                    <Button
                        className="create transition duration-200 border-none mr-1"
                        onClick={() => {
                            action.onCreateNewSchedule();
                        }}
                    >
                        <VideoCameraAddOutlined />
                    </Button>
                </>
            );
        },
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const FilmManage = () => {
    return (
        <Container className='FilmManage mr-2 ml-2'>
            <div class="flex justify-between mb-2">
                <span className='text-2xl semi-bold'>Quản Lý Phim</span>
                <button className="py-2 px-3 bg-blue-500 text-neutral-100 rounded-md hover:bg-blue-700 transition duration-200 text-base">+ Thêm Phim</button>
            </div>
            <Search
                placeholder="Ten phim ban muon xem la gi? "
                onSearch={onSearch}
                className='mb-5 Search'
            />
            <Table columns={columns} dataSource={data} />
        </Container>
    )
}

export default FilmManage

const Container = styled.div`
&.FilmManage{
    button{
    &:hover{
        color:white;
    } 
    }
    button.delete{
    background-color:tomato;
    border:none;
    color:gray;
    }
    button.edit{
    background-color:deepskyblue;
    border:none;
    color:gray;
    }
    button.create{
    background-color:springgreen;
    border:none;
    color:gray;
    }
    .Search{
    height:3rem;
        input,button{height:3rem}
}

}
`