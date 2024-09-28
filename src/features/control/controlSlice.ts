import { createSlice } from '@reduxjs/toolkit'

export enum Mode {
  DRAG = 'DRAG',
  SELECT = 'SELECT',
  DOT = 'DOT',
  CIRCLE = 'CIRCLE',
  CONNECT = 'CONNECT',
  DISCONNECT = 'DISCONNECT',
  ZOOM = 'ZOOM',
  DELETE = 'DELETE',
}

export interface ControlState {
  mode: Mode
  selected: number | null
  color: string
  multiSelectRect: { start: Point; end: Point } | null
  multiSelected: { [key: string]: boolean }
}

const initialState: ControlState = {
  mode: Mode.DRAG,
  selected: null,
  color: '#0000FF',
  multiSelectRect: null,
  multiSelected: {},
}

const ControlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setMode: (state, action: { payload: Mode }) => {
      state.mode = action.payload
      state.selected = null
    },
    setSelected: (state, action: { payload: number | null }) => {
      state.selected = action.payload
    },
    setColor: (state, action: { payload: string }) => {
      state.color = action.payload
    },
    setMultiSelectRect: (state, action: { payload: { start?: Point; end?: Point } | null }) => {
      if (!action.payload) {
        state.multiSelectRect = null
        return
      }

      if (!state.multiSelectRect && action.payload.start && action.payload.end) {
        state.multiSelectRect = { start: action.payload.start, end: action.payload.end }
        return
      }
      state.multiSelectRect = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
        ...state.multiSelectRect,
        ...action.payload,
      }
    },
    setMultiSelected: (state, action: { payload: { [key: string]: boolean } }) => {
      state.multiSelected = action.payload
    },
  },
})

export const { setMode, setSelected, setColor, setMultiSelectRect, setMultiSelected } = ControlSlice.actions

export default ControlSlice.reducer
