'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  signinUrl: '',
  apiPrefix: 'http://10.2.124.15:8889'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
