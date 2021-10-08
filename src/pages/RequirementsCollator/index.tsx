import React from 'react';
import {useHistory} from 'react-router-dom'
import Layout from 'templates/MainSite';
import {Wrap} from 'components/Wrap';
import {URLS} from 'resources/urls';
import {requirementsCollator as L} from 'resources/locales';
import {CreateNew} from 'modules/RequirementsCollator';

interface Props {}

export const NewGenerator = (props: Props) => {
  const history = useHistory();
  return (
    <Layout className='new-generator'>
      <Wrap>
        <CreateNew/>
      </Wrap>
    </Layout>
  )
}
