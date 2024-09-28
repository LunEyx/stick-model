import { createSlice } from '@reduxjs/toolkit'

export enum Mode {
  IDLE,
  ADD_VERTEX,
  REMOVE_VERTEX,
  ADD_EDGE,
  REMOVE_EDGE,
}

export interface ControlState {
  mode: Mode
  selected: number | null
  multiSelectRect: { start: Vertex; end: Vertex } | null
  multiSelected: { [key: string]: boolean }
}

const initialState: ControlState = {
  mode: Mode.IDLE,
  selected: null,
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
    setMultiSelectRect: (state, action: { payload: { start?: Vertex; end?: Vertex } | null }) => {
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

export const { setMode, setSelected, setMultiSelectRect, setMultiSelected } = ControlSlice.actions

export default ControlSlice.reducer
