import FilterIcon from "@mui/icons-material/Filter";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import "./detailMess.scss";
import img1 from "../../../image/beautiful-girl-7686298_640.webp";
import React, { use, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function DetailMess() {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const accessToken = localStorage.getItem("acessToken");

  useEffect(() => {
    // 1. Establish the connection
    // Use 'wss://' for secure connections in production
    const socket = new WebSocket("ws://localhost:8080?token=" + accessToken);
   

    socket.onopen = () => {
      console.log("WebSocket connection established.");
      setWs(socket);
    };

    // 2. Handle incoming messages BE send data
    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    // 3. Handle errors
    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    // 4. Handle closure
    socket.onclose = () => {
      console.log("WebSocket connection closed.");
      setWs(null);
    };

    // 5. Clean up the connection on component unmount
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures this runs once

  const handleChangeInput = (event) => {
    setMessageInput(event.currentTarget.innerText);
  };

  const sendMessage = () => {
    console.log(messageInput);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ content: messageInput }));
    } else {
      console.log("WebSocket not connected.");
    }
  };
  return (
    <div className="Mess_contain">
      <div className="detailMess">
        <div className="mess_show">
          <div className="mess_user">
            <img src={img1} alt="avatar" />
            <p>Nguyen Van A</p>
          </div>
          <div className="mess_show_list">
            <div className="mess_show_item1">
              <img src={img1} alt="avatar" />
              <div>Hello world asdfjklhfjkasdhfkashfkashjkl</div>
            </div>
            <div className="mess_show_item1">
              <img src={img1} alt="avatar" />
              <div>
                Hello world
                asdfjklhfjkasdhfkashfkashjklákjdhfkajshfskafhsfhjkkasj
              </div>
            </div>
            <div className="mess_show_item2">
              <div>
                Hello world
                asdfjklhfjkasdhfkashfkashjklákjdhfkajshfskafhsfhjkkasj
              </div>
            </div>
          </div>
        </div>
        <div className="mess_input">
          <div className="mess_input_other">
            <button>
              <FilterIcon></FilterIcon>
            </button>
            <button>
              <SentimentSatisfiedAltIcon></SentimentSatisfiedAltIcon>
            </button>
          </div>
          <div
            className="mess_input_text"
            contentEditable="true"
            placeholder="Tin nhan"
            suppressContentEditableWarning
            onInput={handleChangeInput}
          ></div>
          <button className="buttonSend" onClick={sendMessage}>
            <FontAwesomeIcon className="buttonSend" icon={faPaperPlane} />
          </button>
        </div>
      </div>
      <div className="infoUser">
        <img src={img1} alt="avatar" />
        <p>Nguyen Van A</p>
      </div>
    </div>
  );
}

export default DetailMess;
