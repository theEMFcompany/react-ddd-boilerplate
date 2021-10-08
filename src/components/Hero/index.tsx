import React, { Component } from 'react';
import * as STYLE from 'resources/style';
import {
  color,
  Color,
  ColorShades } from 'utils/style'

interface Props {
  images?: string[];
  expand?: boolean;
  fillColor?: Color;
  fillShade?: ColorShades;
  background?: BackgroundStyle;
}

interface State {
  activeImage: number;
}

export enum BackgroundStyle {
  SOLID = 'solid',
  GRADIENT = 'gradient'
}

export default class Hero extends Component<Props, State> {
  private slider: number | null;
  constructor(props: Props) {
    super(props);
    this.slider = null;
    this.state = {
      activeImage: 0
    }
  }
  componentDidMount(){
    const imageCount = this.props.images ? this.props.images.length : 0;
    const setState = this.setState;

    this.slider = window.requestAnimationFrame(()=>{
      this.setState(curState=>({
        activeImage: curState.activeImage < imageCount-1 ? curState.activeImage+1 : 0
      }))
    })
  }
  componentWillUnmount(){
    this.slider && cancelAnimationFrame(this.slider)
  }
  render() {
    const imageStyle = `${this.props.images && this.props.images.length > 0 ?'hero--image' :''}`;
    const backgroundStyle = `${this.props.background === BackgroundStyle.GRADIENT ?'hero--gradient' :'hero--solid'}`;
    return (
      <div  className={`hero ${imageStyle} ${this.props.fillColor ? color(this.props.fillColor, this.props.fillShade) : backgroundStyle} ${this.props.expand ? 'hero--expanded' : ''}`}
            style={this.props.images && this.props.images.length > 0 ? {backgroundImage: `url(${this.props.images[this.state.activeImage]})`,...STYLE.imageBackground } : {}}>
        {
          this.props.children && (
            <div className='hero__contentArea'>
              {this.props.children}
            </div>
          )
        }
      </div>
    );
  }
}
