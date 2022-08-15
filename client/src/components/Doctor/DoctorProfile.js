import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createProfileD, getCurrentProfileD } from '../../utils/profileactions';
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
const DoctorProfile = (props) => {
  const classes = useStyle();
  const [name, setnamedef] = useState('');
  const [gender, genderdef] = useState('');
  const [specialisation, specialisationdef] = useState('');
  const [address, setAddressdef] = useState('');
  const [City, setCitydef] = useState('');
  const [State, setStatedef] = useState('');
  const [Pincode, setPincodedef] = useState('');
  const [PhoneNumber, setMobiledef] = useState('');
  const [Degree, setDegreedef] = useState('');
  const history = useHistory();
  var data;
  useEffect(() => {
    getCurrentProfileD().then((data) => {
      if (data.Address) setAddressdef(data.Address);
      if (data.Gender) genderdef(data.Gender);
      if (data.Specialisation) specialisationdef(data.Specialisation);
      if (data.PhoneNumber) setMobiledef(data.PhoneNumber);
      if (data.City) setCitydef(data.City);
      if (data.State) setStatedef(data.State);
      if (data.Pincode) setPincodedef(data.Pincode);
      if (data.Degree) setDegreedef(data.Degree);
      if (data.Name) setnamedef(data.Name);
    });
  }, [localStorage.getItem('token')]);

  const updateProfileD = async (e) => {
    e.preventDefault();
    const profileData = {
      name,
      address,
      gender,
      specialisation,
      PhoneNumber,
      City,
      State,
      Pincode,
      Degree,
    };
    createProfileD(profileData, history);
  };
  return (
    <Container>
      <form onSubmit={updateProfileD}>
        <div>
          <div class='container'>
            <div class='row gutters'>
              <div class='col-md-12 col-lg-12 col-xl-12'>
                <div class='card'>
                  <div class='card-body'>
                    <form onSubmit={updateProfileD}>
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
                            <label> Name </label>
                            <input
                              type='text'
                              placeholder={name}
                              name='name'
                              class='form-control'
                              onChange={(e) => {
                                setnamedef(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label> Address </label>
                            <input
                              type='text'
                              placeholder={address}
                              name='address'
                              class='form-control'
                              onChange={(e) => {
                                setAddressdef(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label> Gender </label>
                            <input
                              type='text'
                              placeholder={gender}
                              name='address'
                              class='form-control'
                              onChange={(e) => {
                                genderdef(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label> specialisation </label>
                            <input
                              type='text'
                              name='specialisation'
                              placeholder={specialisation}
                              class='form-control'
                              onChange={(e) => {
                                specialisationdef(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label>PinCode</label>
                            <input
                              type='text'
                              class='form-control '
                              placeholder={Pincode}
                              name='Pincode'
                              onChange={(e) => {
                                setPincodedef(e.target.value);
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
                              placeholder={PhoneNumber}
                              name='PhoneNumber'
                              onChange={(e) => {
                                setMobiledef(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div class='col-12'>
                          <div class='form-group'>
                            <label> Degree </label>
                            <input
                              type='text'
                              placeholder={Degree}
                              class='form-control '
                              name='Degree'
                              onChange={(e) => {
                                setDegreedef(e.target.value);
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
                                setCitydef(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class='col-12 col-md-6'>
                          <div class='form-group'>
                            <label>State</label>
                            <input
                              type='text'
                              class='form-control'
                              placeholder={State}
                              name='State'
                              onChange={(e) => {
                                setStatedef(e.target.value);
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
export default DoctorProfile;
