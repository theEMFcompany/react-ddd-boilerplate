import React, {useRef, useEffect} from 'react';

interface Props {
  scrollToken?: string;
  cols?: '2' | '3' | '4' | '5' | '6';
}

export const BlockGrid: React.FC<Props> = (props) => {
  return (
    <div className={`grid-x grid-margin-x grid-margin-y medium-up-${props.cols ? props.cols : '3'}`}>
      {props.children}
    </div>
  );
}


interface Props {}

export const BlockGridCell: React.FC<Props> = (props) => {
  return (
    <div className={`cell`}>
      {props.children}
    </div>
  );
}
