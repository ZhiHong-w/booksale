/**
 * users的redux
 */
import * as actionType from './constants';

const defaultState = {
    roleList: [],
    addRoleModalVisable: false,
    rightsList: []
}

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionType.CHANGE_ROLE_LIST:
            return { ...state, roleList: action.roleList };
        case actionType.CHANGE_ADD_ROLE_MODAL_VISABLE:
            return { ...state, addRoleModalVisable: action.addRoleModalVisable};
        case actionType.GET_RIGHTS_TREE:
            return { ...state, rightsList: action.rightsList};
        default:
            return state;
    }
}

export default reducer;