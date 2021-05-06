import React, { useState, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { Button, Modal, message, Form, Input } from 'antd'

import { CateOperationWrapper } from './style';
import {
    EditOutlined,
    DeleteOutlined,
    WarningOutlined
} from '@ant-design/icons';
import { deleteCate } from '../../../../services/categories';
import { getCategoryTotalDispatch } from '../../store/actionCreators';

import { editCate } from '../../../../services/categories';

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};

export default function Operation(props) {

    const { cat_id,cat_name } = props.record;

    const { queryInfo } = useSelector(state => ({
        queryInfo: state.categories.queryInfo
    }), shallowEqual)

    const dispatch = useDispatch();

    const editFormRef = useRef();

    const [deleteVisable, setDeleteVisable] = useState(false);
    const [editVisable, setEditVisable] = useState(false);

    const changeEditVisable = () => {
        setEditVisable(true);
    }
    const handleOk = async () => {
        const { cat_name } = editFormRef.current.getFieldValue();
        if (cat_name) {
            const { data: res } = await editCate(cat_id, cat_name);
            if (res && res.meta && res.meta.status !== 200) {
                message.error({
                    content: "更新分类信息失败",
                    key: 'validate'
                })
            } else {
                message.success({
                    content: "更新分类信息成功",
                    key: 'validate'
                })
                dispatch(getCategoryTotalDispatch(queryInfo));
                editFormRef.current.resetFields();
                setEditVisable(false);
            }
        } else {
            message.error({
                content: '请输入分类名',
                key: 'validate'
            })
        }
    }
    const handleCancel = () => {
        editFormRef.current.resetFields();
        setEditVisable(false);
    }


    const changeDeleteVisable = () => {
        setDeleteVisable(true);
    }
    const deletehandleOk = async () => {
        //发送请求
        const { data: res } = await deleteCate(cat_id);
        if (res && res.meta && res.meta.status !== 200) {
            message.error({
                content: "删除分类信息失败",
                key: 'validate'
            })
        } else {
            message.success({
                content: "删除分类信息成功",
                key: 'validate'
            })
            dispatch(getCategoryTotalDispatch(queryInfo));
            setDeleteVisable(false);
        }
    }
    const deletehandleCancel = () => {
        setDeleteVisable(false);
    }
    return (
        <CateOperationWrapper>
            {/* 操作按钮 */}
            <div className="btn">
                <Button icon={<EditOutlined />}
                    type="primary" onClick={changeEditVisable}>编辑</Button>
                <Button icon={<DeleteOutlined />}
                    type="primary"
                    danger onClick={changeDeleteVisable}>删除</Button>
            </div>

            <Modal title="添加分类"
                visible={editVisable}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="取消"
                okText="确定">
                <Form size="large" {...layout} ref={editFormRef}>
                    <Form.Item label="分类名"
                        name="cat_name"
                        required
                        initialValue={cat_name}>
                        <Input type="text"></Input>
                    </Form.Item>
                </Form>
            </Modal>

            {/* 删除分类 */}
            <Modal title="提示"
                visible={deleteVisable}
                onOk={deletehandleOk}
                onCancel={deletehandleCancel}
                cancelText="取消"
                okText="确定">
                <span><WarningOutlined /></span>
                <span className="warning">此操作将永久删除该分类, 是否继续?</span>
            </Modal>
        </CateOperationWrapper>
    )
}
