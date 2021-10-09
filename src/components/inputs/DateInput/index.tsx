import * as React from 'react';
import {Button} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';

export default function DateInput() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
      console.log(params.date);
    },
    [setOpen, setDate],
  );

  return (
    <>
      <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        Pick single date
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
