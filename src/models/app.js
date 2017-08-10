import * as usersService from '../services/server';

export default {
  namespace: 'indexPage',
  state: { isLogin:false, succeed: null },
  reducers: {
    receiveData(state, { payload: { rightsData } }) {

        return { ...state, rightsData }
    },
    receiveMoreData(state, { payload: { moreData, titleMore } }) {
        return { ...state, moreData, titleMore }
    },
    loginState(state, { payload: { isLogin, mobile, succeed,loginData } }){
        return { ...state, isLogin, mobile,succeed,loginData }
    },
    receiveDetail(state, { payload: { welDetailData } }){
        return { ...state, welDetailData }
    }

  },
  effects: {
    *fetchMore({ payload: { page ,limit,issuser } }, { call, put }) {
      const {data} = yield call(usersService.fetchMore, { page,limit,issuser });
      data.id = issuser;
      yield put({
        type: 'receiveMoreData',
        payload: {
          moreData: data,
          titleMore: issuser == 1 ? '广发好权益' : '大牌好权益'
        },
      });
    },
  
    *fetchSList({ payload: { } }, { call, put }) {
      const {data} = yield call(usersService.fetchSList);
      console.log('will')
      yield put({
        type: 'receiveData',
        payload: {
          rightsData: data,
        },
      });
    },
    *fetchDetail({ payload: { rightid } }, { call, put }) {
      const {data} = yield call(usersService.fetchDetail, rightid);
      yield put({
        type: 'receiveDetail',
        payload: {
          welDetailData: data,
        },
      });
    },
    *fetchAccess({ payload: { mobile, ticket, rightid } }, { call, put }) {
      const {data} = yield call(usersService.fetchAccess, { mobile, ticket });
      
 
      yield put({
        type: 'loginState',
        payload: {
          isLogin: true,
          mobile: data.mobile,
          loginData: data,
          succeed: true,
        },
      });
      if(data.mobile){
        yield put({
          type: 'mineWel/fetchMineWel',
          payload: {
          },
        });
        if(rightid) {
          yield put({
            type: 'welDetail/fetchRightCode',
            payload: {
              rightid
            },
          });
        }
      }
    },
  },
  subscriptions: {
      setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
  
        if(pathname.indexOf('more')>0) {
          const issuser = pathname.split('/')[2];
          dispatch({
            type: 'fetchMore',
            payload: {
              issuser,
            }
          })
        }else if(pathname.indexOf('detail')>0) {
          const id = pathname.split('/')[2];
          dispatch({
            type: 'fetchDetail',
            payload: {
              rightid: id
            }
          })
        }
      });
    },
  },
};
