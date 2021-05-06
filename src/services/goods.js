import request from './request';

export const getGoodsList = (params)=>{
    return request({
        url: '/goods',
        method: 'get',
        params: params
    })
}

export const deleteGoods = (id)=>{
    return request({
        url: `/goods/${id}`,
        method: 'delete'
    })
}

export const addGoods = (data) => {
    return request({
        url: '/goods',
        method: 'post',
        data: data
    })
}

export const editGoods = (id,params) => {
    return request({
        url: `/goods/${id}`,
        method: 'put',
        params: params
    })
}

