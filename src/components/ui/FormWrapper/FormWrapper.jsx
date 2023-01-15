import React from 'react';
import PropTypes from "prop-types";

import styles from './FormWrapper.module.css';

function FormWrapper({children}) {
  return (
      <main className={styles.wrapper}>{children}</main>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node,
};

export default FormWrapper;