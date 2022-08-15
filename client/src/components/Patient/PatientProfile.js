import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../utils/profileactions';
const useStyle = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 20,
    display: 'block',
    width: '100%',
  },
});
let result;
const PatientProfile = (props) => {
  const classes = useStyle();
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [Address, setAddress] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Pincode, SetPincode] = useState('');
  const [Blood, setBlood] = useState('');
  const [Mobile, setMobile] = useState('');
  const [DOB, setDOB] = useState('');
  const history = useHistory();
  var data;
  useEffect(() => {
    getCurrentProfile().then((data) => {
      if (data.First_Name) setfirst_name(data.First_Name);
      if (data.Last_Name) setlast_name(data.Last_Name);
      if (data.Address) setAddress(data.Address);
      if (data.Phone) setMobile(data.Phone);
      if (data.City) setCity(data.City);
      if (data.State) setState(data.State);
      if (data.Pincode) SetPincode(data.Pincode);
    });
  }, [localStorage.getItem('token')]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const profileData = {
      first_name,
      last_name,
      City,
      State,
      Address,
      Blood,
      Mobile,
      Pincode,
    };
    createProfile(profileData, history);
  };
  return (
    <Container>
      <form onSubmit={updateProfile}>
        <div>
          <div class='container'>
            <div class='row gutters'>
              <div class='col-md-12 col-lg-12 col-xl-12'>
                <div class='card'>
                  <div class='card-body'>
                    <form onSubmit={updateProfile}>
                      <div class='row form-row'>
                        <div class='col-12 col-md-12'>
                          <div class='form-group'>
                            <div class='change-avatar'>
                              <div class='profile-img'>
                                <img src='...jpg' alt='User' />
                              </div>
                              <div class='upload-img'>
                                <div class='change-photo-btn'>
                                  <span>
                                    <i class='fa fa-upload'></i> Upload Photo
                                  </span>
                                  <input type='file' class='upload' />
                                </div>
                                <small class='form-text'>
                                  Allowed JPG, GIF or PNG. Max size of 2MB
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label> First Name </label>
                            <input
                              type='text'
                              placeholder={first_name}
                              name='first_name'
                              class='form-control'
                              onChange={(e) => {
                                setfirst_name(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label> Last Name </label>
                            <input
                              type='text'
                              name='last_name'
                              placeholder={last_name}
                              class='form-control'
                              onChange={(e) => {
                                setlast_name(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label>PinCode </label>
                            <input
                              type='text'
                              class='form-control '
                              placeholder={Pincode}
                              name='Pincode'
                              onChange={(e) => {
                                SetPincode(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label> Phone No. </label>
                            <input
                              type='text'
                              class='form-control '
                              placeholder={Mobile}
                              name='Mobile'
                              onChange={(e) => {
                                setMobile(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div class='col-12'>
                          <div class='form-group'>
                            <label> Address </label>
                            <input
                              type='text'
                              placeholder={Address}
                              class='form-control '
                              name='Address'
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label> City </label>
                            <input
                              type='text'
                              class='form-control '
                              placeholder={City}
                              name='City'
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label>State</label>
                            <input
                              type='text'
                              class='form-control '
                              placeholder={State}
                              name='State'
                              onChange={(e) => {
                                setState(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button type='submit' variant='contained' color='primary'>
          {' '}
          Update
        </Button>
      </form>
    </Container>
  );
};

export default PatientProfile;
