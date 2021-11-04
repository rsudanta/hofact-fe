const initHome = {
  post: []
};

export const homeReducer = (state = initHome, action) => {
  if (action.type === 'SET_POST') {
    return {
      ...state,
      post: action.value
    };
  }
  return state;
};
