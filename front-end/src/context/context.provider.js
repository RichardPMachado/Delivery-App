import React, { useState, useMemo } from 'react';

import PropTypes from 'prop-types';
import SaleContext from './sale.context';

function ContextProvider({ children }) {
  const [saleId, setSaleId] = useState(0);

  const contextValue = useMemo(() => (
    { saleId,
      setSaleId,
    }), [saleId]);

  return (
    <SaleContext.Provider value={ contextValue }>
      {children}
    </SaleContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
