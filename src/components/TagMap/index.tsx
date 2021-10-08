import React, {Component} from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TextField } from 'components/Form';
import { Icon } from 'components/Icon';

interface Props {
  tags?: string[];
  max?: number;
  className?: string;
  onAddTag?(value: string): void;
  onDeleteTag?(index: number, value: string): void;
  label?: string;
}

class TagMap extends Component<Props>{

  state: {
    inputValue: string;
    tagArray: string[];
  }

  constructor(props: Props){
    super(props);
    this.state = {
      inputValue: '',
      tagArray: []
    };
    this._handleAddTag = this._handleAddTag.bind(this);
    this._handleRemoveTag = this._handleRemoveTag.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
  }
  _handleTextChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({
      inputValue: event.target.value
    });
  }
  _handleAddTag = ()=>{
    if(!this.state.inputValue){
      return;
    }

    if(this.props.onAddTag){
      this.props.onAddTag(this.state.inputValue);
      this.setState({
        inputValue: '',
      })
    }else{
      const newArray = this.state.tagArray.concat([this.state.inputValue]);
      this.setState(()=>{
        return {
          tagArray: newArray,
          inputValue: ''
        }
      })
    }
  }
  _handleRemoveTag = (tagIndex: number, tagValue: string)=>{
    if(this.props.onDeleteTag){
      this.props.onDeleteTag(tagIndex, tagValue);
    }else{
      const newArray = this.state.tagArray.slice(0, tagIndex).concat(this.state.tagArray.slice(tagIndex+1));
      this.setState(()=>({
        tagArray: newArray,
        inputValue: ''
      }))
    }
  }

  render(){
    const { className, tags = this.state.tagArray, max } = this.props;

    const tagField = tags.map((tag, index)=>(
      <CSSTransition classNames='fadeSlideDown' key={`${tag}`} timeout={{enter: 500, exit: 300}}>
        <span className={`tagMap-item ${max && index > max - 1 ? 'tagMap-item--outOfRange' : ''}`}>
          <span className='removeTagButton'>
            <Icon icon='close' fillColor='light-gray' fillShade='100' onClick={() => this._handleRemoveTag(index, tag)}/>
          </span>
          <span className='tagLabel'>{tag}</span>
        </span>
      </CSSTransition>
    ));

    return(
        <form onSubmit={e => {e.preventDefault(); this._handleAddTag()}} className={`${className} tagMap`}>
          <div className='tagField'>
              <TextField
                label={this.props.label || 'Type tag name'}
                onChange={this._handleTextChange}
                name='tag'
                value={this.state.inputValue}/>
          </div>

          <TransitionGroup className='tagMap-itemWrap'>
            {tagField}
          </TransitionGroup>
        </form>
    );
  }
}

export default TagMap;
