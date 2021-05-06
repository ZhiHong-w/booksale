/**
 * 用户列表数据
 */
import SwitchState from '../pages/users/cpns/switch';
import Operation from '../pages/users/cpns/operation';

export const columns = [
    {
        title: '',
        dataIndex: 'index',
        width: 100,
    },
    {
        title: '姓名',
        dataIndex: 'username'
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        width: 230,
    },
    {
        title: '电话',
        dataIndex: 'mobile',
        width: 230,
    },
    {
        title: '角色',
        dataIndex: 'role_name',
        width: 200,
    },
    // {
    //     title: '状态',
    //     dataIndex: 'state',
    //     render: (text,record) => <SwitchState record={record}/> 
    // },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 230,
        render: (text,record) => <Operation record={record} />
    }
]