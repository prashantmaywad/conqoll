import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";

import { Table, Button } from "reactstrap";
import Loader from "react-loader";
import { useDispatch, useSelector } from "react-redux";
import {
  SHORTLIST,
  DELETE,
  LOAD_CITIES,
  DELETESORTLISTED,
} from "../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.All.data);
  const loaded = useSelector((state) => state.All.loaded);
  const [searchCity, setSearchCity] = useState(data.slice(0, 49));
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    var size = data.length;
    setSearchCity(
      data.slice(
        value === 1 ? 0 : value * 50 - 50,
        value * 50 <= size ? value * 50 : size
      )
    );
  };
  useEffect(() => {
    if (!loaded) {
      axios
        .get(
          "https://gist.githubusercontent.com/pratikg117/7ce66c7ade26a94772111334e40b287b/raw/fd5d7109921ca7a461a19ae73bfb71c9696bd139/Assignment%2520Json"
        )
        .then(({ data }) => {
          setSearchCity(data.slice(0, 49));
          dispatch({
            type: LOAD_CITIES,
            data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, loaded]);
  const search = (e) => {
    if (e.target.value === "") {
      setSearchCity(data.slice(0, 49));
    } else {
      var returnedCandidte = [];
      data.forEach((element) => {
        if (
          element.City.toUpperCase().startsWith(e.target.value.toUpperCase())
        ) {
          returnedCandidte.push(element);
        } else if (
          element.State.toUpperCase().startsWith(e.target.value.toUpperCase())
        ) {
          returnedCandidte.push(element);
        } else if (
          element.District.toUpperCase().startsWith(
            e.target.value.toUpperCase()
          )
        ) {
          returnedCandidte.push(element);
        }
      });
      setSearchCity(returnedCandidte);
    }
  };
  const shortlist = (e) => {
    dispatch({
      type: SHORTLIST,
      data: e,
    });
  };
  const deleteCity = (e) => {
    dispatch({
      type: DELETE,
      data: e,
    });
    dispatch({
      type: DELETESORTLISTED,
      data: e,
    });
    var tempCity = [...searchCity];
    var cityIndex = tempCity.findIndex((city) => city.City === e.City);
    if (cityIndex !== -1) {
      tempCity.splice(cityIndex, 1);
    }
    setSearchCity(tempCity);
  };

  return (
    <div className="homeContainer">
      <div className="home">
        <input
          class="form-control search"
          type="text"
          onChange={search}
          placeholder="Search for State, District or City"
          aria-label="Search"
        />
        <Pagination
          className="pagination"
          color="primary"
          count={data / 50}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleChange}
        />
        <Table>
          <thead>
            <tr>
              <th>State</th>
              <th>District</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loaded ? (
              searchCity &&
              searchCity.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element.State}</td>
                    <td>{element.District}</td>
                    <td>{element.City}</td>
                    <td>
                      <Button
                        color="success"
                        className="success"
                        onClick={(e) => {
                          e.target.disabled = true;
                          shortlist(element);
                        }}
                      >
                        Shortlist
                      </Button>
                      <Button
                        color="danger"
                        onClick={(e) => {
                          deleteCity(element);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <Loader loaded={false} />
            )}
          </tbody>
        </Table>
        <div className="pagination">
          <Pagination
            className="pagination"
            color="primary"
            count={data / 50}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
