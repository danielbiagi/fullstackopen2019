import anecdoteService from "../services/anecdotes";

export const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export const mostPopularAnecdotes = (a, b) => {
  if (a.votes > b.votes) {
    return -1;
  }
  if (b.votes > a.votes) {
    return 1;
  }
  return 0;
};

export const voteFor = id => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addVote(id);
    dispatch({
      type: "VOTE",
      data: newAnecdote
    });
  };
};

export default anecdoteReducer;
