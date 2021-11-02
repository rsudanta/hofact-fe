import {combineReducers} from 'redux';
import {registerReducer, photoReducer} from './auth';
import {globalReducer} from './global';
import {homeReducer} from './home';
import {profileReducer} from './profile';
import {detailReducer} from './detail';

const reducer = combineReducers({
  registerReducer,
  globalReducer,
  photoReducer,
  homeReducer,
  profileReducer,
  detailReducer,
});

export default reducer;
