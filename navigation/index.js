import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
/**
 * protect routes by auth provider
 */
const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default Providers;
