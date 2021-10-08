export type WrapWidth = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
export type ColorScope = 'foreground' | 'background' | 'color' | 'bg' | 'border';
export type Color = 'primary' | 'secondary' | 'tetiary' | 'dark-gray' | 'light-gray' | 'mid-gray';
export type ColorShades = '100' | '200'| '300' | '400' | '500' | '600' | '700' | '800' | '900';
export function color(color?: Color, shade: ColorShades = '900', scope: ColorScope = 'background') {
  if(!color){
    return '';
  }
    let colorString = '';
    const scopePrefixes = {
      'foreground': 'color',
      'background': 'bg',
      'bg': 'bg',
      'color': 'color',
      'border': 'border'
    }
    if(color) {
      colorString +=`${scopePrefixes[scope]}-${color}-${shade}`;
    }
    return colorString;
}


export type FontSize = '0' | '1' | '2' | '3' | '4' |'5' | '6' | '7' | '8' | '9' | '10' | '20';
export function fontSize(scale: FontSize = '0') {
    return `font-size-${scale}`;
}

export type FlexDirection = 'x' | 'y';
export type FlexChildPosition = 'start' | 'end' | 'center' | 'stretch';
export function display(axis?: FlexDirection, justify: FlexChildPosition = 'center', align: FlexChildPosition = 'center') {
  if(!axis) {
    return '';
  }
  const directionClass = `flexBlock--direction-${axis}`
  const justification = `flexBlock--justify-${justify}`;
  const alignment = `flexBlock--align-${align}`;
  return `flexBlock ${directionClass} ${justification} ${alignment}`;
}

export interface SpacingConfig {
  top?: Spacing;
  bottom?: Spacing;
  left?: Spacing;
  right?: Spacing;
}

export type SpacingType = 'margin' | 'padding';
export type Spacing = '1' | '2' | '3' | '4' | '5' | '6';
export type SpacingSides = 'top' | 'right' | 'bottom' | 'left';
export function spacing(type: SpacingType, config?: SpacingConfig){
  if(!config) {
    return '';
  }
  const sideShorts = {top:'t', bottom: 'b', left: 'l', right: 'r'};
  let classString = '';
  for(let side in config){
    if(config.hasOwnProperty(side)){
      classString +=`${getPrefix(type)}${getConfigPrefix(side as SpacingSides)}${config[side as SpacingSides]} `;
    }
  }
  return classString;

  function getPrefix(type: SpacingType): string {
    return {
      margin: 'm',
      padding: 'p'
    }[type];
  }
  function getConfigPrefix(side: SpacingSides): string {
    return  {top:'t', bottom: 'b', left: 'l', right: 'r'}[side]
  }
}

export type ElevationLevel = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
export function elevation(_l?: ElevationLevel) {
  if(!_l) {
    return '';
  }
  let lString = '';
  if(_l){
    lString +=`elevation-${_l}`;
  }
  return lString;
}
