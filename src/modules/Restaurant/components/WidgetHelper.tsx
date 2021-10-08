import  React, {ReactElement} from 'react';
import {SelectFieldSet, TextField, RangeSelect, OptionTextField} from 'components/Form';
import Switch from 'components/Switch'
import * as T from '../types';

interface Options {
  filter: T.Filter;
  currentParams: any;
  onChange(key?: string, value?: any, auto?: boolean): void;
}

export function getWidget(props: Options,) {
  const options = props.filter.values && Array.isArray(props.filter.values) ? props.filter.values.map(v => ({name: v, value: v})) : [];
  const widgets: Record<T.FilterWidget, () => ReactElement> = {
    search: () => {
      return (
      <TextField
        name={props.filter.key}
        label={props.filter.label}
        value={props.currentParams[props.filter.key] || ''}
        onChange={(e) => {
          const value = e.target.value;
          if(value.length > 0) {
            props.onChange(props.filter.key, value);
          } else if(value.length === 0){
            props.onChange(props.filter.key, false);
          }
        }}/>
      );
    },
    option_search: () => {
      return (
        <OptionTextField
          name={props.filter.key}
          label={props.filter.label}
          value={props.currentParams[props.filter.key] || ''}
          onChange={(e) => props.onChange(props.filter.key, e.target.value)}
          options={props.filter.values}/>
      );
    },
    multi_select: () => {
      return (
        <SelectFieldSet
          name={props.filter.key}
          label={props.filter.label}
          value={props.currentParams[props.filter.key] || []}
          multiple
          onChange={vals => {
            props.onChange(props.filter.key, vals)
          }}
          options={options}/>
      );
    },
    select: () => {
      return (
        <SelectFieldSet
          name={props.filter.key}
          label={props.filter.label}
          value={props.currentParams[props.filter.key] || ''}
          onChange={val => {
            props.onChange(props.filter.key, val)
          }}
          options={options}/>
      );
    },
    range_slider: () => {
      const min = props.filter.items?.[0];
      const max = props.filter.items?.[1];
      const minValue = min && props.currentParams[min?.key]
      const maxValue = max && props.currentParams[max?.key]
      return (
        <RangeSelect
          name={props.filter.key}
          label={props.filter.label}
          labels={[min?.label, max?.label]}
          onChange={(type: 'min' | 'max', value: string) => {
            if(type === 'min') {
              props.onChange(min?.key, value)
            }
            if(type === 'max') {
              props.onChange(max?.key, value)
            }
          }}
          min={min?.values}
          max={max?.values}
          value={[minValue, maxValue]}/>
      );
    },
    toggle: () => {
      return (
        <Switch
          name={props.filter.key}
          id={props.filter.key}
          label={props.filter.label}
          checked={props.currentParams[props.filter.key] && props.currentParams[props.filter.key] ? true : false}
          onChange={val => props.onChange(props.filter.key, val)}/>
      );
    },
  }
  return props.filter.ui_widget ? widgets[props.filter.ui_widget]() : null;
}
