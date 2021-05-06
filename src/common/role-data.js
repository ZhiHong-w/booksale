/**
 * 用户列表数据
 */

import Operation from '../pages/roles/cpns/operation';

export const columns = [
    {
        title: '',
        dataIndex: 'index',
        width: 100,
    },
    {
        title: '角色名',
        dataIndex: 'roleName'
    },
    {
        title: '角色描述',
        dataIndex: 'role_desc',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 230,
        render: (text,record) => <Operation record={record} />
    }
]