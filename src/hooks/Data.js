export function useData() {
  const fetchURL = 'http://localhost:8080/api/items/all'

  const allData = ref([])
  const isFetching = ref(true)

  const fetchData = async () => {
    await fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        allData.value = data
        isFetching.value = false
      })
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
