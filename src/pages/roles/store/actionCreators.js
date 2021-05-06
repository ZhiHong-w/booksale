import * as actionType from './constants';

import { getRoles } from '../../../services/roles';
import { getRightsTree } from '../../../services/rights';

import { insertRoleList } from '../../../utils/roleList';

const changeRoleListAction = (roleList)=>({
    type: actionType.CHANGE_ROLE_LIST,
    roleList
})

//获取userList total
export const changeRolesDispatch = ()=>{
    return dispatch => {
        getRoles().then(res=>{
            //console.log(res);
            const data = res.data;
            if(data.meta.status === 200){

                const roleList = insertRoleList(data.data);
                
                dispatch(changeRoleListAction(roleList));
            }  
        })
    }
}

//改变addUserModalVisable
export const changeAddRoleModalVisableAction = (isVisable) => ({
    type: actionType.CHANGE_ADD_ROLE_MODAL_VISABLE,
    addRoleModalVisable: isVisable
})

export const changeRightsDispatch = (rightsList) => ({
    type: actionType.GET_RIGHTS_TREE,
    rightsList
})


export const getRightsDispatch = () => {
    return dispatch => {
        getRightsTree().then(res => {
            const data = res.data;
            if(data.meta.status === 200){
                dispatch(changeRightsDispatch(data.data));
            }
        })
    }
}

