const handleOutsideModal = (event) => {
  event.target.classList.toggle('!bg-transparent')
}

const Modal = () => (
  <section id="modal-container" aria-hidden="true">
    <div
      class="fixed top-0 left-0 z-10 hidden h-full w-full bg-black opacity-50"
      onClick={handleOutsideModal}
    />
    {/* Modal content goes here */}
  </section>
)

export default Modal
