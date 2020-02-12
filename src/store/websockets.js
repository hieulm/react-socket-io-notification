import openSocket from "socket.io-client";

const initialState = {
  socketId: null,
  socket: null,
  newMessage: null,
  messages: []
};

export const OPENING_WEBSOCKET_CONNECTION = "OPENING_WEBSOCKET_CONNECTION";
export const WEBSOCKET_CONNECTED = "WEBSOCKET_CONNECTED";
export const WEBSOCKET_NEW_MESSAGE_RECEIVED = "WEBSOCKET_NEW_MESSAGE_RECEIVED";
export const WEBSOCKET_NEW_MESSAGE_SEND = "WEBSOCKET_NEW_MESSAGE_SEND";
export const DISCONNECT_WEBSOCKET = "DISCONNECT_WEBSOCKET";

export const connectToWebsocket = () => dispatch => {
  dispatch({ type: OPENING_WEBSOCKET_CONNECTION });
  // const socket = openSocket("https://csb-zn071ll7j4-nfizoxarjo.now.sh/");
  const socket = openSocket("https://zn071ll7j4.sse.codesandbox.io");
  socket.on("connect", () =>
    dispatch({ type: WEBSOCKET_CONNECTED, id: socket.id, socket })
  );
  socket.on("action", message => {
    console.log(message);
    message = typeof message === "string" ? JSON.parse(message) : message;
    message.forward = false;
    dispatch(message);
  });

  socket.on("test", message => console.log(message));

  socket.on("getStoreResponse", store => {
    console.log("getStoreResponse");
    console.log(store);
    dispatch({
      type: "WEBSOCKET_REHYDRATE_STORE",
      store: store
    });
  });
};

export const sendWebsocketMessage = (
  socket,
  message,
  action = "action"
) => dispatch => {
  if (socket) {
    socket.emit(action, message);
  }
};

export const disconnectWebsocket = () => ({
  type: "DISCONNECT_WEBSOCKET"
});

const websockets = (state = initialState, action) => {
  switch (action.type) {
    case WEBSOCKET_NEW_MESSAGE_RECEIVED:
      return { ...state };
    case DISCONNECT_WEBSOCKET:
      console.log("disconnecting.....");
      state.socket.disconnect();
      return { ...state };
    case OPENING_WEBSOCKET_CONNECTION:
      console.log("opening websocket...");
      return { ...state };
    case WEBSOCKET_CONNECTED:
      console.log("Connected...", action.id);
      return { ...state, socketId: action.id, socket: action.socket };
    default:
      return { ...state };
  }
};

export default websockets;
