import { combineReducers } from "redux";

function loginReducer(state = null, action) {
  switch (action.type) {
    case "LOGIN":
      return action.username
    default:
      return state;
  }
}

const initialApiState = {
  loading: false,
  description: null,
  error: null
};

function apiReducer(state = initialApiState, action) {
  switch (action.type) {
    case "API_REQUEST_START":
      return { loading: true, description: action.description, error: null };
    case "API_REQUEST_SUCCESS":
      return { ...state, loading: false, error: null };
    case "API_REQUEST_FAILURE":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

function votesReducer(state = [], action) {
  switch (action.type) {
    case "SET_VOTES":
      return action.votes;
    case "ADD_VOTE":
      return [...state, action.newVote];
    case "UPDATE_VOTE":
        const updatedVote = action.vote;
        return state.map(vote => {
            if (vote.id === updatedVote.id) {
                return updatedVote;
            }
            return vote;
        });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    login: loginReducer,
    votes: votesReducer,
    api: apiReducer
});

export default rootReducer;