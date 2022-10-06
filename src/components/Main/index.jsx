// components
import Content from '../Content'
import SideBar from '../SideBar'

function Main() {
  return (
    <main
      class="mx-auto flex w-full max-w-5xl flex-col lg:flex-row-reverse lg:justify-evenly"
      role="main"
    >
      <SideBar />
      <Content />
    </main>
  )
}

export default Main
