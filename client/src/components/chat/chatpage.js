import React, { useEffect, useState } from 'react';
import {
  ChatEngine,
  ChatEngineContext,
  getOrCreateChat,
} from 'react-chat-engine';
import { getCurrentUser } from '../../utils/profileactions';
import jwtDecode from 'jwt-decode';
require('dotenv').config();
var user = '';
var usersecret = '';
if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  console.log(decoded);
  user = decoded.user.username;
  usersecret = decoded.user.password;
}

const ChatPage = () => {
  return (
    <ChatEngine
      height='90vh'
      userName={user}
      userSecret={usersecret}
      projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
      renderNewChatForm={(creds) => {}}
    />
  );
};

export default ChatPage;
