import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICurrency} from 'models/ICurrency';
import {currenciesISO} from 'services/db/constants';
import {RootState} from '../../store';

export interface ICurrencyState {
  items: ICurrency[];
  selected: ICurrency | void;
}

const initialState: ICurrencyState = {
  items: currenciesISO,
  selected: {
    alphabetic_code: 'RUB',
    currency: 'Russian Ruble',
    country: 'RUSSIAN FEDERATION',
    numeric_code: 643,
  },
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setSelectedCurrency: (state, action: PayloadAction<ICurrency>) => {
      state.selected = action.payload;
    },
    reset: state => {
      state.selected = initialState.selected;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setSelectedCurrency, reset} = currencySlice.actions;

export const getSelectedCurrency = (state: RootState) =>
  state.currency.selected;

export default currencySlice.reducer;
