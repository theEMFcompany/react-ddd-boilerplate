import React, {Component} from 'react';

interface Props {
  center?: boolean
}
export const FieldGroup: React.FC<Props> =  (props) => {
  return (
      <div className={`fieldGroup ${props.center ? 'fieldGroup--centered' : ''}`}>
        {props.children}
      </div>
  );
}

export default FieldGroup;
