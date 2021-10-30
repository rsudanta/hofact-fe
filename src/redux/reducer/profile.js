const initProfile = {
  profile: [],
};

export const profileReducer = (state = initProfile, action) => {
  if (action.type === 'SET_PROFILE') {
    return {
      ...state,
      profile: action.value,
    };
  }
  return state;
};
