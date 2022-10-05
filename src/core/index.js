const el = (element, returnAllEl = false) => {
  const elements = document.querySelectorAll(element)

  if (returnAllEl || elements.length > 1) {
    return elements
  }

  return elements[0]
}

const classList = ({ targetElement, classes = [], method = 'add' }) => {
  if (method === 'add' || method === 'remove' || method === 'toggle') {
    return classes.map((cls) => {
      targetElement.classList[method](cls)
    })
  }

  return classes.map((cls) => {
    targetElement.classList.add(cls)
  })
}

const html = (html) => {
  const template = document.createElement('template')
  template.innerHTML = html.trim()

  return template.content.firstElementChild
}

const nextTick = (callback) => {
  // initial version
  setTimeout(() => {
    callback()
  }, 100)
}

const scrollBottom = (element, isBlockEnd = false) => {
  element.scrollIntoView({
    behavior: 'smooth',
    block: isBlockEnd ? 'end' : 'start'
  })
}

// Reactive object, best used with hooks
const ref = (object) => {
  return { value: object }
}

const jsx = (target, component) => {
  return document.querySelector(target).replaceWith(component)
}

export { el, classList, html, nextTick, scrollBottom, ref, jsx }
