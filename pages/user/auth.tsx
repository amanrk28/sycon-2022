import { useState } from 'react';
import { Button } from '@mui/material';

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);

  function toggleAuth() {
    setIsSignup(prevState => !prevState);
  }
  return (
    <>
      <h1>{isSignup ? 'Signup' : 'Login'} here</h1>
      <Button variant="contained" onClick={toggleAuth}>
        {isSignup ? 'Login' : 'Signup'}
      </Button>
    </>
  );
}
