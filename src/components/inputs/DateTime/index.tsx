import React, {useCallback, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import {Button} from 'react-native-paper';
import {Platform} from 'react-native';

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 16px;
`;

interface Prop {
  onChangeDate: (date: string) => void;
  initialDate?: Date;
}

const DateTime = ({initialDate = new Date(), onChangeDate}: Prop) => {
  const [date, setDate] = useState(initialDate);
  const [showDate, setShowDate] = useState(false);

  const handleChangeDate = (event: Event, selectedDate: Date | undefined) => {
    console.log('selectedDate', selectedDate?.toISOString());
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    onChangeDate(currentDate?.toISOString());
  };

  const onShowDate = useCallback(() => {
    setShowDate(true);
  }, [setShowDate]);

  return (
    <Row>
      {Platform.OS === 'android' && (
        <>
          <Button icon="calendar-month" mode="contained" onPress={onShowDate}>
            {date?.toDateString()}
          </Button>
        </>
      )}

      {(showDate || Platform.OS === 'ios') && (
        <DateTimePicker
          testID="datePicker"
          style={{flex: 1}}
          value={date}
          mode={'datetime'}
          display={Platform.OS === 'ios' ? 'compact' : 'default'}
          onChange={handleChangeDate}
        />
      )}
    </Row>
  );
};

export default DateTime;
