// Returns descendent elements that have the given className without using 
// querySelector or getElementsByClassName

const { JSDOM } = require('jsdom');

function getSubElementsByClassName(element, className){
  let matchingElements = [];
  Array.from(element.children).forEach(el => {
    if (el.classList.contains(className)) {
      matchingElement.push(el); 
    }  
    if (el.children) {
      let subElements = getSubElementsByClassName(el, className);
      subElements.forEach(subEl => matchingElements.push(subEl));
    }
  })
  return matchingElements;
  
}

function getElementsByClassName(doc, className) {
  let matchingElements = [];
  let currentElement = doc;
  let subMatchingElements = [];

  
  while (currentElement.children) {
      if (currentElement.classList.contains(className)) {
        matchingElement.push(currentElement); 
      }  
      for (let i = 0; i < currentElement.children.length; i++) {
        Array.from(currentElement.children).forEach(el => {
            subMatchingElements += getSubElementsByClassName(el, className)
        })    
      }    
      currentElement = currentElement.children[i];
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

  if (actualElements.length === specElements.length) {
    console.log('SUCCESS');
  } else {
    console.error('NOT YET');
  }
}).catch(e => console.error('Caught: ', e));
