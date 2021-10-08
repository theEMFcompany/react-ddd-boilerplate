import React from 'react';
import Icon, {IconType} from 'components/Icon';
import {Image, ImageType} from 'components/Image';

interface Props {
  active?: boolean;
  className?: string;
  icon?: IconType;
  image?: string;
  imageType?: ImageType;
  fluid?: boolean;
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

export const ClickBox: React.FC<Props> = (props)=> {
  const image = props.image ? <Image src={props.image}  key='clicbox__image' type={props.imageType}/> : <Icon icon={props.icon || 'cogs'} key='clicbox__icon'/>
  return (
      <span
        className={`clickbox ${props.active? 'clickbox--active': ''} ${props.fluid ? 'clickbox--noWrap' : ''} ${props.className ? props.className : ''}`}
        onMouseDown={props.onClick}
        onMouseUp={props.onMouseUp}>
        {
          props.children ||
          [
            image,
            <span key='clickbox__label'>{props.label || 'Label'}</span>
          ]
        }
      </span>
  )
}

export default ClickBox;
