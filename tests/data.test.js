import { afterEach, describe, expect, it, vi } from 'vitest'

describe('useData', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('stores the items when the request succeeds', async () => {
    const items = [{ id: 1, name: 'Item' }]
    const fetchItems = vi.fn(async () => ({
      ok: true,
      json: async () => items
    }))
    vi.stubGlobal('fetch', fetchItems)
    const { allData, getData, isFetching } = useData()

    await getData()

    expect(allData.value).toEqual(items)
    expect(isFetching.value).toBe(false)
  })

  it('rejects when the server answers with an error status', async () => {
    const failedResponse = { ok: false, status: 500, json: async () => ({}) }
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => failedResponse)
    )
    const { allData, getData } = useData()

    await expect(getData()).rejects.toThrow('Items request failed: 500')
    expect(allData.value).toEqual([])
  })
})
