import React, { memo } from 'react';
import { Tag } from 'antd';

export default memo(function IsVip(props) {
    const {user_is_vip} = props.record;
    const isPay = (pay) => {
        if(pay === 0){
            return <Tag color="red">否</Tag>
        } else {
            return <Tag color="blue">是</Tag>
        }
    }
    return (
        <div>
            {
                isPay(user_is_vip)
            }
        </div>
    )
})
