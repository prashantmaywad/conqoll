import React, { useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";
import { DELETESORTLISTED, DELETE } from "../redux/actions";

function Shortlisted() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Shortlisted.data);
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
          {data &&
            data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.State}</td>
                  <td>{element.District}</td>
                  <td>{element.City}</td>
                  <td>
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
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default Shortlisted;
