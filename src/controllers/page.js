
import ShowMoreButtonComponent from "../components/button-show-more";
import NoFilmsComponent from "../components/no-films";
// import CardFilmComponent from "../components/card-film";
// import FilmPopupComponent from "../components/film-details";
import FilmListComponent from "../components/film-list";
import SectionFilmsComponent from "../components/section-films";
import SortFilmsComponent, {SortType} from "../components/sort-films";
import MovieController from "./movie";
import {render, append, remove, RenderPosition} from "../utils/render";

const SHOWING_FILMS_ON_START_COUNT = 5;
const SHOWING_FILMS_BY_BUTTON_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const renderFilms = (filmListContainer, films, onDataChange, onViewChange) => {
  // films.forEach((film) => {
  //   renderCardFilm(filmListContainer, film);
  // });
  return films.map((film) => {
    const movieController = new MovieController(filmListContainer, onDataChange, onViewChange);

    movieController.render(film);

    return movieController;
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedFilms = showingFilms.sort((a, b) => a.releaseDate - b.releaseDate);
      break;
    case SortType.RATE_UP:
      sortedFilms = showingFilms.sort((a, b) => b.rate - a.rate);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container, filmsModel) {
    this._container = container;

    //this._films = [];
    this._filmsModel = filmsModel;
    this._showedMovieControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_ON_START_COUNT;
    this._noFilmsComponent = new NoFilmsComponent();
    this._sortFilmsComponent = new SortFilmsComponent();
    this._sectionFilmsComponent = new SectionFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmListComponent(`All movies. Upcoming`, ``);
    this._filmListExtraTopRateComponent = new FilmListComponent(`Top rated movies`, `extra`);
    this._filmListExtraMostCommentComponent = new FilmListComponent(`Most commented`, `extra`);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortFilmsComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  //render(films) {
  render() {
    //this._films = films;
    const films = this._filmsModel.getFilms();

    render(this._container, this._sortFilmsComponent, RenderPosition.BEFOREEND);
    render(this._container, this._sectionFilmsComponent, RenderPosition.BEFOREEND);

    const isNoFilms = (films.length === 0);

    if (isNoFilms) {
      render(this._sectionFilmsComponent.getElement(), this.NoFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._renderFilms(films.slice(0, this._showingFilmsCount));

    this._renderShowMoreButton();
  }

  _removeFilms() {
    this._showedMovieControllers.forEach((movieContoller) => movieContoller.destroy());
    this._showedMovieControllers = [];
  }

  _renderFilms(films) {


    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    // const filmsListTopRatedContainerElement = this._filmListExtraTopRateComponent.getElement().querySelector(`.films-list__container`);
    // const filmsListMostCommentContainerElement = this._filmListExtraMostCommentComponent.getElement().querySelector(`.films-list__container`);

    render(this._sectionFilmsComponent.getElement(), this._filmsListComponent, RenderPosition.BEFOREEND);

    //const newFilms = renderFilms(filmsListContainerElement, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    const newFilms = renderFilms(filmsListContainerElement, films, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

    //this._renderShowMoreButton();
    this._showingFilmsCount = this._showedMovieControllers.length;

    render(this._sectionFilmsComponent.getElement(), this._filmListExtraTopRateComponent, RenderPosition.BEFOREEND);
    render(this._sectionFilmsComponent.getElement(), this._filmListExtraMostCommentComponent, RenderPosition.BEFOREEND);

    // генерация карточек для доп блоков
    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      // renderCardFilm(filmsListTopRatedContainerElement, films[i]);
      // renderCardFilm(filmsListMostCommentContainerElement, films[i + 2]);
    }
  }

  _renderShowMoreButton() {
    //if (this._showingFilmsCount >= this._films.length) {
    //  return;
    //}

    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    const filmListElement = this._filmsListComponent.getElement();
    render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingFilmsCount;
      const films = this._filmsModel.getFilms();
      const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_BY_BUTTON_COUNT;

      //const sortedFilms = getSortedFilms(this._films, this._sortFilmsComponent.getSortType(), prevTasksCount, this._showingFilmsCount);
      const sortedFilms = getSortedFilms(films, this._sortFilmsComponent.getSortType(), prevTasksCount, this._showingFilmsCount);
      const newFilms = renderFilms(filmsListContainerElement, sortedFilms, this._onDataChange, this._onViewChange);

      this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

      /*
      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
      */
    });
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateFilms(SHOWING_FILMS_ON_START_COUNT);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }
  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilms(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
    //const index = this._films.findIndex((it) => it === oldData);

    //if (index === -1) {
    //  return;
    //}

    //this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    //movieController.render(this._films[index]);
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_BY_BUTTON_COUNT;
    //const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);
    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._showingFilmsCount);
    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

    filmsListContainerElement.innerHTML = ``;

    const newFilms = renderFilms(filmsListContainerElement, sortedFilms, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = newFilms;

    this._renderShowMoreButton();
  }

}
