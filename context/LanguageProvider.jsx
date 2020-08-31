/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { createContext, useReducer, useEffect } from 'react';
import AppLocale from 'translations/index';

export const LanguageContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SWITCH':
      // console.log('state changed');
      return state = AppLocale[`${localStorage.getItem('lang') || 'en'}`];
    default:
      return state;
  }
};

export const LanguageProvider = ({ children, language }) => {
  // console.log('Before reduce');
  // console.log(language);
  const [state, dispatch] = useReducer(reducer, language);
  // Initial State bị thay đổi của useReducer
  // Để update được state trả về của useReducer để useContext
  // Ta phải tự update state
  // Tự update khi state thay đổi bằng useEffect
  // Truyền dependency là state -> return lại state là giá trị trả về
  // của hàm reducer ở trên khi state của useReducer bị thay đổi
  // Update lại state của useReducer và truyền vào provider
  const init = () => {
    dispatch({
      type: 'SWITCH',
    });
  };
  // console.log('Before effect');
  // console.log(state);
  useEffect(() => {
    init();
  }, [state]);
  // console.log('After reduce');
  // console.log(state);
  return (
    <LanguageContext.Provider value={{ state, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};
