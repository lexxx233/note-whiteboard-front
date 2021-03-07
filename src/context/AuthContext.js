/* eslint-disable import/extensions */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [authTokens, setAuthTokens] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const getDataLocalStor = (url) => {
      let token = localStorage.getItem('token');
      if (token === 'undefined' || !token) {
        token = null;
      } else {
        token = JSON.parse(token);
      }
      let user = localStorage.getItem('user');
      if (user === 'undefined' || !token || user === null) {
        user = null;
      } else {
        user = JSON.parse(user);
      }
      if (token) setLoggedIn(true);
      setAuthTokens({
        token: token || '',
        user: user || { url, firstname: 'Guest' },
      });
    };
    const signOut = () => {
      localStorage.setItem('token', '');
      localStorage.setItem('user', null);
      setLoggedIn(false);
      setAuthTokens({ token: null, user: null });
    };
  
    const setTokens = (data) => {
      localStorage.setItem('token', JSON.stringify(data.authorization));
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuthTokens({ token: data.authorization, user: data.user });
    };

    const defaultAxios = async (data) => {
        const { authorization } = data;
    
        axios.defaults.headers.common.authorization = authorization
          ? JSON.parse(`"${authorization}"`)
          : '';
      };
      const signUp = async (data) => {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URI}/signup`,
          {
            ...data,
            url: data.url,
          },
        );
        if (response) {
          setTokens(response.data);
          defaultAxios(response.data);
          setLoggedIn(true);
          return response.data;
        }
      };

    
    useEffect(() => {
      const fetchData = async () => {
        await getDataLocalStor();
      };
      if (!authTokens) fetchData();
    }, []);


      const postLogin = async (data) => {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URI}/login`,
          data,
        );
        if (response) {
          setTokens(response.data);
          defaultAxios(response.data);
          setLoggedIn(true);
          return response.data;
      };
    }
      return (
        <AuthContext.Provider
          value={{
            authTokens,
            isLoggedIn,
            signUp,
            postLogin,
            signOut,
            setAuthTokens: getDataLocalStor,
            setLoggedIn,
          }}
        >
          {props.children}
        </AuthContext.Provider>
      );
}

