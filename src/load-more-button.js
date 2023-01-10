export default class LoadMoreButton {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }
}

getRefs(selector) {
    const refs = {}
    refs.button = document
}
