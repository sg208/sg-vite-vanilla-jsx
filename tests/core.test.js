import { describe, expect, it } from 'vitest'
import { el, ref } from '../src/core'

describe('core helpers', () => {
  it('el returns one element, or a list when asked or when several match', () => {
    document.body.innerHTML =
      '<p class="one">a</p><i class="two">b</i><i class="two">c</i>'

    expect(el('.one').textContent).toBe('a')
    expect(el('.one', true)).toHaveLength(1)
    expect(el('.two')).toHaveLength(2)
  })

  it('ref wraps a value', () => {
    const counter = ref(1)
    counter.value += 1

    expect(counter.value).toBe(2)
  })
})
