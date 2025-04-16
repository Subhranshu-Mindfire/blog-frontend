import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.id) {
      console.log("Hii")
      toast.error('Please login to access this!', {
        position: 'top-right',
        autoClose: 3000,
      });

      const timeout = setTimeout(() => {
        navigate('/login', { replace: true });
      }, 100);

      return () => clearTimeout(timeout); 
    }
  }, [currentUser]);

  if (!currentUser?.id) return null;

  return children;
};

export default ProtectedRoute;
