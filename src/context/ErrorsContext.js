import React, { createContext, useState } from 'react';

export const ErrorsContext = createContext();

export const ErrorsContextProvider = (props) => {
  const [notification, setNotification] = useState(null);
  return (
    <ErrorsContext.Provider
      value={{
        setNotification,
        notification,
      }}
    >
      {props.children}
    </ErrorsContext.Provider>
  );
};
