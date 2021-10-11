import * as React from 'react';
import {Button} from 'react-native-paper';
import {TimePickerModal} from 'react-native-paper-dates';
import {theme} from 'theme/index';

interface Props {
  hours: number;
  minutes: number;
  onChange: ({hours, minutes}: {hours: number; minutes: number}) => void;
}
export default function TimeInput({hours, minutes, onChange}: Props) {
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({hours, minutes}) => {
      setVisible(false);
      onChange({hours, minutes});
    },
    [setVisible, onChange],
  );

  return (
    <>
      <Button
        icon="clock"
        color={theme.colors.gray}
        mode="outlined"
        onPress={() => setVisible(true)}>
        {hours} : {minutes}
      </Button>
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={hours} // default: current hours
        minutes={minutes} // default: current minutes
        label="Выберите время" // optional, default 'Select time'
        cancelLabel="Отмена" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale={'ru'} // optional, default is automically detected by your system
      />
    </>
  );
}
