import { LineWave } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='svg-center'>
      <LineWave
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
      />
    </div>
  );
};

export default Loader;
