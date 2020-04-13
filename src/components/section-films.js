import {createElement} from "../utils";

const createSectionFilmsTemplate = () => {
  return (
    `<section class="films"/>`
  );
};

export default class SectionFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSectionFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
