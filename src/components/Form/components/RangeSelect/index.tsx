import React, {useState} from 'react';

import {Meta} from 'components/Text';
import TextField from '../TextField/';

interface Props {
  name: string;
  label: string;
  value: [number, number];
  min: number;
  max: number;
  labels: [string?, string?];
  error?: [string?, string?];
  className?: string;
  onChange?(type: 'min' | 'max', value: string): void;
  onKeyUp?(type: 'min' | 'max'): void;
}
export default function RangeSelect (props: Props){
  const [minValue, maxValue] = props.value || [];
  const [minLabel, maxLabel] = props.labels || [];
  const [minError, maxError] = props.error || [];

    const [[minErrorText, maxErrorText], setErrorText] = useState([minError || '', maxError || '']);

    function getMinError(min: number): string {
      let text = '';
      if(min > maxValue) {
        text = 'Max = ' + maxValue;
      }
      if(min > props.max) {
        text = 'Max = ' + props.max;
      }
      if(min < props.min) {
        text = 'Min = ' + props.min;
      }
      return text;
    }

    function getMaxError(max: number): string {
      let text = '';
      if(max < minValue && minValue < props.max ) {
        text = 'Min = ' + minValue;
      }
      if(max < props.min) {
        text = 'Min = ' + props.min;
      }
      if(max > props.max) {
        text = 'Max = ' + props.max;
      }
      return text;
    }

    return (
      <div className={`field rangeSelect ${props.className}`}>
        <Meta as='div' className='rangeSelect__label'>{props.label}</Meta>
        <div className='rangeSelect__fields'>
          <TextField
            type='number'
            className='rangeSelect__min rangeSelect__item'
            onKeyUp={ (e) => {
              props.onKeyUp && props.onKeyUp('min');
              setErrorText([getMinError(Number(e.target.value)), getMaxError(Number(maxValue))]);
            }}
            onChange={(e) => {
              props.onChange && props.onChange('min', e.target.value);
            }}
            value={minValue || ''}
            required
            min={props.min}
            max={maxValue || props.max}
            error={minErrorText}
            label={`${minLabel ? minLabel : 'Min'}: ${props.min}`}
            name={`${props.name}-min`}/>
          <TextField
            type='number'
            className='rangeSelect__max rangeSelect__item'
            required
            onKeyUp={(e) => {
              props.onKeyUp && props.onKeyUp('max');
              setErrorText([getMinError(Number(minValue)), getMaxError(Number(e.target.value))]);
            }}
            onChange={(e) => {
              props.onChange && props.onChange('max', e.target.value)
            }}
            value={maxValue || ''}
            min={minValue || props.min}
            max={props.max}
            error={maxErrorText}
            label={`${maxLabel ? maxLabel : 'Max'}: ${props.max}`}
            name='max'/>
        </div>
      </div>
    );
}
