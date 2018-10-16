import React from 'react';
import cn from 'classnames';

import styles from './index.scss';

class Spinner extends React.Component {
  render () {
    const { className, absolute } = this.props;
    return (
      <div
        className={cn(
          styles.container,
          absolute && styles.absolute,
          className,
        )}
      >
        <div className={styles.spinner} />
      </div>
    );
  }
}

export default Spinner;
