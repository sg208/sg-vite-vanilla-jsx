import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

const Index = () => (
  <div class="page">
    <div id="global-container">
      <Header />
      <Main />
      <Footer />
    </div>
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
  </div>
)

export default Index
