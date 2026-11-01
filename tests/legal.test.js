import { afterEach, describe, expect, it } from 'vitest'
import Index from '../src/pages/Index'
import Accessibility from '../src/pages/Accessibility'
import Privacy from '../src/pages/Privacy'
import Terms from '../src/pages/Terms'

const REPO_URL = 'https://github.com/sg208/sg-vite-vanilla-jsx'

const render = (path, page) => {
  window.history.pushState({}, '', path)
  document.body.innerHTML = '<div id="app"></div>'
  document.querySelector('#app').append(page())
}

const footerLinks = () => [
  ...document.querySelectorAll('footer[role=contentinfo] nav a')
]

describe('legal pages', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it.each([
    ['/accessibility', Accessibility, 'Accessibility'],
    ['/privacy', Privacy, 'Privacy'],
    ['/terms', Terms, 'Terms']
  ])(
    '%s renders one h1, landmarks and a current footer link',
    (path, page, title) => {
      render(path, page)

      const headings = document.querySelectorAll('h1')
      expect(headings).toHaveLength(1)
      expect(headings[0].textContent).toBe(title)
      expect(document.querySelector('header')).not.toBeNull()
      expect(document.querySelector('main')).not.toBeNull()

      const current = document.querySelector('[aria-current=page]')
      expect(current.getAttribute('href')).toBe(path)
    }
  )

  it('renders real HTML links in the footer, including the repo', () => {
    render('/', Index)

    const links = footerLinks()
    expect(links.every((link) => link instanceof HTMLAnchorElement)).toBe(true)
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/accessibility',
      '/privacy',
      '/terms',
      REPO_URL
    ])
    expect(links.at(-1).textContent).toBe('Source on GitHub')
    expect(links.some((link) => link.hasAttribute('aria-current'))).toBe(false)
  })

  it('names Cloudflare on the privacy page', () => {
    render('/privacy', Privacy)

    const text = document.querySelector('main').textContent
    expect(text).toContain('Cloudflare')
  })
})
