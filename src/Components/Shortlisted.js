import React from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";
import { DELETESORTLISTED } from "../redux/actions";

function Shortlisted() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Shortlisted.data);
  const deleteCity = (e) => {
    dispatch({
      type: DELETESORTLISTED,
      data: e,
    });
  };
  return (
    <div className="home">
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
                      Remove Shortlist
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
