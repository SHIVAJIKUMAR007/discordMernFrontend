import React, { useEffect, useState } from "react";
import "../style/sidebar.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import AddIcon from "@material-ui/icons/Add";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoIcon from "@material-ui/icons/Info";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { auth } from "../firebase";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUserSaved, logout } from "../action";
import axios from "../axios";

function Sidebar() {
  const User = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [Rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      // get all rooms
      const getRooms = await axios.get("/api/allChannels");
      const allRooms = await getRooms.data;
      setRooms(allRooms);
    };
    fetchRooms();

    dispatch(isUserSaved()); // GET USER DATA
  }, [dispatch]);

  const signOut = () => {
    auth.signOut();
    dispatch(logout());
  };

  const addNewChannel = async () => {
    const newRoomName = prompt("enter the name of the room");
    console.log(newRoomName);
    const getRooms = await axios.post("/api/createRoom/" + User.uid, {
      name: newRoomName,
    });
    const allRooms = await getRooms.data;
    setRooms(allRooms);
  };
  return (
    <div className="sidebar">
      <div className="sidebarTop">
        <h2> DISCORD</h2> <KeyboardArrowDownIcon />
      </div>

      <div className="sidebarChannel">
        <div className="sidebarChannelHeader">
          <div className="channelHeader">
            <KeyboardArrowDownIcon />
            <h3>Text Chennels</h3>
          </div>

          <AddIcon
            className="addIcon"
            onClick={addNewChannel}
            titleAccess="add new channel"
          />
        </div>

        <div className="channelList">
          {Rooms?.map((room, i) => (
            <SidebarChannel key={i} id={room._id} name={room.name} />
          ))}
        </div>
      </div>

      <div className="sidebarVoice">
        <SignalCellularAltIcon className="voiceIcon" />
        <div className="voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="rightIcons">
          <InfoIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebarProfile">
        <Avatar
          onClick={signOut}
          src={User?.photo}
          className="avatar"
          fontSize="larger"
        />
        <div className="profileInfo">
          <h3>@{User?.name}</h3>
          <p>#{User?.uid}</p>
        </div>

        <div className="profileIcon">
          <MicNoneIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

const SidebarChannel = ({ id, name }) => {
  return (
    <>
      <NavLink to={`/${id}`} style={{ color: "grey", textDecoration: "none" }}>
        <div className="channel">
          <h3>
            <span className="hash">#</span>
            {name}
          </h3>
        </div>
      </NavLink>
    </>
  );
};
export default Sidebar;
