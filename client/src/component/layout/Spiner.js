import React, { Fragment } from 'react';

import spiner from './spiner.gif';

export default () => {
  return (
    <Fragment>
      <img
        src={spiner}
        style={{ width: '50px', margin: 'auto', display: 'block' }}
        alt="loading"
      />
    </Fragment>
  );
};
