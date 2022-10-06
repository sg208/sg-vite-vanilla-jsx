import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import Modal from '../components/Modal'

function Index() {
  return (
    <section class="mx-auto w-full">
      <section id="global-container">
        <Header />
        <Main />
        <Footer />
      </section>
      <Modal />
      <div
        id="arialive-assertive"
        aria-atomic="true"
        aria-live="assertive"
        class="sr-only"
      />
      <div
        id="arialive-polite"
        aria-atomic="true"
        aria-live="polite"
        class="sr-only"
      />
    </section>
  )
}

export default Index
