import {createElement} from "../utils";

const createFilmsListTemplate = (title, mod = ``) => {
  return (
    `<section class="films-list${(mod === `extra`) ? `--extra` : `` }">
      <h2 class="films-list__title${(mod === ``) ? ` visually-hidden` : `` }">${title}</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmList {
  constructor(title, mod) {
    this._title = title;
    this._mod = mod;

    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title, this._mod);
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
