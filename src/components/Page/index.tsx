import React from 'react';

interface Props {
  className?: string;
}

export const PageContainer: React.FC<Props> = function PageContainer({children, className=''}){
  return(
    <div className={'pageContainer' + ' ' + className}>
      {children}
    </div>
  );
}

export const Page: React.FC<Props> = function Page({children, className=''}){
  return(
    <div className={'page' + ' ' + className}>
      {children}
    </div>
  );
}

export const PageHeader: React.FC<Props> = function PageHeader(props) {
  return (
    <header className='pageHeader'>
      <section>
        {props.children}
      </section>
    </header>
  );
}

export const PageContent: React.FC<Props> = function PageContent({children, className=''}){
  return(
    <article className={'pageContent' + ' ' + className}>
      <section>
        {children}
      </section>
    </article>
  );
}

export const PageFooter: React.FC<Props> = function PageFooter(props) {
  return (
    <footer className='pageFooter'>
      {props.children}
    </footer>
  );
}

export const SideBar: React.FC<Props> = function SideBar({children, className=''}) {
  return(
    <aside className={'sideBar' + ' ' + className}>
      {children}
    </aside>
  );
}

export const SideBarHeader: React.FC<Props> = function SideBarHeader(props) {
  return (
    <header className='sideBarHeader'>
      {props.children}
    </header>
  );
}


export const SideBarContent: React.FC<Props> = function SideBarContent({children, className=''}){
  return(
    <section className={'sideBarContent' + ' ' + className}>
      {children}
    </section>
  );
}

export const SideBarFooter: React.FC<Props> = function SideBarFooter(props) {
  return (
    <footer className={`sideBarFooter`}>
      {props.children}
    </footer>
  );
}
