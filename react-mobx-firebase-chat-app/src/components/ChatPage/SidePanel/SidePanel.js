import React from 'react'
import DirectMessages from "./DirectMessages";
import Favorited from "./Favorited";
import ChatRooms from "./ChatRooms";
import UserPanel from "./UserPanel";

function SidePanel() {
  return (
    <div
      style={{
        backgroundColor: "#7B83EB",
        padding: '2rem',
        minHeight: '100vh',
        color: 'white',
        minWidth: '275px'
      }}
    >
      <UserPanel />

      <Favorited />

      <ChatRooms />

      <DirectMessages />
    </div>
  )
}

export default SidePanel