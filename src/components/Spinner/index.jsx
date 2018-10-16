import React from 'react';

import styles from './index.scss';

class Spinner extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.spinner} />
      </div>
    );
  }
}

export default Spinner;
