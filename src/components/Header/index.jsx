function Header({ text }) {
  return (
    <header class="bg-lime-500 p-10 text-center text-white">
      <h1>Hello {text || 'there'}, welcome!</h1>
    </header>
  )
}

export default Header
