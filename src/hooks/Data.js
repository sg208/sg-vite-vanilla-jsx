export const useData = () => {
  // Production builds ship the JSON Server data as a static file (see vite.config.js)
  const fetchURL = import.meta.env.PROD
    ? '/api/items.json'
    : 'http://localhost:8080/api/items/all'

  const allData = ref([])
  const isFetching = ref(true)

  const fetchData = async () => {
    const response = await fetch(fetchURL)
    allData.value = await response.json()
    isFetching.value = false
  }

  const getData = async () => {
    await fetchData()
  }

  return {
    allData,
    getData,
    isFetching
  }
}
