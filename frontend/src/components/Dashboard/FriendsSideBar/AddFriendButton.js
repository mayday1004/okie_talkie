import React, { useState } from 'react';
import CustomPrimaryButton from '../../CustomPrimaryButton';
import AddFriendDialog from './AddFriendDialog';

const additionalStyles = {
  margin: '10px 5px',
  width: '100%',
  height: '30px',
  background: '#3ba55d',
};

const AddFriendButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenAddFriendDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label='Add Friend'
        onClick={handleOpenAddFriendDialog}
        allow={true}
      />
      <AddFriendDialog isDialogOpen={isDialogOpen} closeDialogHandler={handleCloseAddFriendDialog} />
    </>
  );
};

export default AddFriendButton;
