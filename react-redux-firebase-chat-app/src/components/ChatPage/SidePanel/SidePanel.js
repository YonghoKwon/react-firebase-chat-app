import React from 'react'
import UserPanel from './UserPanel';
import Favorited from './Favorited';
import ChatRooms from './ChatRooms';
import DirectMessages from './DirectMessages';

function SidePanel() {
    return (
        <div
            style={{
                backgroundColor: "#f8df00",
                padding: '2rem',
                minHeight: '100vh',
                color: 'black',
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
