import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView';
import SearchInput from 'components/inputs/SearchInput';
import DateInput from 'components/inputs/DateInput';
import TimeInput from 'components/inputs/TimeInput';
import DateTimeInput from 'components/inputs/DateTimeInput';
import {View} from 'react-native';

storiesOf('Input', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('SearchInput', () => (
    <View style={{flexBasis: 48}}>
      <SearchInput onChangeText={action('clicked-text')} />
    </View>
  ))
  .add('DateInput', () => (
    <DateInput date={new Date()} onChange={action('selected Date')} />
  ))
  .add('TimeInput', () => (
    <TimeInput hours={3} minutes={54} onChange={action('change Time')} />
  ))
  .add('DateTimeInput', () => (
    <DateTimeInput
      hours={3}
      minutes={54}
      onChangeTime={action('change Time')}
      date={new Date()}
      onChangeDate={action('selected Date')}
    />
  ));
