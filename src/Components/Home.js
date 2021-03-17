import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";

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
  const [searchCity, setSearchCity] = useState(data);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(
          "https://gist.githubusercontent.com/pratikg117/7ce66c7ade26a94772111334e40b287b/raw/fd5d7109921ca7a461a19ae73bfb71c9696bd139/Assignment%2520Json"
        )
        .then(({ data }) => {
          setSearchCity(data);
          dispatch({
            type: LOAD_CITIES,
            data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const search = (e) => {
    if (e.target.value == "") {
      setSearchCity(data);
    } else {
      var returnedCandidte = [];
      data.forEach((element) => {
        if (element.City.startsWith(e.target.value)) {
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
  };

  return (
    <div className="home">
      <input
        class="form-control search"
        type="text"
        onChange={search}
        placeholder="Search"
        aria-label="Search"
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
    </div>
  );
}

export default Home;
