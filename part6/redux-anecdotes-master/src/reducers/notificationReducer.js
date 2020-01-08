const notificationsAtStart = "";

const asObject = notification => {
  return {
    notification
  };
};

const initialState = asObject(notificationsAtStart);

export const setNotification = (notification, time) => {
  console.log("notifying... ", notification);
  return async dispatch => {
    dispatch({
      type: "NEW_NOTIFICATION",
      data: { notification }
    });
    setTimeout(
      () =>
        dispatch({
          type: "CLEAR",
          data: {
            notification: ""
          }
        }),
      time * 1000
    );
  };
};

const notificationReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data;
    case "CLEAR":
      return {
        notification: ""
      };
    default:
      return state;
  }
};

export default notificationReducer;
