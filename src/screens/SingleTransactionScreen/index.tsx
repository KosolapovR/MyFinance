import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FormikProps, FormikValues, useFormik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components/native';
import {Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';

import {TransactionsStackParamList} from 'navigators/TransactionsStack';
import {useTransactionCategory} from 'hooks/useTransactionCategory';
import {ITransaction} from 'models/ITransaction';
import DateTimeInput from 'components/inputs/DateTimeInput';

interface FormValues {
  sum: string;
  date: string;
}

type Props = NativeStackScreenProps<
  TransactionsStackParamList,
  'SingleTransactionScreen'
>;

const Container = styled.View`
  padding: 14px;
  height: 100%;
  background-color: white;
`;

const StyledForm = styled.View`
  height: 180px;
`;

const validationSchema = Yup.object().shape({
  sum: Yup.string().required('Обязательное поле'),
});

function SingleTransactionScreen({navigation}: Props) {
  const {selectedTransactionCategory} = useTransactionCategory();

  const {handleSubmit, handleChange, values, errors}: FormikProps<FormValues> =
    useFormik({
      validationSchema: validationSchema,
      initialValues: {
        sum: '',
        date: new Date().toISOString().substring(0, 10),
      },
      onSubmit: (formValues: FormikValues) => {
        onSubmit(formValues as ITransaction);
      },
    });

  const onSubmit = useCallback((formValues: FormikValues) => {
    console.log('formValues', formValues);
  }, []);

  return (
    <SafeAreaView>
      <Container>
        <StyledForm>
          <DateTimeInput
            onChangeDate={() => {}}
            onChangeTime={() => {}}
            date={new Date()}
            hours={13}
            minutes={43}
          />

          <TouchableOpacity
            onPress={() => {
              // actionSheetRef.current?.show();
              navigation.navigate('SelectCategoryScreen');
            }}
            style={styles.btn}>
            {selectedTransactionCategory?.icon && (
              <Icon
                name={selectedTransactionCategory?.icon || ''}
                size={30}
                color="#3E4968"
              />
            )}
            <Text style={styles.btnTitle}>
              {selectedTransactionCategory?.name || 'Выберите категорию'}
            </Text>
          </TouchableOpacity>
          <TextInput
            label={errors.sum ? errors.sum : 'Amount'}
            value={values.sum}
            onChangeText={handleChange('sum')}
            error={!!errors.sum}
          />

          <TouchableOpacity
            onPress={() => {
              // actionSheetRef.current?.show();
              navigation.navigate('SelectCurrencyScreen');
            }}
            style={styles.btn}>
            {selectedTransactionCategory?.icon && (
              <Icon
                name={selectedTransactionCategory?.icon || ''}
                size={30}
                color="#3E4968"
              />
            )}
            <Text style={styles.btnTitle}>
              {selectedTransactionCategory?.name || 'Выберите валюту'}
            </Text>
          </TouchableOpacity>
          <Button onPress={handleSubmit}>Добавить</Button>
        </StyledForm>
      </Container>
    </SafeAreaView>
  );
}

export default SingleTransactionScreen;

const styles = StyleSheet.create({
  footer: {
    height: 100,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  scrollview: {
    width: '100%',
    padding: 12,
  },
  btn: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fe8a71',
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0.3 * 4, height: 0.5 * 4},
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * 4,
  },
  btnTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
