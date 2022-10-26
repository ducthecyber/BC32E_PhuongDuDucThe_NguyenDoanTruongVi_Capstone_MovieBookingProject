import React, { Fragment, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Button, Space, Table, Tag, Input } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    VideoCameraAddOutlined,
} from "@ant-design/icons";
import styled from 'styled-components';
import { AudioOutlined } from '@ant-design/icons';
import { movieActions } from '../../../store/actions/movieAction';
import {movieReducer} from '../../../store/reducers/movieReducer'

const { Search } = Input;
const onSearch = (value) => console.log(value);

const columns = [
    {
        title: "Mã phim",
        dataIndex: "maPhim",
        key: "maPhim",
        width: 80,
        // value:(text,object)=>{return<span>{text}</span>}
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
        render:(text,film)=>{return<Fragment>
            <img src={film.hinhAnh} alt={film.tenPhim} width={100} height={100} 
            onError={(e)=>{e.target.onError=null;e.target.src=`https://picsum.photo/id/${film.maPhim}/50/50`}} />
        </Fragment>}
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



const FilmManage = () => {
    const dispatch = useDispatch()
    const {movieList} = useSelector((state)=>state.movieReducer)
    const data = movieList
    console.log('movieList',movieList)
    useEffect(()=>{
        dispatch(movieActions.getMovieList())
    },[])
    return (
        <Container className='FilmManage mr-2 ml-2 h-full'>
            <div className="flex justify-between mb-2">
                <span className='text-2xl semi-bold'>Quản Lý Phim</span>
                <button className="py-2 px-3 bg-blue-500 text-neutral-100 rounded-md hover:bg-blue-700 transition duration-200 text-base">+ Thêm Phim</button>
            </div>
            <Search
                placeholder="Ten phim ban muon xem la gi? "
                onSearch={onSearch}
                className='mb-5 Search'
            />
            <div className='h-screen'>

            <Table columns={columns} dataSource={data} />
            </div>
        </Container>
    )
}

export default FilmManage

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