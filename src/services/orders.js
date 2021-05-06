import request from './request'
//获取订单裂帛安排
export const getOrdersList = (params) =>{
    return request({
        url: '/orders',
        method: 'get',
        params: params
    })
}

export const editOrderLocation = (id,address1,address2) => {
    return request({
        url: `/orders/${id}`,
        method: 'put',
        params: {
            address1,
            address2
        }
    })
}