import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: [],
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    change:(state, action) =>{
        state.val = action.payload;
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    returnValue:(state) =>{
        state.value = state.value;
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, returnValue, change } = counterSlice.actions

export default counterSlice.reducer