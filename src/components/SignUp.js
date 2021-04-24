import React from 'react';
//import Form from 'react-bootstrap/Form';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {register} from '../services/auth';
// import {useState, useEffect} from 'react';
import {useFormFields} from '../lib/customHooks';
//import {Redirect} from 'react-router';
import "./SignUp.css";


export default function SignUp () {
  
  
  const [business, setBusinessState] = useFormFields({
    first_name: '',
    last_name: '',
    business_name: '',
    user_name: '',
    password: '',
    email: '',
    street_address: '',
    city: '',
    state: '',
    zip: '',
    logo: '',
    business_type: '',
    acct_type: ''
  });
  
  const handleRegister = (event) => {
    event.preventDefault();  
    register(business);
    // window.location.href = ''
    // return <Redirect to="/"/>
  }
  

  return (
    
    <form>
        <h3>Register Business</h3>
        <div className="form-group">
    <div 
      className="custom-control custom-radio custom-control-inline">
      <input 
        type="radio" 
        id="acct-type-business" 
        name="acct_type" 
        className="custom-control-input"
        value="Business"
        onClick={setBusinessState}/>
      <label 
        className="custom-control-label" 
        htmlFor="acct-type-business"
      >Business</label>
    </div>
    <div 
      className="custom-control custom-radio custom-control-inline">
      <input 
        type="radio" 
        id="acct-type-customer" 
        name="acct_type" 
        className="custom-control-input"
        value="Customer"
        onClick={setBusinessState}/>
      <label 
        className="custom-control-label" 
        htmlFor="acct-type-customer"
      >Customer</label>
    </div>  
  </div>

        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="first_name">First name</label>
            <input 
              type="text" 
              placeholder="Foo" 
              name="first_name"
              value={business.first_name}
              onChange={setBusinessState}
            />
        </div>
  
        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="last_name">Last name</label>
            <input 
              type="text" 
              placeholder="Bar" 
              name="last_name"
              value={business.last_name}
              onChange={setBusinessState}
            />
        </div>
        
        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="business_type">Business Type</label>
            <select className='dropdown'
              className="browser-default custom-select"
              name="business_type"
              onChange={setBusinessState}
            >
              <option>Categories</option>
              <option value="Technology">Technology</option>
              <option value="Crafts">Crafts</option>
              <option value="Beauty">Beauty</option>
              <option value="Educational">Educational</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Hardware">Hardware</option>
              <option value="Local Market">Local Market</option>
              <option value="Decor">Decor</option>
              <option value="Educational">Other</option>
            </select>
        </div>
  
        {/* <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            BusinessType
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Wholesale</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Supermarket</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Hardware</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
  
        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="business_name"
            >Business Name</label>
            <input 
              type="text" 
              placeholder="FooBarElectronics" 
              name="business_name"
              value={business.business_name}
              onChange={setBusinessState}/>
        </div>

        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="user_name">User Name</label>
            <input 
              type="text" 
              placeholder="User Name" 
              name="user_name"
              value={business.user_name}
              onChange={setBusinessState}
            />
        </div>
  
        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="street_address">Address</label>
            <input 
              type="text" 
              placeholder="Address" 
              name="street_address"
              value={business.street_address}
              onChange={setBusinessState}/>
        </div>
  
        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="city">City</label>
            <input 
              type="text" 
              placeholder="City" 
              name="city"
              value={business.city}
              onChange={setBusinessState}
            />
        </div>
  
        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="state">State</label>
            <input 
              type="text" 
              placeholder="State" 
              name="state"
              value={business.state}
              onChange={setBusinessState}
            />
        </div>
  
        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="zip">Zip Code</label>
            <input 
              type="text" 
              placeholder="00000" 
              name="zip"
              value={business.zip}
              onChange={setBusinessState}
            />
        </div>
  
        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="email">Email</label>
            <input 
              type="email" 
              placeholder="Enter email" 
              name="email"
              value={business.email}
              onChange={setBusinessState}
            />
        </div>
  
        <div className="form-group">
            <label 
              className='labels' 
              htmlFor="password">Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              name="password"
              value={business.password}
              onChange={setBusinessState}
            />
        </div>
  
        <button 
          type="submit" 
          className="btn btn-dark btn-lg btn-block" 
          onClick={handleRegister}
        >Register</button>

  
      {/* <Form.Group inline>
          <label>Account Type</label>
          <Form.Radio 
            label="Business" 
            // checked={account === 'Business'} 
            name="acct_type"
            value="Business" 
            onClick={setBusinessState} />
          <Form.Radio 
            label="Customer" 
            // checked={account === 'Customer'} 
            name="acct_type" 
            value="Customer"
            onClick={setBusinessState} />
      </Form.Group>
         */}
    </form>
  );
}