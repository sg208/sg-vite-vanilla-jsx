// start-dom-jsx lists `a` as an SVG tag, so <a> in JSX becomes an SVG
// element that never renders as a link. Build real HTML anchors here.
const Link = ({
  href,
  class: className,
  label,
  isCurrent = false,
  isExternal = false,
  children
}) => {
  const anchor = document.createElement('a')
  anchor.href = href
  if (className) {
    anchor.className = className
  }
  if (label) {
    anchor.setAttribute('aria-label', label)
  }
  if (isCurrent) {
    anchor.setAttribute('aria-current', 'page')
  }
  if (isExternal) {
    anchor.target = '_blank'
    anchor.rel = 'noopener noreferrer'
  }
  anchor.append(...children.flat().filter((child) => child || child === 0))
  return anchor
}

export default Link
