import type { NextPage } from 'next';
import styled from 'styled-components';
import PageHead from 'components/PageHead';
import { RegistrationCover } from 'components/registration-cover';
import { RegistrationForm } from 'components/registration-form';

const RegisterContainer = styled.div`
  display: flex;
  min-width: 100vw;
  max-width: 100vw;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Register: NextPage = () => {
  return (
    <>
      <PageHead
        title="SYCon2022 - Creating Leaders and Inspiring Change"
        description="Creating Leaders and Inspiring Change"
      />
      <RegisterContainer>
        <RegistrationCover />
        <RegistrationForm />
      </RegisterContainer>
    </>
  );
};

export default Register;
