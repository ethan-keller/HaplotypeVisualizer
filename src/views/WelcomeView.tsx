import React from 'react';
import WelcomeCard from '../components/WelcomeCard';
import '../styles/welcome-view.css';

interface WelcomeViewProps {}

const WelcomeView: React.FC<WelcomeViewProps> = (props) => {
  return (
    <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <WelcomeCard description='Select the necessary files to start visualizing' />
    </div>
  );
};

export const url = '/welcome';
export default WelcomeView;
