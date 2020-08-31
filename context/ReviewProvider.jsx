import React, { createContext, useReducer } from 'react';

export const ReviewContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      state.unshift(action.payload);
      return state;
    default:
      return state;
  }
};

export const ReviewProvider = ({ children, reviews }) => {
  const [stateReviews, dispatch] = useReducer(reducer, reviews);
  return (
    <ReviewContext.Provider value={{ stateReviews, dispatch }}>
      {children}
    </ReviewContext.Provider>
  );
};
