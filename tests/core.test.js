import { describe, expect, it } from 'vitest'
import { classList, el, html, ref } from '../src/core'

describe('core helpers', () => {
  it('el returns one element, or a list when asked or when several match', () => {
    document.body.innerHTML =
      '<p class="one">a</p><i class="two">b</i><i class="two">c</i>'

    expect(el('.one').textContent).toBe('a')
    expect(el('.one', true)).toHaveLength(1)
    expect(el('.two')).toHaveLength(2)
  })

  it('classList adds, removes and toggles classes', () => {
    const targetElement = document.createElement('div')

    classList({ targetElement, classes: ['a', 'b'] })
    expect([...targetElement.classList]).toEqual(['a', 'b'])

    classList({ targetElement, classes: ['a'], method: 'remove' })
    classList({ targetElement, classes: ['c'], method: 'toggle' })
    expect([...targetElement.classList]).toEqual(['b', 'c'])
  })

  it('html turns a string into its first element', () => {
    const node = html('  <span id="x">hi</span>  ')

    expect(node.tagName).toBe('SPAN')
    expect(node.id).toBe('x')
  })

  it('ref wraps a value', () => {
    const counter = ref(1)
    counter.value += 1

    expect(counter.value).toBe(2)
  })
})
