import React from 'react';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Chat from './components/chat/chat';
import Join from './components/start/start';

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" exact element={<Join/>} />
            <Route path="/chat" element={<Chat/>} />
        </Routes>
    </Router>
  )
}

export default App;
