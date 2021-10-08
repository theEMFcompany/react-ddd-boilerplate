import React from 'react';

interface Props {
  margin?: boolean;
  padding?: boolean;
  top1?: boolean;
  top2?: boolean;
  top3?: boolean;
  top4?: boolean;
  top5?: boolean;
  top6?: boolean;
  top7?: boolean;
  top8?: boolean;
  top9?: boolean;
  bottom1?: boolean;
  bottom2?: boolean;
  bottom3?: boolean;
  bottom4?: boolean;
  bottom5?: boolean;
  bottom6?: boolean;
  bottom7?: boolean;
  bottom8?: boolean;
  bottom9?: boolean;
  left1?: boolean;
  left2?: boolean;
  left3?: boolean;
  left4?: boolean;
  left5?: boolean;
  left6?: boolean;
  left7?: boolean;
  left8?: boolean;
  left9?: boolean;
  right1?: boolean;
  right2?: boolean;
  right3?: boolean;
  right4?: boolean;
  right5?: boolean;
  right6?: boolean;
  right7?: boolean;
  right8?: boolean;
  right9?: boolean;
  className?: string;
}

export type Prefix = 'p' | 'm';

export const Space: React.FC<Props> = (props) => {
  let ClonedElement: React.ReactElement | null = null;
  const ChildComponent = React.Children.only(props.children);
  const propArray = [];

  for(let prop in props) {
    if(props.hasOwnProperty(prop) && ['top', 'bottom', 'left', 'right'].indexOf(prop.substring(0, prop.length -1)) !== -1) {
      propArray.push(prop);
    }
  }

  let prefix: Prefix;

  if (props.padding) {
    prefix = 'p'
  } else {
    prefix = 'm'
  }

  function  computeClasses(_prefix: Prefix, _props: string[]){
    if(!_prefix) return
    return _props.map(s=>{return _prefix + s.substring(0, 1) + s.substring(s.length-1)}).join(' ')
  }

  try {
    if(React.isValidElement(ChildComponent)) {
      ClonedElement = React.cloneElement(
        ChildComponent,
        {
          className: computeClasses(prefix, propArray) + ' ' + (ChildComponent.props.className? ChildComponent.props.className: '')
        }
      );
    }
  } catch (e){
    ClonedElement = null;
  }

  return (
    ClonedElement && ClonedElement !== null
    ? ClonedElement
    : <div className={computeClasses(prefix, propArray) + ' ' + (props.className || '')}>
        {props.children}
      </div>
  )
}
