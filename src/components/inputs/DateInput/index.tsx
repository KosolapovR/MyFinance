import * as React from 'react';
import {Button} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {theme} from 'theme';

interface Props {
  onChange: (dateIso: string) => void;
  date: Date;
}
export default function DateInput({onChange, date}: Props) {
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      onChange(params.date.toISOString());
    },
    [setOpen, onChange],
  );

  return (
    <>
      <Button
        color={theme.colors.gray}
        icon="calendar"
        mode="outlined"
        onPress={() => setOpen(true)}>
        {date?.toLocaleDateString()}
      </Button>
      <DatePickerModal
        // locale={'en'} optional, default: automatic
        locale={'ru'}
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        label="Выберите дату"
        saveLabel="Сохранить"
        // validRange={{
        //   startDate: new DateInput(2021, 1, 2),  // optional
        //   endDate: new DateInput(), // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
      />
    </>
  );
}
