import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { ADD_CITY } from "../redux/actions";
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

  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);
  const change = () => setModal(!modal);
  const addCity = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_CITY,
      data: { State: StateValue, District: DistrictValue, City: CityValue },
    });
    change();
  };
  const loadDistrictFromState = (e) => {
    setStateValue(e.target.value);
    if (e.target.value) {
      distinctDistrict = [
        ...new Set(data.map((x) => x.State == e.target.value && x.District)),
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
                onChange={(e) => setCityValue(e.target.value)}
                name="selectMulti"
              >
                <option></option>
                {district &&
                  district.length > 0 &&
                  district.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Name">State</Label>
              <Input type="text" name="name" id="name" placeholder="Add City" />
            </FormGroup>
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
        <NavbarBrand href="/">Conqoll</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/All">All</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Shortlisted">Shortlisted</NavLink>
            </NavItem>
            <Button
              onClick={change}
              className="header__createMovie_btn"
              color="primary"
            >
              Add City
            </Button>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default Header;
