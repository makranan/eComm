import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const CheckoutStepsLine = () => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [verticalScrollbarVisible, setVerticalScrollbarVisible] =
    useState(false);

  useEffect(() => {
    // Calculate vertical scrollbar visibility when the component mounts and on window resize
    const checkVerticalScrollbarVisibility = () => {
      const isVerticalScrollbarVisible =
        document.documentElement.scrollHeight >
        document.documentElement.clientHeight;
      setVerticalScrollbarVisible(isVerticalScrollbarVisible);
    };

    checkVerticalScrollbarVisibility(); // Check on component mount

    // Add an event listener to check on window resize
    window.addEventListener('resize', checkVerticalScrollbarVisibility);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkVerticalScrollbarVisibility);
    };
  }, []);

  useEffect(() => {
    // Calculate the scrollbar width when the component mounts
    setScrollbarWidth(getScrollbarWidth());
  }, []);

  // Function to calculate the scrollbar width
  const getScrollbarWidth = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    document.body.appendChild(scrollDiv);

    // Calculate the scrollbar width
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    // Clean up the temporary div
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
  };

  const containerStyle = {
    width: `calc(100vw - ${
      verticalScrollbarVisible ? scrollbarWidth : 0
    }px - 1px)`, // Subtract scrollbar width if vertical scrollbar is visible
  };

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
    <div className='progress-container-main' style={containerStyle}>
      <div className='progress-container'>
        <div
          className='progress'
          style={{
            width: progressWidth,
          }}
        ></div>
      </div>
    </div>
  );
};

export default CheckoutStepsLine;
