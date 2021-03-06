import React from 'react';
import '../../assets/scss/spinner.scss';

const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <span className="fa fa-spinner fa-spin fa-3x fa-fw"></span>
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinner;
