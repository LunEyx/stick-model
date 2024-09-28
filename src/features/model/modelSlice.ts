import { createSlice } from '@reduxjs/toolkit'

export interface ModelState {
  idCounter: number
  heads: { [key: number]: Vertex }
  vertices: { [key: number]: Vertex }
  edges: { [key: number]: number[] }
}

const initialState: ModelState = {
  idCounter: 0,
  heads: {},
  vertices: {},
  edges: {},
}

const ModelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    addHead: (state, action: { payload: Vertex }) => {
      state.heads[state.idCounter++] = action.payload
    },
    moveHead: (state, action: { payload: { id: number; x: number; y: number } }) => {
      state.heads[action.payload.id].x = action.payload.x
      state.heads[action.payload.id].y = action.payload.y
    },
    removeHead: (state, action: { payload: number }) => {
      delete state.heads[action.payload]
    },
    addVertex: (state, action: { payload: Vertex }) => {
      state.vertices[state.idCounter++] = action.payload
    },
    moveVertex: (state, action: { payload: { id: number; x: number; y: number } }) => {
      state.vertices[action.payload.id].x = action.payload.x
      state.vertices[action.payload.id].y = action.payload.y
    },
    removeVertex: (state, action: { payload: number }) => {
      delete state.vertices[action.payload]
      if (!state.edges[action.payload]) return

      state.edges[action.payload].forEach((vertex) => {
        state.edges[vertex] = state.edges[vertex].filter((v) => v !== action.payload)
      })
      delete state.edges[action.payload]
    },
    addEdge: (state, action: { payload: { from: number; to: number } }) => {
      // same vertex
      if (action.payload.from === action.payload.to) {
        return
      }
      // vertex not found
      if (!state.vertices[action.payload.from] || !state.vertices[action.payload.to]) {
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
      state.edges[action.payload.from] = state.edges[action.payload.from].filter(
        (vertex) => vertex !== action.payload.to
      )
      state.edges[action.payload.to] = state.edges[action.payload.to].filter((vertex) => vertex !== action.payload.from)
    },
    loadData: (state, action: { payload: ModelState }) => {
      state.idCounter = action.payload.idCounter
      state.heads = action.payload.heads
      state.vertices = action.payload.vertices
      state.edges = action.payload.edges
    },
  },
})

export const { addHead, moveHead, removeHead, addVertex, moveVertex, removeVertex, addEdge, removeEdge, loadData } =
  ModelSlice.actions

export default ModelSlice.reducer
