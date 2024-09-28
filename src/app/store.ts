import { configureStore } from '@reduxjs/toolkit'
import modelReducer from '../features/model/modelSlice'
import controlReducer from '../features/control/controlSlice'

export const store = configureStore({
  reducer: {
    model: modelReducer,
    control: controlReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
