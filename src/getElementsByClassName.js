// Returns descendent elements that have the given className without using 
// querySelector or getElementsByClassName

const { JSDOM } = require('jsdom');

let count = 0;

function getSubElementsByClassName(elementChildren, className) {
  let matchingElements = [];
  Array.from(elementChildren).forEach(el => {
    count++;
    if (el.classList.contains(className)) {
      matchingElements.push(el);
    }
    if (el.children) {
      getSubElementsByClassName(el.children, className).forEach(subEl => matchingElements.push(subEl));
    }
  })
  return matchingElements;

}

function getElementsByClassName(element, className) {
  let matchingElements = [];

  if (element.classList.contains(className)) {
    matchingElements.push(element);
  }
  if (element.children) {
    matchingElements = getSubElementsByClassName(element.children, className);
  }
    
  return matchingElements;
}


JSDOM.fromURL("https://developer.mozilla.org/en-US/docs/Web/API/Element").then(dom => {
  const docEl = dom.window.document.documentElement;
  const className = 'external';

  // reference method
  const specElements = docEl.getElementsByClassName(className);
  console.log('Spec:', specElements, specElements.length);

  // your method
  const actualElements = getElementsByClassName(docEl, className);
  console.log('Actual:', actualElements, actualElements.length);
  console.log('TOTAL NUMBER OF ELEMENTS', count);

  if (actualElements.length === specElements.length) {
    console.log('SUCCESS');
  } else {
    console.error('NOT YET');
  }
}).catch(e => console.error('Caught: ', e));
