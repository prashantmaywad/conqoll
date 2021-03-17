import { SHORTLIST, DELETESORTLISTED } from "../actions";
var initialData = { data: [] };
var ShortlistReducer = (state = initialData, action) => {
  switch (action.type) {
    case SHORTLIST: {
      return { data: [...state.data, action.data] };
    }
    case DELETESORTLISTED: {
      var cities = [...state.data];
      var cityIndex = cities.findIndex(
        (city) => city.City === action.data.City
      );
      if (cityIndex !== -1) {
        cities.splice(cityIndex, 1);
      }
      return { data: cities };
    }
    default: {
      return { ...state };
    }
  }
};
export default ShortlistReducer;
