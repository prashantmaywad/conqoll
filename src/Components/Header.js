import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { ADD_CITY } from "../redux/actions";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Button,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Form,
  Modal,
  Input,
  Alert,
  Label,
  FormGroup,
} from "reactstrap";

function Header() {
  const dispatch = useDispatch();
  const [StateValue, setStateValue] = useState("");
  const [DistrictValue, setDistrictValue] = useState("");
  const [CityValue, setCityValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const data = useSelector((state) => state.All.data);
  var distinctState = [...new Set(data.map((x) => x.State))];
  var distinctDistrict = [...new Set(data.map((x) => x.District))];
  const [district, setDisctrict] = useState(distinctDistrict);
  const [error, setError] = useState("");

  const toggle = () => setIsOpen(!isOpen);
  const [modal, setModal] = useState(false);
  const change = () => setModal(!modal);
  const addCity = (e) => {
    e.preventDefault();
    if (StateValue == "" || DistrictValue == "" || CityValue == "") {
      setError("Please select all fields");
    } else {
      dispatch({
        type: ADD_CITY,
        data: { State: StateValue, District: DistrictValue, City: CityValue },
      });
      change();
      setError("");
    }
  };
  const loadDistrictFromState = (e) => {
    setStateValue(e.target.value);
    if (e.target.value) {
      distinctDistrict = [
        ...new Set(data.map((x) => x.State === e.target.value && x.District)),
      ];
      setDisctrict(distinctDistrict);
      console.log(distinctDistrict);
    }
  };
  return (
    <div className="header">
      <Modal isOpen={modal} toggle={change}>
        <ModalHeader toggle={change}>Add City</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>State</Label>
              <Input
                type="select"
                onChange={loadDistrictFromState}
                name="selectMulti"
                required
              >
                <option></option>
                {distinctState &&
                  distinctState.length > 0 &&
                  distinctState.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>District</Label>
              <Input
                type="select"
                onChange={(e) => setDistrictValue(e.target.value)}
                name="selectMulti"
                required
              >
                {district &&
                  district.length > 0 &&
                  district.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Name">City Name</Label>
              <Input
                required
                type="text"
                onChange={(e) => setCityValue(e.target.value)}
                name="name"
                id="name"
                placeholder="Add City"
              />
            </FormGroup>
            {error && <Alert color="danger">Please fill all the fields</Alert>}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addCity}>
            Create
          </Button>
          <Button color="secondary" onClick={change}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Navbar color="light" light expand="md" sticky="true">
        <Link to="/">
          <NavbarBrand className="logo">Conqoll</NavbarBrand>
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <Link to="/">
              <NavItem>
                <NavLink>All</NavLink>
              </NavItem>
            </Link>
            <Link to="shortlisted">
              <NavItem>
                <NavLink href="/Shortlisted">Shortlisted</NavLink>
              </NavItem>
            </Link>
          </Nav>
        </Collapse>
        <Button onClick={change} className="header___btn" color="success">
          Add City
        </Button>
      </Navbar>
    </div>
  );
}
export default Header;
