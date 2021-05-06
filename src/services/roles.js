import request from './request';

export const getRoles = () => {
    return request({
        url: '/roles',
        method: 'get'
    })
}

export const addRole = (data) => {
    return request({
        url: '/roles',
        method: 'post',
        data: data
    })
}

export const editRole = (id,params) => {
    return request({
        url: `/roles/${id}`,
        method: 'put',
        params: params
    })
}

export const deleteRole = (id) => {
    return request({
        url: `/roles/${id}`,
        method: 'delete'
    })
}

export const editRights = (id,ps_ids) => {
    return request({
        url: `roles/${id}`,
        method: 'post',
        data: {
            ps_ids
        }
    })
}