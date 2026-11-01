import LegalPage from '../components/LegalPage'
import Link from '../components/Link'

const REPO_URL = 'https://github.com/sg208/sg-vite-vanilla-jsx'

const Terms = () => (
  <LegalPage title="Terms" updated="1 November 2026">
    <h2>What this is</h2>
    <p>
      Form picker is a demo and portfolio project: a date range form with a
      calendar written in plain JavaScript. It is not a product or a service,
      and the item search is a placeholder with no real data behind it.
    </p>

    <h2>No warranty</h2>
    <p>
      The site and its content are provided as is, without warranty of any kind.
      Use it at your own risk.
    </p>

    <h2>The code</h2>
    <p>
      The source is on <Link href={REPO_URL}>GitHub</Link> under the MIT
      license. The LICENSE file in the repository has the full text.
    </p>

    <h2>Third-party content</h2>
    <p>
      The Geist typeface, the FontAwesome icons and the other libraries used
      here belong to their owners and come under their own licenses.
    </p>

    <h2>Privacy</h2>
    <p>
      The <Link href="/privacy">privacy page</Link> explains what happens to
      your data when you visit.
    </p>
  </LegalPage>
)

export default Terms
