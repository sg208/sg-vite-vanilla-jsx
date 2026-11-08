// components
import Content from '../Content'
import SideBar from '../SideBar'

// Sidebar first in the source so its sticky heading leads on phones;
// from lg up it moves to the right of the form.
const Main = () => (
  <main class="frame main-grid">
    <SideBar />
    <Content />
  </main>
)

export default Main
