const initDetailPost = {
  detailPost: []
};

export const postReducer = (state = initDetailPost, action) => {
  if (action.type === 'SET_DETAIL_POST') {
    return {
      ...state,
      detailPost: action.value,
    };
  }

  return state;
};
