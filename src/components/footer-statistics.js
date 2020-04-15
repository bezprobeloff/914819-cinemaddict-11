import {createElement} from "../utils";

const createFooterStatistics = (sumFilms) => {
  return (
    `
      <p>${sumFilms} movies inside</p>
    `
  );
};

export default class FooterStats {
  constructor(sumFilms) {
    this._sumFilms = sumFilms;

    this._element = null;
  }

  getTemplate() {
    return createFooterStatistics(this._sumFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
