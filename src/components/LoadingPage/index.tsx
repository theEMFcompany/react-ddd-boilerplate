import React from 'react';
import Loader from '../Loader';
import {Meta} from '../Text';

interface Props {
 label?: string;
}

const LoadingPage: React.FC<Props> = (props: Props) => {
  return (
    <div className='loadingPage'>
      <div className='loadingPage__content'>
        <Loader className='loadingPage__loader'/>
        {
          props.label && <Meta className='loadingPage__text'>{props.label}</Meta>
        }
      </div>
    </div>
  );
}

export default LoadingPage;
