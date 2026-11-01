// Pages
import Index from './pages/Index'
import Accessibility from './pages/Accessibility'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

// Global styles
import './style.css'

// Global styles: FontAwesome
import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free/scss/regular.scss'
import '@fortawesome/fontawesome-free/scss/solid.scss'

// No router: the host serves index.html for every path (wrangler.jsonc),
// so pick the page from the URL. Unknown paths show the form.
const routes = {
  '/': { title: 'Form Picker', page: Index },
  '/accessibility': {
    title: 'Accessibility · Form Picker',
    page: Accessibility
  },
  '/privacy': { title: 'Privacy · Form Picker', page: Privacy },
  '/terms': { title: 'Terms · Form Picker', page: Terms }
}

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const route = routes[path] ?? routes['/']

document.title = route.title
el('#app').append(route.page())
