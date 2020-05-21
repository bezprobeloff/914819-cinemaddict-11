import AbstractComponent from "../components/abstract-component";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  const classNameFilter = `main-navigation__item`;

  return (
    `<a href="#watchlist" class="${classNameFilter} ${isChecked ? `${classNameFilter + `--active`}` : ``}">${name}
      <span class="${classNameFilter}-count">${count}</span>
    </a>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);

  return (
    `<div class="main-navigation__items">
      ${filtersMarkup}
    </div>`
  );
};

/*
const createFilterTemplate = (films) => {
  const watchlistFilms = [];
  const historyFilms = [];
  const favoritesFilms = [];
  for (const film of films) {
    if (film.isWached) {
      watchlistFilms.push(film);
    }
    if (film.isHistory) {
      historyFilms.push(film);
    }
    if (film.isFavorite) {
      favoritesFilms.push(film);
    }
  }
  return (
    `<div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistFilms.length}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyFilms.length}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesFilms.length}</span></a>
      </div>`
  );
};
*/
export default class Filter extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilterTemplate(this._films);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
