import React from 'react';
import {useHistory} from 'react-router-dom'
import Button from 'components/Button';
import MainSite from 'templates/MainSite';
import Hero from 'components/Hero';
import {Text} from 'components/Text';
import {Space} from 'components/Space';
import {Wrap} from 'components/Wrap';
import {URLS} from 'resources/urls';
import {home as L} from 'resources/locales';

interface Props {}

export const Home = (props: Props) => {
  const history = useHistory();
  return (
    <MainSite className='home'>
      <Hero expand fillColor='light-gray' fillShade='100'>
        <Text size='10' shade='700' align='center' leading='2' weight='bold'>
          {L.hero.heading[0]}<br/>{L.hero.heading[1]}
        </Text>
        <Wrap width='medium'>
          <Text align='center' leading='3' weight='regular' width='small' center>
            {L.hero.body}
          </Text>
          <Text align='center'>
            <Button
              size='large'
              onClick={() => {history.push(URLS.NEW_GENERATOR)}}>
              {
                L.hero.CTA
              }
            </Button>
          </Text>
        </Wrap>
      </Hero>
    </MainSite>
  )
}
