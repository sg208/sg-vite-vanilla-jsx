export const useData = () => {
  // Production builds ship the JSON Server data as a static file (see vite.config.js)
  const fetchURL = import.meta.env.PROD
    ? '/api/items.json'
    : 'http://localhost:8080/api/items/all'

  const allData = ref([])
  const isFetching = ref(true)

  const getData = async () => {
    const response = await fetch(fetchURL)
    if (!response.ok) {
      throw new Error(`Items request failed: ${response.status}`)
    }
    allData.value = await response.json()
    isFetching.value = false
  }

  return {
    allData,
    getData,
    isFetching
  }
}
