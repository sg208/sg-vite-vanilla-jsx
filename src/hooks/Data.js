export const useData = () => {
  const fetchURL = 'http://localhost:8080/api/items/all'

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
