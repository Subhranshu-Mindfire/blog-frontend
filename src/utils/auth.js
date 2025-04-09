import axios from 'axios';

export const logoutUser = async ({ setCurrentUser, navigate }) => {

  try {
    console.log(axios.defaults.headers)
    await axios.delete(`${import.meta.env.VITE_API_URL}/logout`);
  } catch (error) {
    console.error(error);
  }
  console.log("Hii near clear")
  localStorage.clear();

  setCurrentUser({
    username: null,
    user_id: null,
    token: null,
    is_authenticated: false,
  });

  navigate('/login');
};
