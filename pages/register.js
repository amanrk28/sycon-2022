import React, { useState } from 'react';
import { TextField, Menu, MenuItem, Button } from '@mui/material';
import { inputFields, branchNames, degreeNames } from '../components/constants';

const textFieldSx = {
  width: 400,
};

export default function Register() {
  const [state, setState] = useState({
    fullName: '',
    email: '',
    registerNumber: '',
    contact: '',
    year: '',
    degree: '',
    branch: '',
    referralCode: '',
  });
  const [anchorElDegree, setAnchorElDegree] = useState(null);
  const [anchorElBranch, setAnchorElBranch] = useState(null);
  const openDegree = Boolean(anchorElDegree);
  const openBranch = Boolean(anchorElBranch);

  const handleClickDegree = event => {
    setAnchorElDegree(event.currentTarget);
  };
  const handleClickBranch = event => {
    setAnchorElBranch(event.currentTarget);
  };
  const handleCloseBranch = e => {
    const value = e.target.getAttribute('name');
    if (value) setState({ ...state, branch: value });
    setAnchorElBranch(null);
  };
  const handleCloseDegree = e => {
    const value = e.target.getAttribute('name');
    if (value) setState({ ...state, degree: value });
    setAnchorElDegree(null);
  };

  const onChange = (event, key) => {
    const { value } = event.target;
    setState({ ...state, [key]: value });
  };

  return (
    <div className="register-container">
      <div className="img-container">
        <img
          src="https://res.cloudinary.com/retailr/image/upload/v1643785509/products/andy-li-A_dJOYpxEVU-unsplash_1_f44sus.png"
          alt=""
        />
      </div>
      <div className="register-form">
        <h3>Student Registration</h3>
        <div className="input-fields">
          {inputFields.map(field => (
            <div className="input-container" key={field.id}>
              <TextField
                sx={textFieldSx}
                value={state[field.id]}
                type={field.type}
                label={field.label}
                onChange={e => onChange(e, field.id)}
                inputProps={field.props}
              />
            </div>
          ))}

          <div className="dropdown-input">
            <div className="input-container">
              <TextField
                disabled
                value={state.degree}
                label="Degree"
                id="degree-button"
                aria-controls={openDegree ? 'degree-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openDegree ? 'true' : undefined}
                onClick={handleClickDegree}
              />
              <Menu
                id="degree-menu"
                anchorEl={anchorElDegree}
                open={openDegree}
                onClose={handleCloseDegree}
                MenuListProps={{
                  'aria-labelledby': 'degree-button',
                }}
              >
                {degreeNames.map(item => (
                  <MenuItem onClick={handleCloseDegree} name={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div className="input-container">
              <TextField
                disabled
                value={state.branch}
                label="Branch"
                id="branch-button"
                aria-controls={openBranch ? 'branch-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openBranch ? 'true' : undefined}
                onClick={handleClickBranch}
              />
              <Menu
                id="branch-menu"
                anchorEl={anchorElBranch}
                open={openBranch}
                onClose={handleCloseBranch}
                MenuListProps={{
                  'aria-labelledby': 'branch-button',
                }}
              >
                {branchNames.map(item => (
                  <MenuItem onClick={handleCloseBranch} name={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          <div className="input-container">
            <TextField
              sx={textFieldSx}
              value={state.referralCode}
              label="Referral Code"
              onChange={e => onChange(e, 'referralCode')}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                maxLength: 4,
              }}
            />
          </div>
        </div>
        <div className="payment-container">
          <Button variant="contained" size="large" sx={{ width: 180 }}>
            Pay Now
          </Button>
          <Button variant="outlined" size="large" sx={{ width: 180 }}>
            Pay Later
          </Button>
        </div>
      </div>
    </div>
  );
}
