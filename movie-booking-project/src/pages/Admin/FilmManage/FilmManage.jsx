import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Space, Table, Tag, Input } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    VideoCameraAddOutlined,
} from "@ant-design/icons";
import styled from 'styled-components';
import { AudioOutlined } from '@ant-design/icons';
import { movieActions } from '../../../store/actions/movieAction';
import { movieReducer } from '../../../store/reducers/movieReducer'
import AddFilm from '../AddFilm/AddFilm';
import EditFilm from '../EditFilm/EditFilm';

const { Search } = Input;
const onSearch = (value) => console.log(value);

const FilmManage = () => {
    const [phim, setPhim] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const dispatch = useDispatch()
    //load danh sách phim ra giao diện
    useEffect(() => {
        dispatch(movieActions.getMovieList())
    }, [])

    const { movieList } = useSelector((state) => state.movieReducer)

    //GAN MOVIELIST TỪ STORE CHO DATA CỦA TABLE
    const data = movieList
    //THAY DOI STATE DE HIEN RA MODAL EDIT
    const onEdit = () => {
        setIsOpenModalEdit(true);
    }
    console.log('movieList', movieList)

    // const fetchFilmList = () => {
    //     let newList = data.map((film) => {
    //       return {
    //         ...film,
    //         action:{
    //             onEdit: () => {
    //               setIsOpenModalEdit(true);
    //               setFilmInfo(film);
    //             },
    //         }

    //         //   onDelete: () => {
    //         //     movieService
    //         //       .deleteMovie(film.maPhim)
    //         //       .then((res) => {
    //         //         message.success(res.data.content);
    //         //         fetchFilmList();
    //         //       })
    //         //       .catch((err) => {
    //         //         message.error(err.response.data.content);
    //         //       });
    //         //   },
    //         //   onCreateNewSchedule: () => {
    //         //     setFilmInfor(film);
    //         //     setIsOpenModalAddSchedule(true);
    //         //   },

    //       };
    //     });
    //     setFilmList(newList);
    //   };
    //   useEffect(() => {
    //     fetchFilmList();
    //   },[]);
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
            width: 80,
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            key: "hinhAnh",
            width: 200,
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

            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Mô tả",
            dataIndex: "moTa",
            key: "moTa",
            width: 100,

            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            width: 70,
            render: (action, item) => {
                return (
                    <>
                        <Button
                            key={1}
                            className="edit transition duration-200 border-none mr-1 "
                            onClick={() => {
                                onEdit(item);
                                setPhim(item)
                            }}
                        >
                            <EditOutlined />
                        </Button>
                        <Button
                            key={2}
                            className="delete transition duration-200 border-none mr-1"
                            onClick={() => {
                                action.onDelete();
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
            />
            <div className='w-full'>
                <Table columns={columns} dataSource={data} rowKey='maPhim' />
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