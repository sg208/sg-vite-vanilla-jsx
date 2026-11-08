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

const footerLinks = () => [...document.querySelectorAll('footer nav a')]

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

  it('renders real HTML links in the footer', () => {
    render('/', Index)

    const links = footerLinks()
    expect(links.every((link) => link instanceof HTMLAnchorElement)).toBe(true)
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/accessibility',
      '/privacy',
      '/terms'
    ])
    expect(links.some((link) => link.hasAttribute('aria-current'))).toBe(false)
  })

  it('links the repo once, as a labelled icon in the footer', () => {
    render('/', Index)

    const repoLinks = [...document.querySelectorAll('a[href*="github.com"]')]
    expect(repoLinks).toHaveLength(1)

    const [repoLink] = repoLinks
    expect(repoLink).toBeInstanceOf(HTMLAnchorElement)
    expect(repoLink.closest('footer')).not.toBeNull()
    expect(repoLink.getAttribute('href')).toBe(REPO_URL)
    expect(repoLink.getAttribute('aria-label')).toBe(
      'Source code on GitHub (opens in a new tab)'
    )
    expect(repoLink.getAttribute('target')).toBe('_blank')
    expect(repoLink.getAttribute('rel')).toBe('noopener noreferrer')
    expect(repoLink.textContent.trim()).toBe('')

    const icon = repoLink.querySelector('svg')
    expect(icon).not.toBeNull()
    expect(icon.getAttribute('aria-hidden')).toBe('true')
    expect(icon.getAttribute('focusable')).toBe('false')
    // start-dom-jsx drops SVG children, so the mark must actually be drawn
    const mark = icon.querySelector('path')
    expect(mark?.namespaceURI).toBe('http://www.w3.org/2000/svg')
    expect(mark.getAttribute('d')).toMatch(/^M8 0C/)
  })

  it('names Cloudflare on the privacy page', () => {
    render('/privacy', Privacy)

    const text = document.querySelector('main').textContent
    expect(text).toContain('Cloudflare')
  })
})
