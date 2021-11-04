const initProfile = {
  profile: [],
  postUser: [],
  answerUser: [],
  leaderboard: [],
};

export const profileReducer = (state = initProfile, action) => {
  if (action.type === 'SET_PROFILE') {
    return {
      ...state,
      profile: action.value
    };
  }
  if (action.type === 'SET_POST_USER') {
    return {
      ...state,
      postUser: action.value,
    };
  }
  if (action.type === 'SET_ANSWER_USER') {
    return {
      ...state,
      answerUser: action.value
    };
  }
  if (action.type === 'SET_LEADERBOARD') {
    return {
      ...state,
      leaderboard: action.value
    };
  }
  return state;
};
