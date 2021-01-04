import React, { useEffect, useState } from "react";
import "../style/chat.css";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SearchIcon from "@material-ui/icons/Search";
import HelpIcon from "@material-ui/icons/Help";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import { Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { isUserSaved } from "../action";
import { getMassage, sendMassageToRoom } from "../action/massage";

function Chat() {
  const { roomId } = useParams();
  const massages = useSelector((state) => state.massages);
  const dispatch = useDispatch();
  const [room, setroom] = useState("");

  useEffect(() => {
    const fetchMassage = async () => {
      // get massages
      const massage = await axios.get("/api/chat/" + roomId);
      const massages = await massage.data;
      dispatch(getMassage(massages));
      // get roomName
      const getRoomName = await axios.get("/api/getRoomName/" + roomId);
      const roomName = await getRoomName.data[0].name;
      setroom(roomName);
    };

    fetchMassage();
  }, [roomId]);

  return (
    <div className="chat">
      <ChatHeader key="1" name={room} />

      <div className="mainChatBody">
        {massages?.map((massage, index) => (
          <Massage
            key={index}
            name={massage.name}
            picUrl={massage.pic}
            massage={massage.massage}
            time={massage.time}
          />
        ))}
      </div>

      <ChatSendMassage />
    </div>
  );
}

const Massage = ({ name, picUrl, massage, time }) => {
  return (
    <>
      <div className="chatMassage">
        <Avatar className="massageAvatar" src={picUrl} />
        <div className="massageChat">
          <p style={{ fontSize: "small", margin: "0", color: "white" }}>
            {name}
          </p>
          <p style={{ color: "white" }}>{massage} </p>
        </div>
        <p style={{ fontSize: "x-small", color: "white" }}>{time}</p>
      </div>
    </>
  );
};

const ChatSendMassage = () => {
  const { roomId } = useParams();
  const [massageToSend, setmassageToSend] = useState("");
  const User = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const sendMassage = async (e) => {
    e.preventDefault(); // not refresh
    dispatch(isUserSaved()); // get user data
    // dispatch massage data
    const massageData = await axios.post("/api/chat/" + roomId, {
      name: User.name,
      massage: massageToSend,
      pic: User.photo,
    });
    const massageIs = await massageData.data;
    console.log(massageIs);
    dispatch(sendMassageToRoom(massageIs));

    setmassageToSend("");
  };
  return (
    <>
      <div className="sendingTools">
        <MicIcon className="sendingToolsIcon" />

        <div className="chatSendMassage">
          <form method="post" onSubmit={sendMassage}>
            <input
              type="text"
              name="search"
              onChange={(e) => setmassageToSend(e.target.value)}
              value={massageToSend}
            />
            <button type="submit" style={{ display: "none" }}></button>
          </form>
        </div>

        <AttachFileIcon className="sendingToolsIcon" />
        <SendIcon className="sendingToolsIcon" />
      </div>
    </>
  );
};

const ChatHeader = ({ name }) => {
  return (
    <>
      <div className="chatHeader">
        <h1 className="headerName">
          <span>#</span>
          {name}
        </h1>

        <div className="iconsDiv">
          <NotificationsIcon className="originalIcon" />
          <EditLocationIcon className="originalIcon" />
          <PeopleAltIcon className="originalIcon" />

          <div className="chatHeaderSearch">
            <input
              type="text"
              name="search"
              onChange={(e) => console.log(e.target.value)}
              readOnly
            />
            <SearchIcon />
          </div>

          <SendIcon className="originalIcon" />
          <HelpIcon className="originalIcon" />
        </div>
      </div>
    </>
  );
};

export default Chat;
