export const useData = () => {
  // Production builds ship the JSON Server data as a static file (see vite.config.js)
  const fetchURL = import.meta.env.PROD
    ? '/api/items.json'
    : 'http://localhost:8080/api/items/all'
  // A stalled request must end so the page leaves its loading state
  const requestTimeoutMs = 10000

  const allData = ref([])
  const isFetching = ref(true)

  const getData = async () => {
    try {
      const response = await fetch(fetchURL, {
        signal: AbortSignal.timeout(requestTimeoutMs)
      })
      if (!response.ok) {
        throw new Error(`Items request failed: ${response.status}`)
      }
      allData.value = await response.json()
    } finally {
      isFetching.value = false
    }
  }

  return {
    allData,
    getData,
    isFetching
  }
}
