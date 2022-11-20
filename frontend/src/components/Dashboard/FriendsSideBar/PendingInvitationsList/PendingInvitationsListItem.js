import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip, Typography, Box } from '@mui/material';
import Avatar from '../../../UserImage';
import InvitationDecisionButtons from './InvitationDecisionButtons';
import { setupFriendInvitation } from '../../../../store/actions/friendsAction';

const PendingInvitationsListItem = ({ id, image, username, email }) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleAcceptInvitation = () => {
    dispatch(setupFriendInvitation('acceptInvite', { id }));
    setButtonsDisabled(true);
  };

  const handleRejectInvitation = () => {
    dispatch(setupFriendInvitation('rejectInvite', { id }));
    setButtonsDisabled(true);
  };

  return (
    <Tooltip title={email} placement='right'>
      <div style={{ width: '100%' }}>
        <Box
          sx={{
            height: '42px',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 0 0 8px',
          }}
        >
          <Avatar image={image} username={username} />
          <Typography
            sx={{
              marginLeft: '8px',
              fontWeight: 700,
              color: '#8e9297',
              flexGrow: 1,
            }}
            variant='subtitle1'
          >
            {username}
          </Typography>
          <InvitationDecisionButtons
            disabled={buttonsDisabled}
            acceptInvitationHandler={handleAcceptInvitation}
            rejectInvitationHandler={handleRejectInvitation}
          />
        </Box>
      </div>
    </Tooltip>
  );
};

export default PendingInvitationsListItem;
