import React, { memo, useRef,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Form, Input, Upload, Button, message,Cascader } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import {
    changeAddGoodsModalVisable,
    getGoodsDispatch
} from '../../store/actionCreators';
import { addGoods } from '../../../../services/goods';

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};

export default memo(function AddGoodsModal() {

    const { addGoodsModalVisable,queryInfo,cateList } = useSelector(state => ({
        addGoodsModalVisable: state.goods.addGoodsModalVisable,
        queryInfo: state.goods.queryInfo,
        cateList: state.categories.cateList
    }))

    const dispatch = useDispatch();

    const addFormRef = useRef();

    const filedNames = {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
    }

    const addGoodsFormRules = {
        book_name: [
            { required: true, message: '请输入书名' }
        ],
        book_author: [
            { required: true, message: '请输入作者' }
        ],
        book_price: [
            { required: true, message: '请输入价格（元）' }
        ],
        book_number: [
            { required: true, message: '请输入库存（本）' }
        ],
        cate: [
            { required: true, message: '请选择地址' },
        ],
        book_introduce: [
            { required: true, message: '请输入描述信息' },
        ]
    };

    const handleOk = async () => {
        const validate = addFormRef.current.getFieldsError();
        let flag=0;
        for(let i=0; i<validate.length; i++){
            if(validate[i].errors.length > 0){
                flag=1;
                break;
            }
        }
    //    console.log(flag);
    //    console.log(validate);
        if(flag){
            message.error({
                content: '信息填写不正确',
                key: 'validate'
            })
        }else {
            const bookData = addFormRef.current.getFieldValue();
            console.log(bookData);
            //添加用户请求
            const {data: res} = await addGoods(bookData);
            if(res && res.meta && res.meta.status !== 201){
                message.error({
                    content: res.meta.msg,
                    key: 'validate'
                })
            }else {
                message.success({
                    content: "添加图书信息成功",
                    key: 'validate'
                })
                dispatch(getGoodsDispatch(queryInfo));
                addFormRef.current.resetFields();
                dispatch(changeAddGoodsModalVisable(false));
            }
        }
    }

    const handleCancel = () => {
        addFormRef.current.resetFields();
        dispatch(changeAddGoodsModalVisable(false));
    }

    const action = 'http://localhost:8000/upload/avatar';

    const fileChange = (info) => {
       // console.log(info.file, info.fileList);

    }

    const beforeUpload = (file,fileList) => {
       
    }

    const fileRemove = (file) => {
       return true;
    }

    return (
        <>
            <Modal title="添加商品"
                visible={addGoodsModalVisable}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="取消"
                okText="确定">
                <Form size="large" {...layout} ref={addFormRef}>
                    <Form.Item label="书名"
                        name="book_name"
                        required
                        rules={addGoodsFormRules.book_name}>
                        <Input type="text"></Input>
                    </Form.Item>
                    <Form.Item label="作者"
                        name="book_author"
                        required
                        rules={addGoodsFormRules.book_author}>
                        <Input type="text"></Input>
                    </Form.Item>
                    <Form.Item label="价格"
                        name="book_price"
                        required
                        rules={addGoodsFormRules.book_price}>
                        <Input type="text"></Input>
                    </Form.Item>
                    <Form.Item label="库存"
                        name="book_number"
                        required
                        rules={addGoodsFormRules.book_number}>
                        <Input type="text"></Input>
                    </Form.Item>
                    <Form.Item label="类别"
                        name="cate"
                        required
                        rules={addGoodsFormRules.cate}>
                        <Cascader options={cateList} fieldNames={filedNames} placeholder="请选择分类" />
                    </Form.Item>
                    <Form.Item label="描述"
                        required
                        name="book_introudce"
                        rules={addGoodsFormRules.book_introduce}>
                        <Input.TextArea rows={4}></Input.TextArea>
                    </Form.Item>
                </Form>
                <Upload name="avatar" 
                        action={action} 
                        onChange={fileChange} 
                        listType="picture" 
                        beforeUpload={beforeUpload} 
                        onRemove={fileRemove}>
                    <Button icon={<UploadOutlined />} type="primary">上传封面</Button>
                </Upload>
            </Modal>
        </>
    )
})
