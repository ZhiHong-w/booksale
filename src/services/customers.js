/**
 * 用户管理界面发送请求
 */

import request from './request';

//获取用户列表
export function getUserList(params){
    return request({
        url:'/customers',
        method: 'get',
        params: params
    })
}

//添加用户
// export function addUser(addForm){
//     return request({
//         url: '/users',
//         method: 'post',
//         data: addForm
//     })
// }
//修改用户
// export function editUser(editForm){
//     return request({
//         url: `/users/${editForm.id}`,
//         method: 'put',
//         params: {
//             email: editForm.email,
//             mobile: editForm.mobile
//         }
//     })
// }
//删除用户
// export function deleteUser(id){
//     return request({
//         url: `/users/${id}`,
//         method: 'delete'
//     })
// }
