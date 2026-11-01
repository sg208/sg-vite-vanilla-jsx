import './Footer.module.css'
import Link from '../Link'

const REPO_URL = 'https://github.com/sg208/sg-vite-vanilla-jsx'

const pages = [
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' }
]

const currentPath = () => window.location.pathname.replace(/\/+$/, '') || '/'

const Footer = () => (
  <footer class="site-footer" role="contentinfo">
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
          <li>
            <Link class="site-footer-link" href={REPO_URL}>
              Source on GitHub
            </Link>
          </li>
        </ul>
      </nav>
      <p class="site-footer-meta">Vite, JSX and no framework.</p>
    </div>
  </footer>
)

export default Footer
