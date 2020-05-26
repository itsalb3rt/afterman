/* eslint-disable no-unused-vars */

/**
 * Make a collapsible table of content.
 *
 * this function inject to final documentation
 * @param {String} idEl
 */
const toggleContent = (idEl, iconContainer) => {
  const content = document.querySelector('#' + idEl)

  if (content.classList.contains('hide')) {
    iconContainer.textContent = '▼'
    content.classList.add('show')
    content.classList.remove('hide')
  } else if (content.classList.contains('show')) {
    iconContainer.textContent = '►'
    content.classList.add('hide')
    content.classList.remove('show')
  } else {
    content.classList.add('show')
  }
}

export { toggleContent }
