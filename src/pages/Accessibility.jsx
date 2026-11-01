import LegalPage from '../components/LegalPage'
import Link from '../components/Link'

const ISSUES_URL = 'https://github.com/sg208/sg-vite-vanilla-jsx/issues'
const APG_URL =
  'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/'

const Accessibility = () => (
  <LegalPage title="Accessibility" updated="1 November 2026">
    <h2>Target</h2>
    <p>
      This site aims to meet the Web Content Accessibility Guidelines (WCAG) 2.2
      at level AA.
    </p>

    <h2>What has been done</h2>
    <ul>
      <li>
        The calendar follows the{' '}
        <Link href={APG_URL}>WAI-ARIA date picker dialog example</Link>. It is a
        labelled dialog with a grid of days, and you can move through it with
        the arrow keys, Page Up, Page Down, Home, End and Escape. Closing it
        returns focus to the button that opened it.
      </li>
      <li>
        Dates can also be typed straight into the fields as dd-mm-yyyy. The
        keyboard shortcuts are listed next to the form.
      </li>
      <li>
        Each field has a visible label and hint. Errors are tied to their field,
        marked as invalid, announced to screen readers, and focus moves to the
        first field that needs fixing.
      </li>
      <li>
        Pages use a header, main and footer landmark, one top-level heading and
        a visible focus outline.
      </li>
      <li>
        Text colours are chosen for at least 4.5:1 contrast in both the light
        and dark theme, which follow your system setting.
      </li>
      <li>
        The form's fields and buttons are at least 44 pixels tall, and
        animations are switched off when your system asks for reduced motion.
      </li>
      <li>
        Automated tests check the labels, error messages, announcements and
        focus handling of the form.
      </li>
    </ul>

    <h2>Known limitations</h2>
    <ul>
      <li>
        The tests run in a simulated browser. The site has not been tested with
        every screen reader and browser pairing.
      </li>
      <li>Typed dates must use the dd-mm-yyyy format.</li>
    </ul>

    <h2>Report a problem</h2>
    <p>
      If something does not work for you, open an issue on{' '}
      <Link href={ISSUES_URL}>GitHub</Link> and say what you were trying to do
      and which browser and assistive technology you use.
    </p>
  </LegalPage>
)

export default Accessibility
