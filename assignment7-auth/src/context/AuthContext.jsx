import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Helper to simulate JWT Token generation
export const generateSimulatedJwt = (username) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    sub: username,
    username: username,
    role: 'StudentAdmin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
    iss: 'React-Assignment7-AuthEngine'
  };

  const toBase64 = (obj) => btoa(JSON.stringify(obj));
  const encodedHeader = toBase64(header);
  const encodedPayload = toBase64(payload);
  const simulatedSignature = btoa(`SIG_HMAC256_${username}_98a7sd8f7a6sd`);

  const fullToken = `${encodedHeader}.${encodedPayload}.${simulatedSignature}`;

  return {
    token: fullToken,
    header,
    payload,
    signature: simulatedSignature
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load persisted user on app startup
  useEffect(() => {
    try {
      const localToken = localStorage.getItem('tm_jwt_token');
      const localUser = localStorage.getItem('tm_user');
      const sessionToken = sessionStorage.getItem('tm_jwt_token');
      const sessionUser = sessionStorage.getItem('tm_user');

      if (localToken && localUser) {
        setToken(localToken);
        setUser(JSON.parse(localUser));
        setRememberMe(true);
        // decode simulated details
        const parts = localToken.split('.');
        if (parts.length === 3) {
          setTokenDetails({
            token: localToken,
            header: JSON.parse(atob(parts[0])),
            payload: JSON.parse(atob(parts[1])),
            signature: parts[2]
          });
        }
      } else if (sessionToken && sessionUser) {
        setToken(sessionToken);
        setUser(JSON.parse(sessionUser));
        setRememberMe(false);
        const parts = sessionToken.split('.');
        if (parts.length === 3) {
          setTokenDetails({
            token: sessionToken,
            header: JSON.parse(atob(parts[0])),
            payload: JSON.parse(atob(parts[1])),
            signature: parts[2]
          });
        }
      }
    } catch (e) {
      console.error('Failed to parse stored auth token', e);
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const login = (username, password, remember = false) => {
    const jwtObj = generateSimulatedJwt(username);
    const userData = { username, lastLogin: new Date().toISOString() };

    setUser(userData);
    setToken(jwtObj.token);
    setTokenDetails(jwtObj);
    setRememberMe(remember);

    if (remember) {
      localStorage.setItem('tm_jwt_token', jwtObj.token);
      localStorage.setItem('tm_user', JSON.stringify(userData));
      sessionStorage.removeItem('tm_jwt_token');
      sessionStorage.removeItem('tm_user');
    } else {
      sessionStorage.setItem('tm_jwt_token', jwtObj.token);
      sessionStorage.setItem('tm_user', JSON.stringify(userData));
      localStorage.removeItem('tm_jwt_token');
      localStorage.removeItem('tm_user');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setTokenDetails(null);
    localStorage.removeItem('tm_jwt_token');
    localStorage.removeItem('tm_user');
    sessionStorage.removeItem('tm_jwt_token');
    sessionStorage.removeItem('tm_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        tokenDetails,
        isAuthenticated: !!user && !!token,
        rememberMe,
        login,
        logout,
        isInitializing
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
