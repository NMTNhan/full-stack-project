import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../App'; // Adjust the path if necessary
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const updateAccountInfo = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleOnClick = () => {
    setShowPassword(!showPassword);
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      // Redirect based on user role
      if (data.user.isAdmin) {
        navigate('/admin'); // Redirect to admin dashboard
      } else {
        navigate('/homepage'); // Redirect to homepage for normal users
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className={'flex h-dvh columns-2'}>
        <div className={'relative'}>
          <div className={'w-full h-full absolute text-4xl text-blue-950 font-bold m-4'}>
            SmileBook
          </div>
          <div className={'w-full h-full absolute text-center place-content-center'}>
            <div className={'text-blue-950 font-bold text-6xl text-center'}>
              Welcome Page
            </div>
            <div className={'text-blue-950 font-bold text-center text-2xl mt-10'}>
              Sign in to continue access our services
            </div>
          </div>
          <img className={'w-full h-full'}
            src="https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-144365.jpg?t=st=1724341655~exp=1724345255~hmac=ace77f146c20e45804647f51d5e8a32e16a6a63847c890d4766d41ada9cc190f&w=1380"
            alt={'img'} />
        </div>
        <div className={'w-4/12 content-center bg-white'}>
          <div className={'m-3'}>
            <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Log In</h2>
            <form className={'flex flex-col'}>
              <input placeholder={'Email'}
                className={'bg-gray-100 text-black border-0 rounded-md p-2 mb-4 focus:outline-none transition ease-in duration-150 placeholder-gray-300'}
                name={'email'}
                type='text'
                onChange={updateAccountInfo} />
              <div className={'flex space-x-4'}>
                <input placeholder={'Password'}
                  className={'bg-gray-100 text-black border-0 rounded-md p-2 mb-4 w-11/12 focus:outline-none transition ease-in duration-150 placeholder-gray-300'}
                  name={'password'}
                  type={showPassword ? 'text' : 'password'}
                  onChange={updateAccountInfo} />
                <button type={'button'} className={'place-items-center'} onClick={handleOnClick}>
                  {showPassword ? <FaEye className={'text-black text-2xl'} /> : <FaEyeSlash className={'text-black text-2xl'} />}
                </button>
              </div>
              <p className={'text-red-600 text-[12px]'}>{error}</p>
              <button
                className={'bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200'}
                type="submit"
                onClick={login}>Log In
              </button>
              <div className={'divider'}></div>
              <button
                className={'bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium py-2 rounded-md hover:bg-emerald-600 hover:to-green-600 transition ease-in duration-200'}
                type="button">
                <Link to={'/signup'}>Create New Account</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
