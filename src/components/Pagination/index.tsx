import React from 'react';
import { Text } from 'components/Text';

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange(pageNumber: number): void;
}

export default function Pagination(props: Props){
  const renderPageButtons = (pageCount: number, currentPage: number) => {
    const pageButtonArray = [];

    currentPage > 1 && pageButtonArray.push(
      <li key={`page_prev`}
          className={`pagination-pageButton  pagination-previous`}>
          <button onClick={() => props.onPageChange(currentPage - 1)}
                aria-label='Previous page'>
            Prev
          </button>
      </li>
    );
    let i = 1;

    for (i; i <= pageCount; i++) {
      const page = i;
      const isCur = page === currentPage ?true : false;
      const element = shouldRender(pageCount, page, currentPage);
      switch(element) {
        case -1:
          break;
        case 0:
          pageButtonArray.push(
            <li key={`page_${page}`}
                className={`ellipsis`}>
            </li>
          );
          break;
        case 1:
          pageButtonArray.push(
            <li
              key={`page_${page}`}
              className={`pagination-pageButton ${isCur ? 'current' : ''}`}>
              {
                isCur
                ? <span><span className='show-for-sr'></span>{page}</span>
                : <button onClick={() => {
                    props.onPageChange(page)
                  }}
                        aria-label={`Page ${page}`}>
                    {i}
                  </button>
              }
            </li>
          );
          break;
        default:
      }
    }

    currentPage < pageCount && pageButtonArray.push(
      <li
        key={`page_next`}
        className={`pagination-pageButton pagination-next`}>
        <button
          onClick={() => props.onPageChange(currentPage + 1)}
          aria-label='Next page'>
          Next
        </button>
      </li>
    );

    return pageButtonArray;
  }

  return (
    <div className = 'pagination-wrap'>
      <span className = 'first-page'>
      {/* <Icon icon='arrow-left'></Icon>  */}
      </span>
      <ul className='pagination' role='navigation' aria-label='Pagination'>
        {renderPageButtons(props.pageCount, props.currentPage)}
      </ul>
      <span className = 'last-page'> <i className='icofont iconfont-simple-right'></i>  </span>
    </div>
  );
}

interface PageRangeProps {
  count: number;
  limit: number;
  activePage: number;
  locales?: {
    singular?: string;
    plural?: string;
    prefix?: string;
    preposition?: string;
  }

}

export function PageRange(props: PageRangeProps) {
  let   { count = 0,
          limit = 10,
          activePage = 1} = props;

  const {singular = 'item', plural = 'items', prefix = 'Showing', preposition = 'of'} = props.locales || {};

  count = Number(count);
  limit = Number(limit);
  activePage= Number(activePage);
  const pageCount = Math.ceil(count/limit);

  const pageStart = ((activePage-1) * limit) + 1,
        lastPage = pageCount == activePage? true: false,
        lastPageEnd = ((activePage-1) * limit) + (count % limit !== 0? count % limit: limit),
        pageEnd =  lastPage? lastPageEnd: activePage * limit;
  const pageRange = pageStart == pageEnd? `${pageStart}-${lastPageEnd}`: `${pageStart}-${pageEnd}`;
  return (
    count
      ?<Text align='left' className='pageRange'>
        {`${prefix} `}
        <em>{`${pageRange} `}</em>
        {`${preposition} `}
        <em>{`${count} `}</em>
        {`${count===1 ?singular :plural}`}
      </Text>
      :null
  );
}



function shouldRender(count: number, index: number, active: number): 1 | -1 | 0 {
  let ceilRange, floorRange;

  if(count === 1){
    return -1;
  }

  if (count > 9){
    if( active < 4 ) {
      if(index <= 4) return 1;
      if(index >= count - 3) return 1;
      if(index === count - 4) return 0;
      return -1;

    } else if ( active >= 4 && active <= count - 3 ) {
      floorRange = active - 2;
      ceilRange = active + 2;

      if( index === 1 ) return 1;
      if( index >= floorRange && index <= ceilRange ) return 1;
      if( index === count ) return 1;
      if( index === ceilRange + 1 || index === floorRange - 1 ) return 0;
      return -1

    } else if( active > count - 3 ) {
      if(index <= 1) return 1;
      if(index >= count - 6) return 1;
      if(index === count - 7) return 0;
      return -1;
    }
    return -1; //Test this
  } else {
    return 1
  }
}
