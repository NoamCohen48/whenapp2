import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';
import './App.css';
import ChatContextProvider from './Contexts/ChatContextProvider.js';
import { RenderContextProvider } from './Contexts/RenderContextProvider';
import { UserContextProvider } from './Contexts/UserContextProvider';
import ChatScreen from './Pages/ChatScreen/base/ChatScreen';
import LoginForm from './Pages/Login/LoginForm.js';
import RegisterForm from './Pages/Register/RegisterForm';

function App(props) {
  return (
    <UserContextProvider >
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LoginForm />} />

          <Route path="/register" element={<RegisterForm />} />

          <Route path="/Chat" element={
            <ChatContextProvider>
              <RenderContextProvider>
                <ChatScreen />
              </RenderContextProvider>
            </ChatContextProvider>
          } />

        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
