import Icon from './../Icon'

const clickSideBarContentOnMobile = (event) => {
  event.preventDefault()

  // pointerId = 1 is when user use a mouse
  const triggerElement =
    event.pointerId > 0 ? event.target.offsetParent : event.target

  if (triggerElement.ariaExpanded.toLowerCase() === 'false') {
    el('#sidebar-content-1').classList.toggle('hidden')
    el('#sidebar-btn-1').classList.toggle('rotate-180')
    el('#sidebar-btn-1').ariaLabel = 'Hide content'
    triggerElement.ariaExpanded = 'true'
    return
  }

  el('#sidebar-content-1').classList.toggle('hidden')
  el('#sidebar-btn-1').classList.toggle('rotate-180')
  el('#sidebar-btn-1').ariaLabel = 'Expand content'
  triggerElement.ariaExpanded = 'false'
  return
}

function SideBar() {
  return (
    <section class="lg:w-1/4">
      <h2 class="sticky top-0 border-b-2 border-dotted border-b-slate-200 bg-slate-50 p-5 font-bold">
        Sticky sidebar
        <button
          id="sidebar-btn-1"
          class="absolute right-0 m-0 mr-5 p-0 lg:hidden"
          aria-controls="sidebar-content-1"
          onClick={clickSideBarContentOnMobile}
          aria-label="Expand content"
          aria-expanded="false"
        >
          <Icon icon="fa-solid fa-circle-chevron-down" />
        </button>
      </h2>
      <p id="sidebar-content-1" class="hidden p-5 lg:block">
        This is a mobile responsive sticky bar, hidden by default on mobile.
      </p>
    </section>
  )
}

export default SideBar
