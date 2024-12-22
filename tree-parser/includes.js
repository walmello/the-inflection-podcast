/* @flow */

/**
 * Helper function to replace Babel-Polyfill's Array.includes function
 * @param {Object} list Array list of any type
 * @param {Object} elem Object to look for inside the array list
 * @return {Boolean}
 */
export default (list, elem) =>
  list.indexOf(elem) !== -1;