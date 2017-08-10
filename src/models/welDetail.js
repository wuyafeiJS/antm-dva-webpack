import * as usersService from '../services/server';

export default {
  namespace: 'welDetail',
  state: {},
  reducers: {
    receiveRightCode(state, { payload: { rightCode } }) {
      
        return { ...state, rightCode }
    },
  },
  effects: {
    *fetchRightCode({ payload: {rightid} },{ call, put}) {
      const {data} = yield call(usersService.fetchRightCode,rightid);
      
      yield put({
        type: 'receiveRightCode',
        payload: {
          rightCode: data,
        },
      });
    },
  },
  subscriptions: {
    
  },
};
