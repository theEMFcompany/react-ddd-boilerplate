import qs from 'query-string';

export function stringify(qp: Record<string, unknown>){
  if(typeof qp === 'string') {
    return qp;
  }
  const rawString = qs.stringify(qp, {arrayFormat: 'bracket'});
  return rawString[0] !== '?' ? '?' + rawString : rawString;
}

export function parse(qp: string){
  if(typeof qp !== 'string'){
    return qp;
  }
  const search = qp.split('?')
  console.log()
  return qs.parse(search[1], {arrayFormat: 'bracket'})
}
