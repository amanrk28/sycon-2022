import { FC } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Title } from 'components/title';

const CoverContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
  max-width: 50vw;
  width: 50vw;
  background-image: url('/RegistrationCoverPic.png');
  background-repeat: no-repeat;
  background-size: cover;
  /* background-size: 100% 100%; */
  padding: 20px 83px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    max-width: 100vw;
    width: 100vw;
    height: 50vh;
    max-height: 50vh;
    padding: 12px 40px;
  }
`;

const EventDesc = styled(Title)`
  &.ant-typography {
    font-size: 72px;
    color: white;
    max-width: 668px;
    margin: 32px 0;
    @media screen and (max-width: 1024px) {
      font-size: 56px;
    }
    @media screen and (max-width: 900px) {
      font-size: 32px;
    }
  }
`;

export const RegistrationCover: FC = () => {
  return (
    <CoverContainer>
      <div className="top">
        <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
        <EventDesc level={3}>Creating leaders & Inspiring change</EventDesc>
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
  );
};
