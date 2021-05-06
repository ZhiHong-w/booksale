/**
 * 顾客列表数据
 */
import IsVip from '../pages/customers/cpns/isVip';


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
        title: 'VIP',
        dataIndex: 'user_is_vip',
        render: (text,record) => <IsVip record={record}></IsVip>,
        width: 200,
    },
    {
        title: '注册时间',
        dataIndex: 'create_time'
    }
    // {
    //     title: '状态',
    //     dataIndex: 'state',
    //     render: (text,record) => <SwitchState record={record}/> 
    // },
]