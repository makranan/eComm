import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const CheckoutStepsLine = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { id: orderId } = useParams();
  const orderIdOrDefault = orderId || 'default'; // Provide a default value

  // Define the steps and their corresponding paths
  const steps = [
    { step: 1, path: '/cart' },
    { step: 2, path: '/shipping' },
    { step: 3, path: '/payment' },
    { step: 4, path: '/placeorder' },
    { step: 5, path: `/order/${orderIdOrDefault}` },
  ];

  // Find the step that matches the current path
  const currentActiveStep = steps.find(
    stepInfo => stepInfo.path === currentPath
  );

  // If the current path is not found, default to step 1
  const currentActive = currentActiveStep ? currentActiveStep.step : 1;

  const progressWidth = `${((currentActive - 1) / (steps.length - 1)) * 100}%`;

  return (
    <div className='progress-container-main'>
      <div className='progress-container'>
        <div
          className='progress'
          style={{
            width: progressWidth,
            // transition: 'width 0.3s ease',
          }}
        ></div>
      </div>
    </div>
  );
};

export default CheckoutStepsLine;
