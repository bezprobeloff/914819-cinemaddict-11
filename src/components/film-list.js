import AbstractComponent from "../components/abstract-component";

const createFilmsListTemplate = (title, mod = ``) => {
  return (
    `<section class="films-list${(mod === `extra`) ? `--extra` : `` }">
      <h2 class="films-list__title${(mod === ``) ? ` visually-hidden` : `` }">${title}</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmList extends AbstractComponent {
  constructor(title, mod) {
    super();
    this._title = title;
    this._mod = mod;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title, this._mod);
  }
}
