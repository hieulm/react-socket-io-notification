const initialState = {
  notifications: [],
  newNotification: {}
};

export const sendNotification = notification => ({
  type: "SEND_NOTIFICATION",
  notification
});

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_NOTIFICATION":
      return {
        ...state,
        newNotification: action.notification,
        notifications: [...state.notifications, action.notification]
      };
    default:
      return state;
  }
};

export default notifications;
