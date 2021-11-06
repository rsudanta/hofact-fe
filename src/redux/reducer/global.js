const initGlobalState = {
  isError: false,
  message: 'Error',
  isLoading: false,
  refreshing: false,
  loadPost: false
};

export const globalReducer = (state = initGlobalState, action) => {
  if (action.type === 'SET_ERROR') {
    return {
      ...state,
      isError: action.value.isError,
      message: action.value.message,
    };
  }

  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      isLoading: action.value,
    };
  }

  if (action.type === 'SET_REFRESHING') {
    return {
      ...state,
      refreshing: action.value,
    };
  }

  if (action.type === 'SET_LOAD_POST') {
    return {
      ...state,
      loadPost: action.value,
    };
  }
  return state;
};
