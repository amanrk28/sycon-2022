import React, { useState } from 'react';
import Image from 'next/image';
import PageHead from 'components/PageHead';
import { Modal } from 'antd';
import { Loader } from '../components/Loader';
import styled from 'styled-components';
import { RegistrationForm } from '../components/RegistrationForm';
import type { NextPage } from 'next';

const RegisterContainer = styled.div`
  display: flex;
  min-width: 100vw;
  max-width: 100vw;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const CoverContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
  max-width: 50vw;
  width: 50vw;
  background-image: url('/RegistrationCoverPic.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 20px 83px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 900px) {
    max-width: 100vw;
    width: 100vw;
    height: 50vh;
    max-height: 50vh;
    padding: 12px 40px;
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
        <CoverContainer>
          <div className="top">
            <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
            <h1>SYCon Ticketing</h1>
            <h3>Creating leaders & Inspiring change</h3>
          </div>
          {/* <div className="sponsor-container">
            <div>
              <p>Title Sponsor</p>
              <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
            </div>
            <div className="divider"></div>
            <div>
              <p>Official Sponsor</p>
              <div className="sponsor-images">
                <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
                <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
              </div>
            </div>
          </div> */}
        </CoverContainer>
        <RegistrationForm setModal={setModal} />
      </RegisterContainer>
    </>
  );
};

export default Register;
