import { configureStore } from '@reduxjs/toolkit'
import contentSlice from './rootSlice'

export const store = configureStore({
  reducer: {
    content: contentSlice
  },
})