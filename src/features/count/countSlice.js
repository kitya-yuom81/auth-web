import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: 0,
  test: "testing"
}


export const countSlice = createSlice({
    name: "count",
    initialState, 
    reducers: {
        increment: (state)=> {
          state.value += 1;
        }
    }
})


// export action
export const {increment} = countSlice.actions

// export reducer 
export default countSlice.reducer;