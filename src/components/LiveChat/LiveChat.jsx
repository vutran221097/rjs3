import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import "./LiveChat.css";

import messengerIcon from "../../assets/messenger.png";

const LiveChat = () => {
  const [show, setShow] = useState(false);

  // show/hide modal
  const toggle = () => {
    setShow((prevState) => !prevState);
  };
  return (
    <div>
      <div className="live-chat" onClick={toggle}>
        <img src={messengerIcon} alt="livechat" />
      </div>

      {show && (
        <div className="live-chat-box">
          <div className="live-chat-box-header">
            <h3>Customer Support</h3>
            <p>Let's Chat App</p>
          </div>
          <div className="horizon-line"></div>
          <div className="live-chat-box-body">
            <div className="user-chat">
              <p>Xin Chào</p>
              <p>Làm thế nào để xem các sản phẩm</p>
            </div>

            <p>
              <FontAwesomeIcon icon={faUser} />
              &nbsp; ADMIN: Chào bạn
            </p>
            <p>
              <FontAwesomeIcon icon={faUser} />
              &nbsp; ADMIN: Bạn có thể vào mục shop để xem các sản phẩm
            </p>
          </div>
          <div className="horizon-line"></div>
          <div className="live-chat-box-footer">
            <div className="live-chat-box-input"> 
              <FontAwesomeIcon icon={faUser} />
              &nbsp; &nbsp;
              <input type="text" placeholder="Enter Message!" />
            </div>
            <div className="live-chat-actions">
              <FontAwesomeIcon icon={faPaperclip} className="live-chat-icon"/>
              <FontAwesomeIcon icon={faFaceSmile} className="live-chat-icon"/>
              <FontAwesomeIcon icon={faPaperPlane} className="send-action live-chat-icon"/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
