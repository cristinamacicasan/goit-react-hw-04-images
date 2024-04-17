import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loader.module.css'; 

const Loader = ({ loading }) => {
  return loading && (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired, 
};

export default Loader;
