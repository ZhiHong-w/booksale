/**
 * 用户管理中的用户列表
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Card, Table, Row, Col, Button } from 'antd';
//样式
import { RolesWrapper } from './style';
//面包屑导航
import Breadcrus from '../../components/breadcrumb';
import { breadUsers } from '../../common/bread-data';
//action
import {
    changeRolesDispatch,
    changeAddRoleModalVisableAction
} from './store/actionCreators';
//table列
import { columns } from '../../common/role-data';

//modal
import AddRoleModal from './cpns/addRoleModal';

export default function Roles() {


    const { roleList } = useSelector(state => ({
        roleList: state.roles.roleList,
    }), shallowEqual);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeRolesDispatch())
    }, [dispatch]) 

    //添加用户按钮
    const showModal = () => {
        dispatch(changeAddRoleModalVisableAction(true));
    }
 

    return (
        <RolesWrapper>
            {/* 面包屑导航 */}
            <Breadcrus breadData={breadUsers}></Breadcrus>
            <Card>
                {/* 搜索和添加角色 */}
                <div className="user-header">
                    <Row gutter="20">
                        <Col span="4">
                            <Button type="primary"
                                onClick={showModal}
                                size="large">添加角色</Button>
                            {/* 弹出框 */}
                            <AddRoleModal />
                        </Col>
                    </Row>
                </div>
                {/* 表格 */}
                <Table columns={columns}
                    dataSource={roleList}
                    pagination={false} bordered></Table>
            </Card>
        </RolesWrapper>
    )
}
