import * as usersService from '../services/server';

export default {
  namespace: 'mineWel',
  state: {},
  reducers: {
    receiveMineWel(state, { payload: { welMineData } }) {
      return { ...state, welMineData }
    },
    selectTab(state, { payload:{ selectTab } }){
      return { ...state, selectTab }
    },
  },
  effects: {
    *fetchMineWel({ payload: {} },{ call, put}) {
      const {data} = yield call(usersService.fetchMineWel);
      yield put({
        type: 'receiveMineWel',
        payload: {
          welMineData: data,
        },
      });
    },
  
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
    
        if(pathname.indexOf('mineWel') > 0) {
        
          dispatch({ type: 'fetchMineWel', payload: {} })
          dispatch({ type: 'selectTab', payload: { selectTab: 'mineTab' } })
        } else if(!pathname.split('/')[1]) {
          dispatch({ type: 'selectTab', payload: { selectTab: 'indexTab' } })
        } else {
          dispatch({ type: 'selectTab', payload: { selectTab: 'others' } })
        }
      });
    },
  },
};
