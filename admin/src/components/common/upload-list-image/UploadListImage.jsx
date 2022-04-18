import React, { useState, useEffect } from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


export default function UploadListImage(props) {

    const [fileList, setFileList] = useState([])

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {

        if (props.fileList && props.fileList.length) {
            let _fileList = [...props.fileList];
            _fileList = _fileList.map((el) => {
                return {
                    uid: Math.floor(Math.random() * 100000).toString(),
                    name: 'image.png',
                    status: 'done',
                    url: el,
                }
            })
            setFileList(_fileList)
        }

    }, [props.fileList])


    const handleChange = async (info) => {
        const _fileList = [...fileList];
        if (info.file.status === "removed") {
            const index = _fileList.findIndex((el) => el.uid === info.file.uid);
            _fileList.splice(index, 1)
        }

        if (info.file.status === "uploading") {
            const url = await getBase64(info.file.originFileObj)
            _fileList.push({
                uid: Math.floor(Math.random() * 100000).toString(),
                name: 'image.png',
                status: 'done',
                url,
            })
        };
        setFileList(_fileList)
        const arrImages = _fileList.map((el) => el.url)
        props.onChange(arrImages)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleCancel = () => setPreviewVisible(false)

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };


    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            props.beforeUpload("Định dạng hình ảnh không hợp lệ.")
            return false
        }
        const isValidSize = file.size / 1024 / 1024 <= props.maxSize;
        if (!isValidSize) {
            props.beforeUpload("Dung lượng hình ảnh không được lớn hơn " + props.maxSize + "MB")
            return false
        }
        return isJpgOrPng && isValidSize;
    }

    return (
        <>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                customRequest={({ file, onSuccess }) => {
                    setTimeout(() => {
                        onSuccess("ok");
                    }, 0);
                }}
                onPreview={handlePreview}
                beforeUpload={beforeUpload}
                disabled={props.disabled}
            >
                {fileList.length >= (props.maxItem || 10) ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={null}
                footer={null}
                onCancel={handleCancel}
            >
                <div className='mt-6'>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </div>

            </Modal>
        </>
    )
}
