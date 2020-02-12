import { sendWebsocketMessage } from "./index";

const websocketDispatch = store => next => action => {
  const {
    websockets: { socket }
  } = store.getState();

  if (
    typeof action !== "function" &&
    !/socket/gi.test(action.type) &&
    action.forward !== false
  ) {
    console.log("Sending action to websocket", action);
    store.dispatch(sendWebsocketMessage(socket, action));
  }

  if (action.type === "WEBSOCKET_SYNC_STORE") {
    console.log("WEBSOCKET_SYNC_STORE");
    const { toggle } = store.getState();
    store.dispatch(
      sendWebsocketMessage(socket, { toggle: toggle }, "syncStore")
    );
  }

  return next(action);
  // return Promise.resolve(action).then(store.dispatch);
};

export { websocketDispatch };
