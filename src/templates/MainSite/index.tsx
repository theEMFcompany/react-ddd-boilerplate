import React from 'react';
import SiteHeader from 'components/SiteHeader';

type HeaderRightRegistry = 'site-menu' | '';
interface Props {
  headerRight?: HeaderRightRegistry[];
  className?: string;
}

export const MainSite: React.FC<Props> = (props) => {
  return (
    <div className={`mainSite ${props.className || ''}`}>
      <SiteHeader color='light-gray' shade='100' logoClass='mainSite__siteHeader__logo'>
      </SiteHeader>
      <main className='mainSite__content'>
        {props.children}
      </main>
    </div>
  )
}

export default MainSite;
