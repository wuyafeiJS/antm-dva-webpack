import React from 'react';
import { Link } from 'dva/router';
import { Grid } from 'antd-mobile';

const arrow_right = require('images/arrow_right.jpg');
function MoreWelfare(props) {
  console.log()
  console.log(props.weldata.data.length,'kkkk')
  return (
    <div className="qy">
      <div className="qy-title">
        <p className="tl"><span className="icon"><img src={props.weldata.titleIcon} /></span><span>{props.weldata.title}</span></p>
        <p className="tr">{props.weldata.more?<Link to={'/more/'+props.weldata.id}><span>{props.weldata.more}</span><span className="icon"><img src={arrow_right} /></span></Link>:''}</p>
      </div>
      {props.weldata.data && props.weldata.data.length>0 && <Grid data={props.weldata.data} hasLine={false}
        renderItem={(dataItem) => (
          <Link to={'/detail/'+dataItem._id} style={{ padding: '0.36rem 0',display: 'block' }}>
            <img src={dataItem.logoUrl} style={{ width: '1rem', height: '1rem' }} alt="icon" />
            <div style={{ color: '#666', fontSize: '0.24rem', marginTop: '0.15rem' }}>
              <span>{dataItem.logoName}</span>
            </div>
          </Link>
        )}
        />}
        {props.weldata.data.length == 0 && <p className='noInfo'>敬请期待！</p>}
    </div>
  );
}

export default MoreWelfare;
