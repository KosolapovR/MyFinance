import React, {useCallback, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FormikProps, FormikValues, useFormik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components/native';
import {IconButton, TextInput, Button} from 'react-native-paper';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DateTime from 'components/inputs/DateTime';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchInput from 'components/inputs/SearchInput';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {TransactionsStackParamList} from 'navigators/TransactionsStack';
import {useTransactionCategory} from 'hooks/useTransactionCategory';

interface FormValues {
  category: string;
  sum: string;
  date: string;
  time: string;
}

type Props = NativeStackScreenProps<
  TransactionsStackParamList,
  'SingleTransactionScreen'
>;

const Container = styled.View`
  padding: 14px;
`;

const StyledForm = styled.View`
  height: 180px;
`;

const Row = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

const validationSchema = Yup.object().shape({
  sum: Yup.string().required('Обязательное поле'),
});

function SingleTransactionScreen({navigation}: Props) {
  const {transactionCategories} = useTransactionCategory();

  const {handleSubmit, handleChange, values, errors}: FormikProps<FormValues> =
    useFormik({
      validationSchema: validationSchema,
      initialValues: {
        category: '',
        sum: '',
        date: new Date().toISOString().substring(0, 10),
        time: new Date().toISOString().substring(10),
      },
      onSubmit: (formValues: FormikValues) => {
        onSubmit(formValues);
      },
    });

  const onSubmit = useCallback((formValues: FormikValues) => {
    console.log('formValues', formValues);
  }, []);

  const actionSheetRef = useRef<ActionSheet>(null);
  return (
    <SafeAreaView>
      <Container>
        <StyledForm>
          <DateTime
            onChangeDate={handleChange('date')}
            onChangeTime={handleChange('time')}
          />

          <TouchableOpacity
            onPress={() => {
              actionSheetRef.current?.show();
            }}
            style={styles.btn}>
            <Icon
              name={transactionCategories[0]?.icon.toLowerCase()}
              size={30}
              color="#3E4968"
            />
            <Text style={styles.btnTitle}>
              {transactionCategories[0]?.name}
            </Text>
          </TouchableOpacity>
          <TextInput
            label={errors.sum ? errors.sum : 'Amount'}
            value={values.sum}
            onChangeText={handleChange('sum')}
            error={!!errors.sum}
          />
          <Button onPress={handleSubmit}>Добавить</Button>
        </StyledForm>
      </Container>
      <ActionSheet
        initialOffsetFromBottom={1}
        ref={actionSheetRef}
        statusBarTranslucent
        bounceOnOpen={true}
        drawUnderStatusBar={true}
        bounciness={4}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <View
          style={{
            paddingHorizontal: 12,
          }}>
          <Row>
            <SearchInput onChangeText={() => {}} />
            <IconButton
              icon="plus"
              onPress={async () => {
                try {
                  actionSheetRef.current?.hide();
                  await (function () {
                    return new Promise(resolve => setTimeout(resolve, 0));
                  })();
                  navigation.navigate('SingleCategoryScreen');
                } catch (err) {}
              }}
            />
          </Row>
          <ScrollView
            nestedScrollEnabled
            onMomentumScrollEnd={() => {
              actionSheetRef.current?.handleChildScrollEnd();
            }}
            style={styles.scrollview}>
            <View>
              {transactionCategories &&
                transactionCategories.map(item => (
                  <TouchableOpacity
                    key={item.transaction_category_id}
                    onPress={() => {
                      actionSheetRef.current?.hide();
                    }}
                    style={styles.listItem}>
                    <Text>{item.name}</Text>
                    <Icon
                      name={item.icon.toLowerCase()}
                      size={30}
                      color="#3E4968"
                    />
                  </TouchableOpacity>
                ))}
            </View>

            {/*  Add a Small Footer at Bottom */}
            <View style={styles.footer} />
          </ScrollView>
        </View>
      </ActionSheet>
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
  safeareview: {
    justifyContent: 'center',
    flex: 1,
  },
  btnTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
