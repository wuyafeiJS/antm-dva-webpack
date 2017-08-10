import React, { Component } from 'react'
import { connect } from 'dva';
import { Link } from 'dva/router';
import WelReceive from 'components/WelReceive';


class MineWel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHide: true,
    }
  }
  hideModal(){
    this.setState({
      modalHide:true,
    })
  }
  componentDidMount() {
    const body = document.getElementsByTagName('body')[0];
    document.title = '更多特权';
    const iframe = document.createElement("IFRAME");
    iframe.setAttribute("id", "setTitle")
    iframe.setAttribute("src", "/favicon.ico")
    body.appendChild(iframe);
    const frame = document.getElementById('setTitle')
    frame.onload = function () {
      console.log('hah')
      setTimeout(function() {
        iframe.onload = null;
        
        body.removeChild(iframe)
      }, 0);
    }
  }
  componentWillReceiveProps(newProps) {
    const { welMineData, loading2, isLogin, loading } = newProps;
    console.log(loading2,)
    if(loading2 == false & welMineData.code === 401) {
      this.setState({
        modalHide: false,
      })
    }
    console.log('hahjj')

  }
  render() {
    const { dispatch, loading2, welMineData } = this.props;
    if (loading2==false && welMineData) {
      var { coupons } = welMineData;
    }
    console.log(coupons,'ccc')
    // 分割线
    const btnTxt = {
      text: '登录',
      id: 'loginin'
    }
    // 行内容
    
    return (
      <div id="mineWel">
        <WelReceive btnTxt={btnTxt} dispatch={dispatch} hide={this.state.modalHide} hideModal={this.hideModal.bind(this)} />
        {loading2 == false && coupons && <ul>
          {coupons.map((v,k)=>(
            <li key={k}>
              <Row rowData={v} rowID={k}/>
              <Separator rowID={k} />
            </li>
          ))}
          
        </ul>}
        {!coupons || coupons.length == 0 && <div style={{textAlign:'center'}}>没有数据!</div>}
      </div>
      
    );
  }
}
const Separator = ({rowID}) => (
      <div key={rowID}
        style={{
          backgroundColor: '#f7f7f7',
          height: 10,
        }}
      />
    );
const Row = ({rowData, rowID}) => {
      function getTime(time) {
        const t = new Date(time);
        const year = t.getFullYear();
        const month = t.getMonth();
        const day = t.getDate();
        return year + '-' + (month +1) + '-' + day;
      }
      
      const {rightsId,uuid} = rowData;
       console.log(rightsId,'jaj')
      var { logoUrl, startTime, endTime, price,_id } = rightsId;
      startTime = getTime(startTime)
      endTime = getTime(endTime)
      price = (price*1).toFixed(2).toString().split('.');
      console.log(rightsId.logoUrl,'jaj')
      return (
        <div key={rowID} className="row welRow">
          <div className="price">
            <div className="icon">
              <img src={logoUrl} alt="icon"/>
            </div>
            <div className="info">
              <p>{rowData.rightsId.name}</p>
              <p>
                &yen;
                <span> {price[0]}</span>.{price[1]}
              </p>
            </div>
          </div>
          <div className="date">
            <p>
              <span>有效期：{startTime}至{endTime}</span>
          
            </p>
            <p className="btn">
              <button><Link style={{color: "#fff"}} to={{pathname:`/detail/${_id}`,query:{uuid}}}>去使用</Link></button>
            </p>
          </div>
        </div>
      );
    };

function mapStateToProps(state) {
  return {
    isLogin: state.indexPage.isLogin,
    welMineData: state.mineWel.welMineData,
    loading2: state.loading.models.mineWel,
    loading: state.loading.models.indexPage,
  };
}

export default connect(mapStateToProps)(MineWel);
