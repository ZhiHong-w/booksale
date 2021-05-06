import React, { memo, useRef, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Button, Modal, Form, Input, message, Tooltip, Select, Tree } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
    WarningOutlined
} from '@ant-design/icons';

import { OperationWrapper } from './style';

//编辑发送请求
import { editRole, deleteRole, editRights } from '../../../../services/roles';

import {
    getRightsDispatch,
    changeRolesDispatch
} from '../../store/actionCreators';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

export default memo(function Operation(props) {

    const { id, roleName, role_desc, ps_ids } = props.record;
    //const selectIds = ps_ids.split(',');

    const [editVisable, setEditVisable] = useState(false);
    const [deleteVisable, setDeleteVisable] = useState(false);

    const [settingVisable, setSettingVisable] = useState(false);
     

    const  selectedId = ps_ids ? (ps_ids+'').split(',') : [];
    for(var i=0; i<selectedId.length; i++){
        selectedId[i] = parseInt(selectedId[i]);
    }
    const [checkedKeys, setCheckedKeys] = useState(selectedId);
    const [selectedKeys, setSelectedKeys] = useState(selectedId);

    const editFormRef = useRef();

    const { rightsList } = useSelector(state => ({
        rightsList: state.roles.rightsList
    }), shallowEqual);
    const dispatch = useDispatch();

    //编辑验证表单
    const editRoleFormRules = {
        role_name: [
            { required: true, message: '请输入角色名' }
        ],
        role_desc: [
            { required: true, message: '请输入角色描述' }
        ]
    };

    //编辑用户
    const changeEditVisable = () => {
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
            const roleData = editFormRef.current.getFieldValue();

            //发送请求
            const { data: res } = await editRole(id, roleData);
            if (res && res.meta && res.meta.status !== 200) {
                message.error({
                    content: "更新用户信息失败",
                    key: 'validate'
                })
            } else {
                message.success({
                    content: "更新用户信息成功",
                    key: 'validate'
                })
                dispatch(changeRolesDispatch());
                editFormRef.current.resetFields();
                setEditVisable(false);
            }
        }
    }
    const edithandleCancel = () => {
        //console.log(props.record);
        editFormRef.current.resetFields();
        setEditVisable(false);
    }

    //删除用户
    const changeDeleteVisable = () => {
        setDeleteVisable(true);
    }
    const deletehandleOk = async () => {
        //发送请求
        const { data: res } = await deleteRole(id);
        if (res && res.meta && res.meta.status !== 200) {
            message.error({
                content: "删除用户信息失败",
                key: 'validate'
            })
        } else {
            message.success({
                content: "删除用户信息成功",
                key: 'validate'
            })
            dispatch(changeRolesDispatch());
            setDeleteVisable(false);
        }
    }
    const deletehandleCancel = () => {
        setDeleteVisable(false);
    }

    const changeSettingVisable = () => {
        dispatch(getRightsDispatch())
        setSettingVisable(true);
    }
    const settinghandleOk = async () => {
        // console.log(id,roleId);
        const {data: res} = await editRights(id,checkedKeys.join(','));
        //console.log(res);
        if(res && res.meta && res.meta.status !== 200){
            message.error({
                content: '更新权限失败',
                key: 'role'
            })
        } else {
            message.success({
                content: '更新权限成功',
                key: 'role'
            })
            dispatch(changeRolesDispatch());
            setSettingVisable(false);
        }
    }
    const settinghandleCancel = () => {
        //console.log(roleId);
        setSettingVisable(false);
    }

   // const [expandedKeys, setExpandedKeys] = useState([101, 102]);
    
    //console.log(selectedId);
   
    // const [autoExpandParent, setAutoExpandParent] = useState(true);



    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue, info) => {
        //console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };



    return (
        <OperationWrapper>
            {/* 操作按钮 */}
            <div className="btn">
                <Button icon={<EditOutlined />}
                    type="primary" onClick={changeEditVisable}></Button>
                <Button icon={<DeleteOutlined />}
                    type="primary"
                    danger onClick={changeDeleteVisable}></Button>
                <Tooltip title="分配权限">
                    <Button icon={<SettingOutlined />}
                        className="setting" onClick={changeSettingVisable}></Button>
                </Tooltip>
            </div>
            {/* 修改用户 */}
            <Modal title="修改角色"
                visible={editVisable}
                onOk={edithandleOk}
                onCancel={edithandleCancel}
                cancelText="取消"
                okText="确定">
                <Form size="large" {...layout} ref={editFormRef}>
                    <Form.Item label="角色名"
                        name="role_name"
                        initialValue={roleName}
                        required
                        rules={editRoleFormRules.role_name}>
                        <Input type="text"></Input>
                    </Form.Item>
                    <Form.Item label="角色描述"
                        name="role_desc"
                        required
                        rules={editRoleFormRules.role_desc}
                        initialValue={role_desc}>
                        <Input.TextArea role={4}></Input.TextArea>
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
                <span className="warning">此操作将永久删除该角色但该角色可能正在使用, 是否继续?</span>
            </Modal>

            <Modal title="分配权限"
                visible={settingVisable}
                onOk={settinghandleOk}
                onCancel={settinghandleCancel}
                cancelText="取消"
                okText="确定">
                <Tree
                    checkable
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    defaultExpandAll={true}
                    treeData={rightsList}
                />
            </Modal>
        </OperationWrapper>
    )
})
