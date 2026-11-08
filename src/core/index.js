const el = (selector, shouldReturnAll = false) => {
  const elements = document.querySelectorAll(selector)

  if (shouldReturnAll || elements.length > 1) {
    return elements
  }

  return elements[0]
}

// Reactive object, best used with hooks
const ref = (object) => {
  return { value: object }
}

export { el, ref }
