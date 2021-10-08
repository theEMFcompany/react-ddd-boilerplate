import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  isLoggedIn?: boolean;
  className?: string;
}

export const CenteredSite: React.FC<Props> = (props) => {
  return (
    <div className={`centeredSite ${props.className || ''}`}>
      <header className='centeredSite__siteHeader'>
        <Link to='/'><span className='centeredSite__siteHeader__logo'/></Link>
      </header>
      <main className='centeredSite__fixedHeader'>
        {props.children}
      </main>
      <footer></footer>
    </div>
  )
}

export default CenteredSite;
