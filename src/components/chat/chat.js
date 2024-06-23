import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../nfoBar/nfoBar.js';
import Input from '../Input/Input';
import { useLocation } from 'react-router-dom';
import './chat.css';

const ENDPOINT = 'https://chatappbackend-production-6fc0.up.railway.app';

let socket;

const Chat = (ENDPOINT) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const location = useLocation();

  useEffect(() => {
    
    const { name, room } = queryString.parse(location.search);
    // location.search is inside the react router it gives us the content after the ? from the search bar like
    // ?name=kartik&room=123  which is the api made in the start.js ie the joining page which will open the room

    socket = io.connect(ENDPOINT,auth:");

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
    
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
