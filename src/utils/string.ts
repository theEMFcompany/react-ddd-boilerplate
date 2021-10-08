import numeral from 'numeral';
import _truncate from 'lodash.truncate';

export function maskPrice(price: number, brief?: boolean){
  if (brief) return numeral(price).format('0,0')
  return numeral(price).format('0,0.00')
}
