import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '../../UserImage';
import * as roomHandler from '../../../socketio/roomHandler';

const ActiveRoomButton = ({ creatorUsername, roomId, participants, isUserInRoom }) => {
  const amountOfParticipants = participants.length;

  const handleJoinActiveRoom = () => {
    if (amountOfParticipants && !isUserInRoom) {
      roomHandler.joinRoom(roomId);
    }
  };
  const roomTitle = `Cretor: ${creatorUsername.name}. Connected: ${amountOfParticipants}`;

  return (
    <Tooltip title={roomTitle}>
      <div>
        <Button
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: '10px',
            color: 'white',
            backgroundColor: '#5865F2',
          }}
          disabled={isUserInRoom}
          onClick={handleJoinActiveRoom}
        >
          <Avatar username={creatorUsername.name} image={creatorUsername.image} />
        </Button>
      </div>
    </Tooltip>
  );
};

export default ActiveRoomButton;
