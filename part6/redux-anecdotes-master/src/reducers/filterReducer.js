const filtersAtStart = "";

const asObject = filter => {
  return {
    filter
  };
};

const initialState = asObject(filtersAtStart);

export const filterAnecdotes = filter => {
  console.log("filtering... ", filter);
  return {
    type: "NEW_FILTER",
    data: {
      filter
    }
  };
};

export const clearFilter = filter => {
  console.log("clearing... ", filter);
  return {
    type: "CLEAR",
    data: {
      filter: ""
    }
  };
};

const filterReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_FILTER":
      return action.data.filter;
    case "CLEAR":
      return {
        filter: ""
      };
    default:
      return state;
  }
};

export default filterReducer;
