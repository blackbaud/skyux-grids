  // Polyfill for Element.closest().
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
  // Returns the closest ancestor of the current element (or the current element itself) which
  // matches the selectors given in parameter. If there isn't such an ancestor, it returns null.
  export function getClosest(el: any, selector: string): Element {
    if (!document.documentElement.contains(el)) {
      return undefined;
    }
    do {
      if (this.elementMatches(el, selector)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== undefined && el.nodeType === 1);

    return undefined;
  }

  // Polyfill for Element.matches().
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
  // Returns true if the element would be selected by the specified selector string.
  export function elementMatches(el: any, selector: string): boolean {
    let matches = document.querySelectorAll(selector);
    let i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {}
    return i > -1;
  }
