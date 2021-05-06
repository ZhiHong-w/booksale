/**
 * 订单列表中的操作列
 */
import React, { useRef, useState } from 'react';
import { Button, Modal, Cascader, Form, Input, message, Timeline } from 'antd'

import { OrdersOperationWrapper } from './style';
import {
    EditOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';

//城市数据
import cityData from '../../../../common/citydata'
//订单数据，以后放在数据库
import { locations } from '../../../../common/location';
import { editOrderLocation } from '../../../../services/orders';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

export default function OrdersOperation(props) {

    const { is_send } = props.record;

    const [editVisable, setEditVisable] = useState(false);
    const [locationVisable, setLocationVisable] = useState(false);

    const editFormRef = useRef();

    const addressFormRules = {
        address1: [
            { required: true, message: '请选择地址' },
        ],
        address2: [
            { required: true, message: '请输入详细地址' },
        ],
    };

    //编辑地址
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
            const ordersData = editFormRef.current.getFieldValue();
            console.log(ordersData);
            if (!ordersData.address1 || !ordersData.address2) {
                message.error({
                    content: '地址信息填写不完整',
                    key: 'validate'
                })
            } else {
                const address1 = ordersData.address1.join(',');
                const address2 = ordersData.address2;
                const id = props.record.order_id;
                const { data } = await editOrderLocation(id, address1, address2);
                //console.log(result);
                if (data.meta && data.meta.status === 200) {
                    message.success({
                        content: data.meta.msg,
                        key: 'validate'
                    })
                } else {
                    message.error({
                        content: data.meta.msg,
                        key: 'validate'
                    })
                }
            }
            //在这里发送请求修改地址
            editFormRef.current.resetFields();
            setEditVisable(false);
        }
    }
    const edithandleCancel = () => {
        editFormRef.current.resetFields();
        setEditVisable(false);
    }

    //物流详情
    const changeLocationVisable = () => {
        //在这里发送请求获取物流详情
        setLocationVisable(true);
    }
    const locationhandleCancel = () => {
        setLocationVisable(false);
    }
    const locationhandleOk = () => {
        setLocationVisable(false);
    }
    return (
        <OrdersOperationWrapper>
            {/* 操作按钮 */}
            <div className="btn">
                <Button icon={<EditOutlined />}
                    type="primary" onClick={changeEditVisable}></Button>
                <Button icon={<EnvironmentOutlined />}
                    className="location"
                    onClick={changeLocationVisable}></Button>
            </div>
            {/* 修改订单 */}
            <Modal title="修改地址"
                visible={editVisable}
                onOk={edithandleOk}
                onCancel={edithandleCancel}
                cancelText="取消"
                okText="确定">
                <Form size="large" {...layout} ref={editFormRef}>
                    <Form.Item label="省市区/县"
                        name="address1"
                        required
                        rules={addressFormRules.address1}>
                        <Cascader options={cityData} placeholder="请选择地址" />
                    </Form.Item>
                    <Form.Item label="详细地址"
                        name="address2"
                        required
                        rules={addressFormRules.address2}>
                        <Input type="text" placeholder="请输入详细地址"></Input>
                    </Form.Item>
                </Form>
            </Modal>
            {/* 物流详情 */}
            <Modal title="物流进度"
                visible={locationVisable}
                onCancel={locationhandleCancel}
                onOk={locationhandleOk}>
                {
                    is_send ?
                        <Timeline>
                            {
                                locations.map(item => {
                                    return (
                                        <Timeline.Item key={item.time}>
                                            {item.context}
                                            <div style={{ color: '#909399' }}>{item.time}</div>
                                        </Timeline.Item>
                                    )
                                })
                            }
                        </Timeline> : '暂无'
                    }

            </Modal>
        </OrdersOperationWrapper>
    )
}
