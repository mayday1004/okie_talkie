import {
  OPEN_ROOM,
  SET_ROOM_DETAILS,
  SET_ACTIVE_ROOMS,
  SET_LOCAL_STREAM,
  SET_REMOTE_STREAMS,
  SET_AUDIO_ONLY,
  SET_SCREEN_SHARE_STREAM,
  SET_IS_USER_JOINED_WITH_ONLY_AUDIO,
} from '../actionType/roomType';

export const setOpenRoom =
  (isUserRoomCreator = false, isUserInRoom = false) =>
  dispatch => {
    dispatch({ type: OPEN_ROOM, payload: { isUserRoomCreator, isUserInRoom } });
  };

export const setRoomDetails = roomDetails => dispatch => {
  dispatch({ type: SET_ROOM_DETAILS, payload: { roomDetails } });
};

export const setActiveRooms = activeRooms => dispatch => {
  dispatch({ type: SET_ACTIVE_ROOMS, payload: { activeRooms } });
};

export const setLocalStream = localStream => dispatch => {
  dispatch({ type: SET_LOCAL_STREAM, payload: { localStream } });
};

export const setAudioOnly = audioOnly => dispatch => {
  dispatch({ type: SET_AUDIO_ONLY, payload: { audioOnly } });
};

export const setRemoteStreams = remoteStreams => dispatch => {
  dispatch({ type: SET_REMOTE_STREAMS, payload: { remoteStreams } });
};

export const setScreenSharingStream = stream => dispatch => {
  dispatch({
    type: SET_SCREEN_SHARE_STREAM,
    payload: { isScreenSharingActive: stream ? true : false, screenSharingStream: stream || null },
  });
};

export const setIsUserJoinedOnlyWithAudio = onlyWithAudio => dispatch => {
  dispatch({
    type: SET_IS_USER_JOINED_WITH_ONLY_AUDIO,
    payload: { isUserJoinedWithOnlyAudio: onlyWithAudio },
  });
};
