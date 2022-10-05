import { Modal } from 'antd';
import React, { useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import PageHead from 'components/PageHead';
import { Loader } from 'components/Loader';
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const setModal = (value: boolean) => setIsModalOpen(value);

  return (
    <>
      <PageHead
        title="SYCon2022 - Creating Leaders and Inspiring Change"
        description="Creating Leaders and Inspiring Change"
      />
      <Modal
        open={isModalOpen}
        footer={null}
        style={{ width: '100vw', height: '100vh' }}
        modalRender={Loader}
      />
      <RegisterContainer>
        <RegistrationCover />
        <RegistrationForm setModal={setModal} />
      </RegisterContainer>
    </>
  );
};

export default Register;
