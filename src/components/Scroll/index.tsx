import React, {useEffect, useRef} from 'react'
import { useLocation } from "react-router-dom";

interface Props {
  scrollToken?: string;
  x?: number;
  y?: number;
}

export const Scroll: React.FC<Props> = function Scroller(props) {
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      gridRef.current
      ? gridRef.current.scrollIntoView({behavior: 'smooth'})
      : window.scrollTo({
          behavior: 'smooth',
          top: props.y || 0,
          left: props.x || 0
        });
    }, 300)
  }, [props.scrollToken || '-']);

  return (
    props.children
      ? <div ref={gridRef} className='scrollWrapper'>{props.children}</div>
      : null
  )
}

export default Scroll;
