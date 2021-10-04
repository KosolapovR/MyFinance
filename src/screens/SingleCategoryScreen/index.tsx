import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {TransactionsStackParamList} from 'navigators/TransactionsStack';
import {useTransactionCategory} from 'hooks';
import {FormikProps, useFormik} from 'formik';
import * as Yup from 'yup';
import {ITransactionCategory} from 'models/index';
import {Button, TextInput} from 'react-native-paper';

type Props = NativeStackScreenProps<
  TransactionsStackParamList,
  'SingleCategoryScreen'
>;

interface FormValues {
  name: string;
  icon: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  icon: Yup.string().required('Обязательное поле'),
});

function SingleCategoryScreen({
  route: {
    params: {categoryId},
  },
}: Props) {
  const {createTransactionCategory} = useTransactionCategory();
  const {handleSubmit, handleChange, values, errors}: FormikProps<FormValues> =
    useFormik({
      validationSchema: validationSchema,
      initialValues: {
        name: '',
        icon: '',
      },
      onSubmit: (formValues: ITransactionCategory) => {
        createTransactionCategory(formValues);
      },
    });

  return categoryId ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>EditCategory</Text>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
      }}>
      <TextInput
        label={errors.name ? errors.name : 'Name'}
        value={values.name}
        onChangeText={handleChange('name')}
        error={!!errors.name}
      />
      <TextInput
        label={errors.icon ? errors.name : 'Icon'}
        value={values.icon}
        onChangeText={handleChange('icon')}
        error={!!errors.icon}
      />
      <Button onPress={handleSubmit}>Добавить</Button>
    </View>
  );
}

export default SingleCategoryScreen;
