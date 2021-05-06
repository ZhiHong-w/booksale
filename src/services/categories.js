import request from './request';

//获取分类列表
export const getCategoryList = (queryInfo)=>{
    return request({
        url: '/categories',
        method: 'get',
        params: queryInfo
    })
}

export const getParentCateList = ()=>{
    return request({
        url: '/categories',
        method: 'get',
        params: {
            type: 1
        }
    })
}

export const addCate = (addCateForm)=>{
    return request({
        url: '/categories',
        method: 'post',
        data: addCateForm
    })
}

export const deleteCate = (id) => {
    return request({
        url: `/categories/${id}`,
        method: 'delete',
    })
}

export const editCate = (id,cat_name) => {
    return request({
        url: `/categories/${id}`,
        method: 'put',
        params: {
            cat_name
        }
    })
}