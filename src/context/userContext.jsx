import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('user_id');
    const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';

    return isAuthenticated && token && username && userId
      ? { id: userId, name: username, token }
      : null;
  });

  useEffect(() => {
    if (currentUser?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${currentUser.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
