import  React  from 'react';
import {Link} from 'react-router-dom';
import Loader from 'components/Loader/index';

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  expand?: boolean;
  loading?: boolean;
  pair?: boolean;
  as?: ButtonTypes;
  to?: string;
  style?: Style;
  color?: Color;
  text?: string;
  iconLeft?: string;
  iconRight?: string;
  size?: Size;
  margin?: boolean;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}

export type Color = 'primary' | 'secondary' | 'neutral'
export type Style = 'hollow' | 'solid';
export type Size = 'large' | 'medium' | 'small';
export type ButtonTypes = 'submit' | 'button' | 'link';

export const Button: React.FC<ButtonProps> = (props) => {

  const generalStyle = getStyleClass(props.style || 'solid', props.color || 'primary');

  const stretchStyle = props.expand ? 'button--strerch' : '';

  const pairStyle = props.pair ? 'buttonGroup' : '';

  const sizeStyle = getSizeClass(props.size || 'medium');
  const marginStyle = props.margin ? ' button--margin ': '';
  const disabledClass = props.disabled? 'button--disabled' : '';

  const defaultButton = (
    <button
      className={generalStyle + ' ' + 'button' + ' ' + stretchStyle +' '+ sizeStyle+' '+ pairStyle + ' ' +disabledClass + marginStyle + props.className}
      type='button'
      onClick={props.disabled ? ()=>{}: props.onClick}>
        {
          props.loading
          ?<Loader size='small' className='button__icon .button__icon--center'/>
          :[
            props.iconLeft ? <i className={`${props.iconLeft} button__icon button__icon--left`}></i> : null,
            props.text ? props.text : props.children,
            props.iconRight ? <i className={`${props.iconRight} button__icon button__icon--right`}></i> : null
          ]
        }
    </button>
  );

  const linkButton = (
    <Link
      to={props.to || '/'}
      className={generalStyle + ' ' + 'button' + ' ' + stretchStyle +' '+ sizeStyle+' '+ pairStyle + ' ' +disabledClass + marginStyle + props.className}>
      {props.children}
    </Link>
  );

  const submitButton = (
    <input
      className={generalStyle + ' ' + 'button button--submit' + ' ' + stretchStyle +' '+ sizeStyle+ ' '+ pairStyle + ' ' +disabledClass}
      type='submit'
      value={props.text}
      disabled={props.disabled}/>
  );

  const renderButton = (type: ButtonTypes = 'button') => {
    return {
      'submit': submitButton,
      'button': defaultButton,
      'link': linkButton
    }[type];
  };

  return  renderButton(props.as);

}

Button.defaultProps = {
  className: '',
  disabled: false,
  size: 'medium',
  onClick: ()=>{},
}

interface ButtonGroupProps {
  className?: string;
  justify?: 'start' | 'end' | 'center'
}

export const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  return(
    <div className={`buttonGroup__wrapper ${props.className || ''} ${props.justify ? 'buttonGroup__wrapper--' + props.justify: ''}`}>
      {props.children}
    </div>
  );
}

function getSizeClass(size: Size){
  switch (size) {
    case 'small':
      return 'button--small';
      break;
    case 'medium':
      return 'button--medium';
      break;
    case 'large':
      return 'button--large';
      break;
    default:
      return 'button--medium';
  }
}

function getStyleClass (style: Style, color: Color){
  return `${style} ${style}-${color}`;
}

export default Button;
