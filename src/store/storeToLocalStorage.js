export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    const deserializedState = JSON.parse(serializedState);
    console.log("Rehydrating store", deserializedState);
    return deserializedState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    console.log("Storing to local storate", state);
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
