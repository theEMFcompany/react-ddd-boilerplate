import React from 'react';
import { Heading, Deck, Text, Screamer } from "../Text";
import { Block } from "components/Block";
import Icon, {IconType} from '../Icon';

interface Props {
  heading: string;
  description: string;
  icon: IconType;
}

const NoResults: React.FC<Props> = ({heading, description, icon}) => {
  return (
    <Block padding={{top: '5'}} className='noResult'>
      <Text align='center'>
        <Icon icon={icon || 'soup'} size='5x' fillColor='primary' fillShade='600'/>
      </Text>
      <Screamer align='center' color='dark-gray' shade='600'>
        {
          heading || 'Oooopsie! '
        }
      </Screamer>
      <Deck align='center'>
        {
          description || 'Your search returned no results... Try searching with different parameters.'
        }
      </Deck>
    </Block>
  )
}

export default NoResults;
