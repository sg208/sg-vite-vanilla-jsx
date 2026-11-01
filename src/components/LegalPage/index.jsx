import Footer from '../Footer'
import Link from '../Link'

// Shared layout for the accessibility, privacy and terms pages.
const LegalPage = ({ title, updated, children }) => (
  <div class="page">
    <header class="site-header" role="banner">
      <div class="frame">
        <Link class="back-link" href="/">
          Back to the form picker
        </Link>
        <h1 class="site-title mt-4">{title}</h1>
        <p class="site-lede">Last updated {updated}.</p>
      </div>
    </header>
    <main class="frame legal-main" role="main">
      <div class="panel legal-prose">{children}</div>
    </main>
    <Footer />
  </div>
)

export default LegalPage
