import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FormikProps, FormikValues, useFormik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components/native';
import {Button, TextInput} from 'react-native-paper';
import DateTime from 'components/inputs/DateTime';

interface FormValues {
  category: string;
  sum: string;
  date: string;
  time: string;
}

const Container = styled.View`
  padding: 14px;
`;

const StyledForm = styled.View`
  height: 180px;
`;

const validationSchema = Yup.object().shape({
  sum: Yup.string().required('Обязательное поле'),
});

function SingleTransactionScreen() {
  const {handleSubmit, handleChange, values, errors}: FormikProps<FormValues> =
    useFormik({
      validationSchema: validationSchema,
      initialValues: {category: '', sum: '', date: '', time: ''},
      onSubmit: (formValues: FormikValues) => {
        onSubmit(formValues);
      },
    });

  const onSubmit = useCallback((formValues: FormikValues) => {
    console.log('formValues', formValues);
  }, []);

  return (
    <SafeAreaView>
      <Container>
        <StyledForm>
          <DateTime
            onChangeDate={handleChange('date')}
            onChangeTime={handleChange('time')}
          />
          <TextInput
            label={errors.sum ? errors.sum : 'Amount'}
            value={values.sum}
            onChangeText={handleChange('sum')}
            error={!!errors.sum}
          />
          <Button onPress={handleSubmit}>Добавить</Button>
        </StyledForm>
      </Container>
    </SafeAreaView>
  );
}

export default SingleTransactionScreen;