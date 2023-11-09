// import { LineWave } from 'react-loader-spinner';
import '../assets/styles/loader.css';

const Loader = ({ className }) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${className}`}
    >
      <div className='loader'>
        {/* <LineWave
        height='100'
        width='100'
        color='#077bf7'
        ariaLabel='line-wave'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        firstLineColor=''
        middleLineColor=''
        lastLineColor=''
      /> */}
      </div>
    </div>
  );
};

export default Loader;
