// src/components/FloatingChat.js
import React, { useState } from 'react';
import './FloatingChat.css';

function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <main className='chat-cont'>
        <div className="rectangle">Online Chat</div>

        <div className="chat-container">
          <div className={`chat-option whatsapp ${open ? 'show' : ''}`}>
            <a href="https://wa.me/+2349039209644" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
          <div className={`chat-option gmail ${open ? 'show' : ''}`}>
            <a href="mailto:alasatisaheedjamal.com">
              <i className="far fa-envelope"></i>
            </a>
          </div>
          <div className="chat-main" onClick={() => setOpen(!open)}>
            <i className="fas fa-comment-dots"></i>
          </div>
        </div>
    </main>    
  );
}

export default FloatingChat;