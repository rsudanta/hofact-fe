const initAnswer = {
  answer: [],
};

export const detailReducer = (state = initAnswer, action) => {
  if (action.type === 'SET_ANSWER') {
    return {
      ...state,
      answer: action.value,
    };
  }
  return state;
};
