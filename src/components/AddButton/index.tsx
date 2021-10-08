import React from 'react';
import Icon from 'components/Icon';

interface Props {
  onClick(event: React.MouseEvent<HTMLDivElement>): void;
  text: string;
};

export const AddButton: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const {onClick, text, children} = props;
  return (
    <div className="addButton-wrap">
      <div
        className='addButton'
        onClick={onClick}>
        <Icon icon='add'/>
        <div>{children || text}</div>
      </div>
    </div>
  );
}

AddButton.defaultProps = {
  onClick: ()=>{},
  text: 'Button'
}
