import React from 'react';

export type ImageType = 'svg' | 'normal';
interface Props {
  src: string;
  type?: ImageType;
  width?: number;
  height?: number;
  className?: string;
}

export const Image: React.FC<Props> =  function Image(props: Props){
    const imageSrc = props.src;
    return props.type === 'svg'
      ?<svg
        className={`imageDeck ${props.className}`}>
        <use xlinkHref={imageSrc}></use>
      </svg>
      :<div className='imageDeck'>
            <div  style={{
                    display: 'inline-block',
                    backgroundImage: `url(${imageSrc})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: props.width || 150,

                  }}>
            {
              <img src={`${imageSrc}`} style={{height:props.height || 150, visibility: 'hidden'}}/>
            }
            </div>
        </div>
  }
