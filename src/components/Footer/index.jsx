import Link from '../Link'

const REPO_URL = 'https://github.com/sg208/sg-vite-vanilla-jsx'

// GitHub mark (Octicons mark-github, 16px grid).
const GITHUB_MARK_PATH =
  'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'

// start-dom-jsx only appends HTMLElement children, so a JSX <path> inside
// <svg> is silently dropped. Build the icon with the SVG namespace instead.
const SVG_NS = 'http://www.w3.org/2000/svg'

const GithubMark = () => {
  const icon = document.createElementNS(SVG_NS, 'svg')
  const attributes = {
    'viewBox': '0 0 16 16',
    'width': '16',
    'height': '16',
    'fill': 'currentColor',
    'aria-hidden': 'true',
    'focusable': 'false'
  }
  for (const [name, value] of Object.entries(attributes)) {
    icon.setAttribute(name, value)
  }
  const mark = document.createElementNS(SVG_NS, 'path')
  mark.setAttribute('d', GITHUB_MARK_PATH)
  icon.append(mark)
  return icon
}

const pages = [
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' }
]

const currentPath = () => window.location.pathname.replace(/\/+$/, '') || '/'

const Footer = () => (
  <footer class="site-footer">
    <div class="frame">
      <nav aria-label="Site">
        <ul class="site-footer-links">
          {pages.map((page) => (
            <li>
              <Link
                class="site-footer-link"
                href={page.href}
                isCurrent={currentPath() === page.href}
              >
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div class="site-footer-meta">
        <p>Vite, JSX and no framework.</p>
        <Link
          class="site-footer-repo"
          href={REPO_URL}
          label="Source code on GitHub (opens in a new tab)"
          isExternal
        >
          {GithubMark()}
        </Link>
      </div>
    </div>
  </footer>
)

export default Footer
