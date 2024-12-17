import { createContext, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

export const Context = createContext({ isAuthorized: false, user: { role: '' } });

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser ] = useState({ role: '' });

  const loginUser  = (userData) => {
    setIsAuthorized(true);
    setUser (userData);
  };

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser , loginUser  }}>
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);