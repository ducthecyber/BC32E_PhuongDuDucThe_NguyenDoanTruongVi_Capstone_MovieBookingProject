import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Tag, Input, Alert } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    VideoCameraAddOutlined,
} from "@ant-design/icons";
import styled from 'styled-components';
import { AudioOutlined } from '@ant-design/icons';

import { confirm } from "react-confirm-box";
import { movieActions } from '../../../store/actions/movieAction';
import { movieReducer } from '../../../store/reducers/movieReducer'
import AddFilm from '../AddFilm/AddFilm';
import EditFilm from '../EditFilm/EditFilm';
import style from './style.scss'
import ReactReadMoreReadLess from "react-read-more-read-less";


const { Search } = Input;



const FilmManage = () => {
    const [phim, setPhim] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [update, setUpdate] = useState({});
    const dispatch = useDispatch()
    //load danh sách phim ra giao diện
    useEffect(() => {
        dispatch(movieActions.getMovieList())

    }, [update])

    const { movieList } = useSelector((state) => state.movieReducer)

    //GAN MOVIELIST TỪ STORE CHO DATA CỦA TABLE
    const data = movieList
    //THAY DOI STATE DE HIEN RA MODAL EDIT
    const onEdit = (item) => {

        dispatch(movieActions.getMovieInfo(item.maPhim))
        setIsOpenModalEdit(true);
    }
    const onDelete = (maPhim) => {
        console.log('maPhimXoa', maPhim)
        dispatch(movieActions.deleteMovieInfo(maPhim))
        dispatch(movieActions.getMovieList())
    }

    const onConfirm = {
        closeOnOverlayClick: false,
        labels: {
            confirmable: "Confirm",
            cancellable: "Cancel"
        }
    };
    const onClick = async (options, maPhim) => {
        const result = await confirm("Continue deleting this film?", options);
        if (result) {
            dispatch(movieActions.deleteMovieInfo(maPhim))
            dispatch(movieActions.getMovieList())
            console.log("Confirm Delete!");
            return;
        }
        console.log("Abort Delete!");
    };

    // console.log('movieList', movieList)

    const onSearch = (value) => {
        dispatch(movieActions.getMovieList(value))
        console.log(value);
    }

    const handleInputChange = (e) => {
        if (e.target.value != "") {
            setSearchInput(e.target.value);
        } else if (e.target.value == "") {
            setUpdate(Math.random());
        }
    };

    const columns = [
        {
            title: "Mã phim",
            dataIndex: "maPhim",
            key: "maPhim",
            width: 80,
            align: 'center',
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
            width: 100,
            // ellipsis: true,
            textWrap: 'word-break',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            key: "hinhAnh",
            width: 100,
            align: 'center',
            ellipsis: true,
            render: (text, film) => {
                return <Fragment>
                    <img src={film.hinhAnh} alt={film.tenPhim} width={100} height={100}
                        onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photo/id/${film.maPhim}/50/50` }} />
                </Fragment>
            }
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Ngày khởi chiếu",
            dataIndex: "ngayKhoiChieu",
            key: "ngayKhoiChieu",
            width: 150,
            align: 'center'
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Mô tả",
            dataIndex: "moTa",
            key: "moTa",
            width: 250,
            // textWrap: 'word-break',
            // ellipsis: true,
            // responsive: ['md'],
            render: (item) => {
                return <Fragment>
                    <ReactReadMoreReadLess
                        readMoreStyle={{ color: 'darkcyan', fontStyle: 'italic', whiteSpace: "nowrap", cursor: "pointer" }}
                        readLessStyle={{ color: 'darkcyan', fontStyle: 'italic', whiteSpace: "nowrap", cursor: "pointer" }}
                        charLimit={100}
                        readMoreText={"Read more ▼"}
                        readLessText={"Read less ▲"}
                    >
                        {item}
                    </ReactReadMoreReadLess>


                </Fragment>
            }
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            width: 70,
            align: 'center',
            render: (action, item) => {
                return (
                    <>
                        <Button
                            key={1}
                            className="edit transition duration-200 border-none mr-1 "
                            onClick={() => {

                                onEdit(item);
                                setPhim(item);
                            }}
                        >
                            <EditOutlined />
                        </Button>
                        <Button
                            key={2}
                            className="delete transition duration-200 border-none mr-1"
                            onClick={() => {
                                onClick(onConfirm, item.maPhim)
                                // onDelete(item.maPhim);
                            }}
                        >
                            <DeleteOutlined />
                        </Button>
                        <Button
                            key={3}
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

    return (
        <Container className='FilmManage mr-2 ml-2 pt-2'>
            <div className="flex justify-between mb-2">
                <span className='text-2xl semi-bold'>Quản Lý Phim</span>
                <button className="py-2 px-3 bg-blue-500 text-neutral-100 rounded-md hover:bg-blue-700 transition duration-200 text-base" onClick={() => { setIsOpenModal(true); }}>+ Thêm Phim</button>
            </div>
            <Search
                placeholder="Ten phim ban muon xem la gi? "
                onSearch={onSearch}
                className='mb-5 Search'
                onChange={(e) => {
                    handleInputChange(e);
                }}
            />
            <div className='w-full'>
                <Table columns={columns} dataSource={data} rowKey='maPhim' scroll={{ x: 500, y: 500 }} className='FilmManage' />
            </div>
            {isOpenModal && (
                <AddFilm
                    //   fetchFilmList={fetchFilmList}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                />
            )}
            {isOpenModalEdit && (
                <EditFilm

                    //   fetchFilmList={fetchFilmList}
                    isOpenModalEdit={isOpenModalEdit}
                    setIsOpenModalEdit={setIsOpenModalEdit}
                    phim={phim}
                />
            )}
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