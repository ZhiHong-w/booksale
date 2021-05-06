import React, { memo,useState,useRef } from 'react';
import {useDispatch,useSelector,shallowEqual} from 'react-redux';
import { Button,Modal,message,Input,Form} from 'antd'

import { GoodsOperationWrapper } from './style';
import {
    EditOutlined,
    DeleteOutlined,
    WarningOutlined
} from '@ant-design/icons';

import { deleteGoods } from '../../../../services/goods';
import { getGoodsDispatch } from '../../store/actionCreators';

import { editGoods } from '../../../../services/goods';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

export default memo(function Operation(props) {

    const {book_id,book_number,book_price} = props.record;
    
    const [deleteVisable, setDeleteVisable] = useState(false);
    const [editVisable,setEditVisable] = useState(false);
    
    const { queryInfo } = useSelector(state => ({
        queryInfo: state.goods.queryInfo
    }),shallowEqual)
    const dispatch = useDispatch();

    const editFormRef = useRef();

    const editGoodsFormRules = {
        book_price: [
            { required: true, message: '请输入图书价格' },
        ],
        book_number: [
            { required: true, message: '请输入图书库存' },
        ]
    };

    const changeEditVisable = ()=>{
        setEditVisable(true);
    }

    const edithandleOk = async () => {
        const validate = editFormRef.current.getFieldsError();
        let flag = 0;
        for (let i = 0; i < validate.length; i++) {
            if (validate[i].errors.length > 0) {
                flag = 1;
                break;
            }
        }
        if (flag) {
            message.error({
                content: '信息填写不正确',
                key: 'validate'
            })
        } else {
            const goodsData = editFormRef.current.getFieldValue();
           
            //发送请求
            const { data: res } = await editGoods(book_id,goodsData);
            if (res && res.meta && res.meta.status !== 200) {
                message.error({
                    content: "更新图书信息失败",
                    key: 'validate'
                })
            } else {
                message.success({
                    content: "更新图书信息成功",
                    key: 'validate'
                })
                dispatch(getGoodsDispatch(queryInfo));
                editFormRef.current.resetFields();
                setEditVisable(false);
            }
        }
    }

    const edithandleCancel = () => {
        editFormRef.current.resetFields();
        setEditVisable(false);
    }

    const changeDeleteVisable = ()=>{
        setDeleteVisable(true);
    }
    const deletehandleOk = async ()=>{
         //发送请求
         const { data: res } = await deleteGoods(book_id);
         if (res && res.meta && res.meta.status !== 200) {
             message.error({
                 content: "删除商品信息失败",
                 key: 'validate'
             })
         } else {
             message.success({
                 content: "删除商品信息成功",
                 key: 'validate'
             })
             dispatch(getGoodsDispatch(queryInfo));
             setDeleteVisable(false);
         }
    }
    const deletehandleCancel = ()=>{
        setDeleteVisable(false);
    }
    return (
        <GoodsOperationWrapper>
            {/* 操作按钮 */}
            <div className="btn">
                <Button icon={<EditOutlined />}
                    type="primary" onClick={changeEditVisable}></Button>
                <Button icon={<DeleteOutlined />}
                    type="primary"
                    danger onClick={changeDeleteVisable}></Button>
            </div>
            <Modal title="修改图书"
                visible={editVisable}
                onOk={edithandleOk}
                onCancel={edithandleCancel}
                cancelText="取消"
                okText="确定">
                <Form size="large" {...layout} ref={editFormRef}>
                    <Form.Item label="图书价格（元）"
                        name="book_price"
                        required
                        rules={editGoodsFormRules.book_price}
                        initialValue={book_price}>
                        <Input type="text"></Input>
                    </Form.Item>
                    <Form.Item label="图书库存（本）"
                        name="book_number"
                        required
                        rules={editGoodsFormRules.book_number}
                        initialValue={book_number}>
                        <Input type="text"></Input>
                    </Form.Item>
                </Form>
            </Modal>
             {/* 删除用户 */}
             <Modal title="提示"
                visible={deleteVisable}
                onOk={deletehandleOk}
                onCancel={deletehandleCancel}
                cancelText="取消"
                okText="确定">
                <span><WarningOutlined /></span>
                <span className="warning">此操作将永久删除该商品, 是否继续?</span>
            </Modal>
        </GoodsOperationWrapper>
    )
})
