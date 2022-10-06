// Pages, to load initial page
import Index from './pages/Index'

// Global styles
import './style.css'

// Global styles: FontAwesome
import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free/scss/brands.scss'
import '@fortawesome/fontawesome-free/scss/regular.scss'
import '@fortawesome/fontawesome-free/scss/solid.scss'
import '@fortawesome/fontawesome-free/scss/v4-shims.scss'

// IIFE
;(function () {
  const container = el(`#app`)
  container.append(Index())
})()
