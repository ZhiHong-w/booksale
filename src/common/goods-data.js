import Operation from '../pages/goods/cpns/operation'
export const columns = [
    {
        title: '',
        dataIndex: 'index'
    },
    {
        title: '图书名称',
        dataIndex: 'book_name',
        width: 330
    },
    {
        title: '图书作者',
        dataIndex: 'book_author',
        width: 330
    },
    {
        title: '图书价格（元）',
        dataIndex: 'book_price'
    },
    {
        title: '图书库存(本)',
        dataIndex: 'book_number'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        render: (text,record) => <Operation record={record}/>,
        width: 100
    }
]