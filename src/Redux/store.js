import { configureStore } from '@reduxjs/toolkit'
import boardsSlice from './boardsSlice'

export const store = configureStore({
  reducer: {
    boards: boardsSlice
  },
})