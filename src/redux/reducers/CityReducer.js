import { LOAD_CITIES, DELETE, ADD_CITY } from "../actions";
var initialData = { loaded: false, data: [], error: "" };
var cityReducer = (state = initialData, action) => {
  switch (action.type) {
    case LOAD_CITIES: {
      return { loaded: true, data: action.data, error: "" };
    }
    case DELETE: {
      var cities = [...state.data];
      var cityIndex = cities.findIndex(
        (city) => city.City === action.data.City
      );
      if (cityIndex !== -1) {
        cities.splice(cityIndex, 1);
      }
      return { loaded: true, data: cities, error: "" };
    }
    case ADD_CITY: {
      return { loaded: true, data: [...state.data, action.data], error: "" };
    }
    default: {
      return { ...state };
    }
  }
};
export default cityReducer;
