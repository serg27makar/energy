import React, {useState} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import useToken from './components/hooks/useToken';
import Home from "./pages/Home";
import {Routes} from "react-router";
import Registration from "./pages/Registration";

function App() {

  const { token, setToken } = useToken();
  const [loginScreen, setLoginScreen ] = useState(true)

  if(!token) {
      if (loginScreen) return <Login setToken={setToken} changeScreen={setLoginScreen}/>
      return <Registration setToken={setToken} changeScreen={setLoginScreen}/>
  }

  return (
      <div className="wrapper">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;