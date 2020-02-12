const initialState = {
  status: true
};
const TOGGLE = "TOGGLE";

export const toggleSwitch = () => ({ type: TOGGLE });

const toggle = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        status: !state.status
      };
    default:
      return state;
  }
};

export default toggle;
