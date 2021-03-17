import { combineReducers } from "redux";
import CityReducer from "./CityReducer";
import ShortlistedReducer from "./ShortlistedReducer";
export default combineReducers({
  All: CityReducer,
  Shortlisted: ShortlistedReducer,
});
