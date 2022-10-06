const clickOutsideModal = (event) => {
  event.target.classList.toggle('!bg-transparent')
}

function Modal({}) {
  return (
    <section id="modal-container" aria-hidden="true">
      <div
        class="fixed top-0 left-0 z-10 hidden h-full w-full bg-black opacity-50"
        onClick={clickOutsideModal}
      />
      {/* // TODO Modal content here */}
    </section>
  )
}

export default Modal
