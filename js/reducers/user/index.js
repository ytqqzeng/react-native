import types from '../../constants';

const initialState = {
    loginStaus: false,
    userInfo: {},
    userToken: null,
    isError:false,
    couponNum: 0,
    isLoding: false,
    orderNum: {
        state_new: 0,
        state_send: 0,
        state_success: 0,
        state_close: 0,
        state_unevaluate: 0,
        state_refund: 0,
    },
    cartNum: 0,
    cardList: [],
    unreadMessageNumber: 0,
    myDemandHallDetail: {},
    myDemandDetailFetchstatus: {},
    pointsSigninfo: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.user.USER_LODING:
            return Object.assign({}, state, {
                isLoding: true,
            })
        case types.user.USER_STATUS_CHANGE:
            return Object.assign({}, state, {
                loginStaus: true,
                isError:false

            })
        case types.user.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo,
                isLoding: false
            })
        case types.user.USER_LOGIN_OUT:
            return Object.assign({}, state, {
                loginStaus : false,
                userInfo:{}
            })
      
        // case types.user.GET_CART_TOTAL_NUM:
        //     return Object.assign({}, state, {
        //         cartNum : action.cartNum,
        //     })
        // case types.user.UPDATE_USER_INFO_LOADING:
        //     return Object.assign({}, state, {
        //         refreshing: action.refreshing,
        //     })
        // case types.user.GET_USER_CARD_LIST:
        //     return Object.assign({}, state, {
        //         cardList: action.cardList,
        //     })
        // case types.user.SET_UNREAD_MESSAGE_NUMBER:
        //     return Object.assign({}, state, {
        //         unreadMessageNumber: action.number,
        //     })
        // case types.user.GET_USER_POINTS_SIGNINFO:
        //     return Object.assign({}, state, {
        //         pointsSigninfo: action.pointsSigninfo,
        //     })
        // case types.user.GET_USER_MYDEMANDDETAIL:
        //     return Object.assign({}, state, {
        //         myDemandHallDetail:action.myDemandDetailData,
        //         myDemandDetailFetchstatus:action.myDemandDetailStatus,
        //     })
        default:
            return state;
    }
}
