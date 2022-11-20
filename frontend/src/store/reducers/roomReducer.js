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

const init = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
};

const reducer = (state = init, action) => {
  if (action.type === OPEN_ROOM) {
    return {
      ...state,
      isUserInRoom: action.payload.isUserInRoom,
      isUserRoomCreator: action.payload.isUserRoomCreator,
    };
  }

  if (action.type === SET_ROOM_DETAILS) {
    return {
      ...state,
      roomDetails: action.payload.roomDetails,
    };
  }

  if (action.type === SET_ACTIVE_ROOMS) {
    return {
      ...state,
      activeRooms: action.payload.activeRooms,
    };
  }

  if (action.type === SET_LOCAL_STREAM) {
    return {
      ...state,
      localStream: action.payload.localStream,
    };
  }

  if (action.type === SET_AUDIO_ONLY) {
    return {
      ...state,
      audioOnly: action.payload.audioOnly,
    };
  }

  if (action.type === SET_REMOTE_STREAMS) {
    return {
      ...state,
      remoteStreams: action.payload.remoteStreams,
    };
  }

  if (action.type === SET_REMOTE_STREAMS) {
    return {
      ...state,
      remoteStreams: action.payload.remoteStreams,
    };
  }

  if (action.type === SET_SCREEN_SHARE_STREAM) {
    return {
      ...state,
      screenSharingStream: action.payload.screenSharingStream,
      isScreenSharingActive: action.payload.isScreenSharingActive,
    };
  }

  if (action.type === SET_IS_USER_JOINED_WITH_ONLY_AUDIO) {
    return {
      ...state,
      isUserJoinedWithOnlyAudio: action.payload.isUserJoinedWithOnlyAudio,
    };
  }

  return state;
};

export default reducer;
