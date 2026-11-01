// start-dom-jsx lists `a` as an SVG tag, so <a> in JSX becomes an SVG
// element that never renders as a link. Build real HTML anchors here.
const Link = ({ href, class: className, isCurrent = false, children }) => {
  const anchor = document.createElement('a')
  anchor.href = href
  if (className) {
    anchor.className = className
  }
  if (isCurrent) {
    anchor.setAttribute('aria-current', 'page')
  }
  anchor.append(...children.flat().filter((child) => child || child === 0))
  return anchor
}

export default Link
