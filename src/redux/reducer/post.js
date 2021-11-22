const initDetailPost = {
  detailPost: [],
  searchPost: [],
};

export const postReducer = (state = initDetailPost, action) => {
  if (action.type === 'SET_DETAIL_POST') {
    return {
      ...state,
      detailPost: action.value
    };
  }
  if (action.type === 'SET_SEARCH_POST') {
    return {
      ...state,
      searchPost: action.value
    };
  }

  return state;
};
