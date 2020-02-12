import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import websockets from "./websockets";
import notifications from "./notifications";
import toggle from "./toggle";
import { websocketDispatch } from "./middleware";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./storeToLocalStorage";

const persistedState = loadState();

const appReducer = combineReducers({
  websockets,
  notifications,
  toggle
});

const rootReducer = (state, action) => {
  if (action.type === "WEBSOCKET_REHYDRATE_STORE") {
    console.log("WEBSOCKET_REHYDRATE_STORE....");
    console.log(action);
    Object.keys(action.store).map(key => (state[key] = action.store[key]));
    // state = action.store || state;
  }
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  // persistedState,
  applyMiddleware(websocketDispatch, thunk)
);

// store.subscribe(
// throttle(() => {
//   saveState({ toggle: store.getState().toggle });
// }, 1000)
// );

export default store;
export * from "./websockets";
export * from "./notifications";
export * from "./toggle";
