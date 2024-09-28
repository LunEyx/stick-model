import { createSlice } from '@reduxjs/toolkit'

export interface ModelState {
  idCounter: number
  shapes: { [key: number]: Shape }
  heads: { [key: number]: Circle }
  dots: { [key: number]: Dot }
  edges: { [key: number]: number[] }
}

const initialState: ModelState = {
  idCounter: 0,
  shapes: {},
  heads: {},
  dots: {},
  edges: {},
}

const ModelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    addHead: (state, action: { payload: Omit<Circle, 'id'> }) => {
      state.idCounter++
      state.heads[state.idCounter] = { id: state.idCounter, ...action.payload }
    },
    moveHead: (state, action: { payload: { id: number; x: number; y: number } }) => {
      state.heads[action.payload.id].x = action.payload.x
      state.heads[action.payload.id].y = action.payload.y
    },
    removeHead: (state, action: { payload: number }) => {
      delete state.heads[action.payload]
    },
    addDot: (state, action: { payload: Omit<Dot, 'id'> }) => {
      state.idCounter++
      state.dots[state.idCounter] = { id: state.idCounter, ...action.payload }
    },
    moveDot: (state, action: { payload: { id: number; x: number; y: number } }) => {
      state.dots[action.payload.id].x = action.payload.x
      state.dots[action.payload.id].y = action.payload.y
    },
    removeDot: (state, action: { payload: number }) => {
      delete state.dots[action.payload]
      if (!state.edges[action.payload]) return

      state.edges[action.payload].forEach((dot) => {
        state.edges[dot] = state.edges[dot].filter((v) => v !== action.payload)
      })
      delete state.edges[action.payload]
    },
    addEdge: (state, action: { payload: { from: number; to: number } }) => {
      // same dot
      if (action.payload.from === action.payload.to) {
        return
      }
      // dot not found
      if (!state.dots[action.payload.from] || !state.dots[action.payload.to]) {
        return
      }
      // create edge array
      if (!state.edges[action.payload.from]) {
        state.edges[action.payload.from] = []
      }
      if (!state.edges[action.payload.to]) {
        state.edges[action.payload.to] = []
      }
      // add edge if not exists
      if (!state.edges[action.payload.from].includes(action.payload.to)) {
        state.edges[action.payload.from].push(action.payload.to)
      }
      if (!state.edges[action.payload.to].includes(action.payload.from)) {
        state.edges[action.payload.to].push(action.payload.from)
      }
    },
    removeEdge: (state, action) => {
      state.edges[action.payload.from] = state.edges[action.payload.from].filter((dot) => dot !== action.payload.to)
      state.edges[action.payload.to] = state.edges[action.payload.to].filter((dot) => dot !== action.payload.from)
    },
    loadData: (state, action: { payload: ModelState }) => {
      state.idCounter = action.payload.idCounter
      state.heads = action.payload.heads
      state.dots = action.payload.dots
      state.edges = action.payload.edges
    },
  },
})

export const { addHead, moveHead, removeHead, addDot, moveDot, removeDot, addEdge, removeEdge, loadData } =
  ModelSlice.actions

export default ModelSlice.reducer
