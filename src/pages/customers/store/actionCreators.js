import * as actionType from './constants';

import { getUserList } from '../../../services/customers';
import { insertUserList } from '../../../utils/userList';

const changeUserListAction = (userList)=>({
    type: actionType.CHANGE_USER_LIST,
    userList
})

const changeTotalAction = (total)=>({
    type: actionType.CHANGE_TOTAL,
    total
})
//获取userList total
export const changeUsersDispatch = (params)=>{
    return dispatch => {
        getUserList(params).then(res=>{
            //console.log(res);
            const data = res.data;
            if(data.meta.status === 200){

                const userList = insertUserList(data.data.users);
                
                dispatch(changeUserListAction(userList));
                dispatch(changeTotalAction(data.data.total));
            }  
        })
    }
}

export const changeQueryInfoAction = (queryInfo) => ({
    type: actionType.CHANGE_QUERY_INFO,
    queryInfo
})

