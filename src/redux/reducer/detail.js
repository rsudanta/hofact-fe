const initAnswer = {
  answer: [],
  vote: [],
};

export const detailReducer = (state = initAnswer, action) => {
  if (action.type === 'SET_ANSWER') {
    return {
      ...state,
      answer: action.value
    };
  }
  if (action.type === 'SET_VOTE') {
    return {
      ...state,
      vote: action.value
    };
  }
  return state;
};
