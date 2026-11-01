import LegalPage from '../components/LegalPage'
import Link from '../components/Link'

const ISSUES_URL = 'https://github.com/sg208/sg-vite-vanilla-jsx/issues'

const Privacy = () => (
  <LegalPage title="Privacy" updated="1 November 2026">
    <h2>What this site collects</h2>
    <p>
      Nothing. There are no accounts, no analytics, no tracking scripts and no
      cookies. The site does not use local storage either. The dates you type
      stay in your browser and are not sent anywhere.
    </p>

    <h2>Who your browser talks to</h2>
    <p>Loading a page makes requests to these places:</p>
    <ul>
      <li>
        sg-vite-vanilla-jsx.engg.app itself, for the page, its scripts, styles
        and icon fonts.
      </li>
      <li>
        Google Fonts (fonts.googleapis.com and fonts.gstatic.com), for the Geist
        typeface. Google receives your IP address and browser details with that
        request. See the{' '}
        <Link href="https://policies.google.com/privacy">
          Google privacy policy
        </Link>
        .
      </li>
    </ul>
    <p>
      The FontAwesome icons are bundled with the site, so they do not come from
      a third party.
    </p>

    <h2>Hosting</h2>
    <p>
      Cloudflare serves the site from a Cloudflare Worker. As the host,
      Cloudflare may process standard request data such as your IP address, user
      agent and the page you asked for, and may keep it in logs. See the{' '}
      <Link href="https://www.cloudflare.com/privacypolicy/">
        Cloudflare privacy policy
      </Link>
      .
    </p>

    <h2>Contact</h2>
    <p>
      Questions about this page go to the{' '}
      <Link href={ISSUES_URL}>GitHub issues for this project</Link>.
    </p>
  </LegalPage>
)

export default Privacy
