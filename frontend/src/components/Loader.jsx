import { useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Loader = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  return (
    <ScaleLoader
      color='#a5a5a5'
      loading={loading}
      size={25}
      aria-label='Loading Spinner'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
      }}
    />
  );
};

export default Loader;
