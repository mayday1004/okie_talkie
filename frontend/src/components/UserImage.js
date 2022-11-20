import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const UserImage = ({ image, username, customeStyle }) => {
  return (
    <Stack>
      <Avatar src={image} sx={{ bgcolor: '#5865f2' }} style={customeStyle}>
        {username.substring(0, 2)}
      </Avatar>
    </Stack>
  );
};

export default UserImage;
