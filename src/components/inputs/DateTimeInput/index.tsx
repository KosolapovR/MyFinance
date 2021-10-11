import * as React from 'react';
import styled from 'styled-components/native';
import DateInput from 'components/inputs/DateInput';
import TimeInput from 'components/inputs/TimeInput';

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 12px;
`;

interface Props {
  onChangeDate: (dateIso: string) => void;
  onChangeTime: ({hours, minutes}: {hours: number; minutes: number}) => void;
  date: Date;
  hours: number;
  minutes: number;
}
export default function DateTimeInput({
  onChangeDate,
  onChangeTime,
  date,
  hours,
  minutes,
}: Props) {
  return (
    <Row>
      <DateInput onChange={onChangeDate} date={date} />
      <TimeInput hours={hours} minutes={minutes} onChange={onChangeTime} />
    </Row>
  );
}
