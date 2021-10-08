import React from 'react';
import {NavLink} from 'react-router-dom';
import {color, Color, ColorShades} from 'utils/style';


interface Props {
  fixed?: boolean;
  color?: Color;
  shade?: ColorShades;
  fullWidth?: boolean;
  logoClass?: string;
  title?: string;
}

export const SiteHeader: React.FC<Props> = (props) => {
  return (
    <header className={
      `siteHeader${props.fixed ? ' siteHeader--fixed' :''} ${props.color? color(props.color, props.shade, 'background') : ''}`
      }>
      <div className={`siteHeader__wrap${props.fullWidth ? ' siteHeader__wrap--fullWidth' : ''}`}>
        <section className='siteHeader__logoArea'>
          <NavLink to='/' className={`siteHeader__logoArea__logo ${props.title ? 'siteHeader__logoArea__textLogo' : ''} ${props.logoClass || ''}`}>
            {
              props.title
            }
          </NavLink>
        </section>
        <section className='sideHeader__menuArea'>
          {props.children}
        </section>
      </div>
    </header>
  );
};


export default SiteHeader;
