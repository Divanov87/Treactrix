import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { loginService, registerService, logoutService } from '../api/userAPI';

const AuthContext = createContext();

export const AuthProvider = (props) => {

  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const token = Cookies.get('user');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { _id, role, location, email, username } = decodedToken;
        setUser({ _id, token, role, location, email, username });
      } catch (error) {
        console.error('Invalid token', error);
        Cookies.remove('user');
      }
    }
  }, []);


  const login = async (username_email, password) => {
    try {
        const userData = await loginService(username_email, password);
        setUser(userData);
        navigate("/");

    //   if (!response.ok) {
    //     throw new Error('Login failed');
    //   }
    
    }catch(error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username, password, repeatPassword, email, city) => {
    try {
    const userData = await registerService(username, password, repeatPassword, email, city);
    setUser(userData);
    navigate("/");

    //   if (!response.ok) {
    //     throw new Error('Registration failed');
    //   }

    }catch(error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  const logout = async () => {
    Cookies.remove('user');
    setUser({});
    navigate("/auth/login");
    //await logoutService();
  };

  const isLogged = !!Cookies.get('user');

  const isAdmin = () => {
    const token = Cookies.get('user');
    return token ? jwtDecode(token).role === 'admin' : false;
  };

  const isUser = () => {
    const token = Cookies.get('user');
    return token ? jwtDecode(token).role === 'user' : false;
  };

  const contextData = {

    user,
    login,
    register,
    logout,
    isLogged, //: !!user.username_email,
    isAdmin,
    isUser,
    // email: user?.email,
    // userId: user?._id,
    // location: user?.location,
    // username: user?.username,
    // token: user?.token
  }

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;








// import { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode'; // Correct import statement

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(undefined);

//   useEffect(() => {
//     const token = Cookies.get('user');
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const { _id, role, location, email, username } = decodedToken;
//         setUser({ _id, token, role, location, email, username });
//       } catch (error) {
//         console.error('Invalid token', error);
//         Cookies.remove('user');
//       }
//     }
//   }, []);

//   const getExternalIpAddress = async () => {
//     const response = await fetch('https://api.ipify.org/?format=json');
//     const data = await response.json();
//     return data.ip;
//   };

//   const login = async (username_email, password) => {
//     try {
//       const userIp = await getExternalIpAddress();
//       const response = await fetch('http://192.168.1.11:3000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username_email, password, userIp }),
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();
//       const { token } = data;

//       if (token) {
//         const decodedToken = jwtDecode(token);
//         const { _id, role, location, email, username } = decodedToken;
//         setUser({ _id, token, role, location, email, username });
//         Cookies.set('user', token, { expires: 400 });
//       } else {
//         throw new Error('Invalid token received');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   const register = async (username, password, repeatPassword, email, city) => {
//     try {
//       const userIp = await getExternalIpAddress();
//       const response = await fetch('http://192.168.1.11:3000/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, repeatPassword, email, city, userIp }),
//       });

//       if (!response.ok) {
//         throw new Error('Registration failed');
//       }

//       const data = await response.json();
//       const { token } = data;

//       if (token) {
//         const decodedToken = jwtDecode(token);
//         const { _id, role, location, email, username } = decodedToken;
//         setUser({ _id, token, role, location, email, username });
//         Cookies.set('user', token, { expires: 3655 });
//       } else {
//         throw new Error('Invalid token received');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       // Handle registration error, e.g., show error message
//     }
//   };

//   const logout = () => {
//     Cookies.remove('user');
//     setUser(undefined);
//   };

//   const isLogged = !!Cookies.get('user');

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, isLogged }}>
//       {children}
//     </AuthContext.Provider>
    
//   );
// };

// export const useAuth = () => useContext(AuthContext);