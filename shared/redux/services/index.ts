import { combineReducers } from "redux";
import getD from "../reducer";
import { authApi } from '../services/auth';

const rootReducer = combineReducers({
  getData: getD,
  [authApi.reducerPath]: authApi.reducer,
});



export default rootReducer;
