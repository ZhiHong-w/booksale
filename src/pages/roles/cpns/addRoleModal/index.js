/**
 * 添加用户弹窗
 */
import React, { useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Modal, Form, Input, message } from 'antd';

import {
    changeAddRoleModalVisableAction,
    changeRolesDispatch
} from '../../store/actionCreators';


//添加用户请求
import { addRole } from '../../../../services/roles';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

export default function AddRoleModal() {

    const { addRoleModalVisable } = useSelector(state => ({
        addRoleModalVisable: state.roles.addRoleModalVisable
    }), shallowEqual);

    const dispatch = useDispatch();

    const addFormRef = useRef();

    //验证表单
    const addRoleFormRules = {
        role_name: [
            { required: true, message: '请输入角色名'},
            { min: 2, max: 10, message: '角色名的长度在2~10个字符之间'}
        ],
    };


    //添加角色点击确定按钮
    const handleOk = async () => {
        const validate = addFormRef.current.getFieldsError();
        let flag = 0;
        for (let i = 0; i < validate.length; i++) {
            if (validate[i].errors.length > 0) {
                flag = 1;
                break;
            }
        }
        //    console.log(flag);
        console.log(validate);
        if (flag) {
            message.error({
                content: '信息填写不正确',
                key: 'validate'
            })
        } else {
            const roleData = addFormRef.current.getFieldValue();
            //添加角色请求
            const { data: res } = await addRole(roleData);
            if (res && res.meta && res.meta.status !== 201) {
                message.error({
                    content: res.meta.msg,
                    key: 'validate'
                })
            } else {
                message.success({
                    content: "添加角色信息成功",
                    key: 'validate'
                })
                dispatch(changeRolesDispatch());
                addFormRef.current.resetFields();
                dispatch(changeAddRoleModalVisableAction(false));
            }
        }
    };
    //添加用户取消
    const handleCancel = () => {
        addFormRef.current.resetFields();
        dispatch(changeAddRoleModalVisableAction(false));
        //console.log(addFormRef.current);
    };

    return (
        <>
            <Modal title="添加角色"
                visible={addRoleModalVisable}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="取消"
                okText="确定">
                <Form size="large" {...layout} ref={addFormRef}>
                    <Form.Item label="角色名"
                        name="role_name"
                        required
                        rules={addRoleFormRules.role_name}>
                        <Input type="text"></Input>
                    </Form.Item>
                    <Form.Item label="角色描述"
                        name="role_desc"
                        required>
                        <Input.TextArea rows={4}></Input.TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
