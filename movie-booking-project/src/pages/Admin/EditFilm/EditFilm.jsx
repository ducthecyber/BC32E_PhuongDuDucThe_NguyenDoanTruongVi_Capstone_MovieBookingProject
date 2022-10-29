import { Button, DatePicker, Modal, Select, Switch, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
// import { getUserServ } from "../../../Services/userServices";
import { useDispatch, useSelector } from "react-redux";
// import { movieService } from "../../Services/movieService";
import moment from "moment";
import { movieActions } from "../../../store/actions/movieAction";
import { useFormik } from "formik";
const { TextArea } = Input;

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
        offset: 0,
    },
    wrapperCol: {
        span: 16,
    },
    labelAlign: "left",
};
const validateMessages = {
    required: "Bắt buộc",
};

const EditFilm = ({
    isOpenModalEdit,
    setIsOpenModalEdit,
    filmInfo
}) => {
    const dispatch = useDispatch();
    console.log('thongtinphim',filmInfo)
    useEffect(() => {
        dispatch(movieActions.editMovieInfo(filmInfo.maPhim))
    }, [])
    const {movieInfo} = useSelector(state=>state.movieReducer)
    console.log('movieInfo',movieInfo)



    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 1,
            hinhAnh: {},
        },
        onSubmit: (values) => {
            // values.maNhom = 'GP10'
            //tạo đối tượng formData, đưa giá trị values từ formik vào formData
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                }
                else{
                    formData.append('File',values.hinhAnh,values.hinhAnh.name);
                }
            }
            
            console.log('hinhAnh', values.hinhAnh)
            console.log('formData',formData.get('File'))
            //Gọi api gửi các giá trị từ formData về backend xử lý
            dispatch(movieActions.addMovieList(formData))
            //đóng modal khi thêm nhấn nút thêm phim
            // setIsOpenModal(false)
        }
    })


    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };
      let startDate = moment(
        moment(movieInfo.ngayKhoiChieu).format("DD/MM/YYYY"),
        "DD/MM/YYYY"
      );

    return (
        <>
            <Modal
                title="Cập nhật phim"
                footer={null}
                centered
                open={isOpenModalEdit}
                onCancel={() => {
                    setIsOpenModalEdit(false);
                }}
                width={1000}
            >
                <div>
                    <Form
                        {...layout}
                        name="nest-messages"
                        initialValues={{
                              tenPhim: movieInfo.tenPhim,
                              moTa: movieInfo.moTa,

                              sapChieu: movieInfo.sapChieu,
                              dangChieu: movieInfo.dangChieu,
                              hot: movieInfo.hot,
                              ngayKhoiChieu: startDate,
                              danhGia: movieInfo.danhGia,
                              maNhom: movieInfo.maNhom,
                              trailer: movieInfo.trailer,
                              hinhAnh:null,
                        }}
                        onFinish={(values) => {
                            console.log(values);
                            let ngayKhoiChieu = moment(values.ngayKhoiChieu._d).format(
                                "DD/MM/YYYY"
                            );

                            // param đầu tiên trong Blob là 1 array chứa dạng dữ liệu
                            let blob = new Blob([values.hinhAnh[0].originFileObj], {
                                type: "image/jpg",
                            });

                            let formData = new FormData();

                            formData.append("tenPhim", values.tenPhim);
                            formData.append("moTa", values.moTa);
                            formData.append("ngayKhoiChieu", ngayKhoiChieu);
                            formData.append("sapChieu", values.sapChieu);
                            formData.append("dangChieu", values.dangChieu);
                            formData.append("hot", values.hot);
                            formData.append("danhGia", values.danhGia);
                            formData.append("maNhom", "GP01");
                            formData.append("trailer", values.trailer);
                            formData.append(
                                "hinhAnh",
                                blob,
                                values.hinhAnh[0].originFileObj.name
                            );

                            //   movieService
                            //     .editMovie(formData)
                            //     .then((res) => {
                            //       message.success(res.data.content);
                            //       // setIsOpenModalEdit(false);
                            //       // fetchFilmList();
                            //     })
                            //     .catch((err) => {
                            //       message.error(err.response.data.content);
                            //     });
                        }}
                        validateMessages={validateMessages}
                        className="w-5/6 mt-2 max-h-max xl:h-128 flex flex-col justify-center mx-auto"
                    >
                        <Form.Item
                            name={["tenPhim"]}
                            label="Tên phim"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input name='tenPhim' value='tenphim'/>
                        </Form.Item>
                        <Form.Item
                            name={["trailer"]}
                            label="Trailer phim"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["moTa"]}
                            label="Mô tả"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            name={["ngayKhoiChieu"]}
                            label="Ngày khởi chiếu"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <DatePicker
                                placeholder="Chọn ngày khởi chiếu"
                                className="w-72"
                                format={"DD/MM/YYYY"}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Sắp chiếu"
                            valuePropName="checked"
                            name="sapChieu"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            label="Đang chiếu"
                            valuePropName="checked"
                            name="dangChieu"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item label="18+" valuePropName="checked" name="hot">
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name={["danhGia"]}
                            label="Đánh giá"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber min={1} max={10} />
                        </Form.Item>
                        <Form.Item
                            name="hinhAnh"
                            label="Chọn ảnh bìa"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        // rules={[
                        //   {
                        //     required: true,
                        //   },
                        // ]}
                        >
                            <Upload
                                name="logo"
                                listType="picture"
                                defaultFileList={[
                                    {
                                        // uid: "1",
                                        // name: "xxx.png",
                                        // status: "done",
                                        // url: filmInfor.hinhAnh,
                                        // thumbUrl: filmInfor.hinhAnh,
                                    },
                                ]}
                            >
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>

                        <div className="text-center mb-8">
                            <button className="py-1 px-4 bg-blue-700 md:text-base rounded-md text-white">
                                Cập nhật
                            </button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default EditFilm;
