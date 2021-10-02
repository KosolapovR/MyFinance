import {action} from '@storybook/addon-actions';
// import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView';
import SearchInput from 'components/inputs/SearchInput';

storiesOf('Input', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('SearchInput', () => (
    <SearchInput onChangeText={action('clicked-text')} />
  ));
