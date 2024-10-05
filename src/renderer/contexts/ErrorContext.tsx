import React, { createContext, useContext, useState, ReactNode } from 'react';

const ErrorContext = createContext<{
  errorPresent: boolean;
  setErrorPresent: (value: boolean) => void;
}>({
  errorPresent: false,
  setErrorPresent: () => {},
});

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [errorPresent, setErrorPresent] = useState<boolean>(false);

  return (
    <ErrorContext.Provider value={{ errorPresent, setErrorPresent }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  return useContext(ErrorContext);
};
