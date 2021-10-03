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
  onChangeTime: (time: string) => void;
  initialDate?: Date;
  initialTime?: Date;
}

const DateTime = ({
  initialDate = new Date(),
  initialTime = new Date(),
  onChangeDate,
  onChangeTime,
}: Prop) => {
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const handleChangeDate = (event: Event, selectedDate: Date | undefined) => {
    console.log('selectedDate', selectedDate);
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    onChangeDate(currentDate?.toISOString().substring(0, 10));
  };

  const handleChangeTime = (event: Event, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setShowTime(Platform.OS === 'ios');
    setTime(currentTime);
    onChangeTime(currentTime?.toISOString().substring(10));
  };

  const onShowDate = useCallback(() => {
    setShowDate(true);
  }, [setShowDate]);

  const onShowTime = useCallback(() => {
    setShowTime(true);
  }, [setShowTime]);

  return (
    <Row>
      {Platform.OS === 'android' && (
        <>
          <Button icon="calendar-month" mode="contained" onPress={onShowDate}>
            {date?.toDateString()}
          </Button>
          <Button
            icon="clock-time-nine-outline"
            mode="contained"
            onPress={onShowTime}>
            {time?.toTimeString()}
          </Button>
        </>
      )}

      {(showDate || Platform.OS === 'ios') && (
        <DateTimePicker
          testID="datePicker"
          style={{flex: 1}}
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'compact' : 'default'}
          onChange={handleChangeDate}
        />
      )}
      {(showTime || Platform.OS === 'ios') && (
        <DateTimePicker
          testID="timePicker"
          style={{flex: 1}}
          value={time}
          mode={'time'}
          display={Platform.OS === 'ios' ? 'compact' : 'default'}
          onChange={handleChangeTime}
        />
      )}
    </Row>
  );
};

export default DateTime;
