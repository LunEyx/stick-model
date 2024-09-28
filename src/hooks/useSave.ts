import { loadData } from '../features/model/modelSlice'
import { useAppDispatch, useAppSelector } from './useRedux'

export const useSave = () => {
  const idCounter = useAppSelector((state) => state.model.idCounter)
  const heads = useAppSelector((state) => state.model.heads)
  const vertices = useAppSelector((state) => state.model.vertices)
  const edges = useAppSelector((state) => state.model.edges)
  const dispatch = useAppDispatch()

  const save = () => {
    const data = JSON.stringify({ idCounter, heads, vertices, edges })
    if (data) {
      const a = document.createElement('a')
      a.href = `data:text/json;charset=utf-8,${encodeURIComponent(data)}`
      a.download = 'save.json'
      a.click()
    }
  }

  const load = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.click()
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = async (e) => {
        const json = e.target?.result as string
        const data = JSON.parse(json)
        if (!data) return

        dispatch(loadData(data))
      }
      reader.readAsText(file)
    }
  }

  return [save, load]
}
