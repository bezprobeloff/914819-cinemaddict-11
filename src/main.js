import ShowMoreButtonComponent from "./components/button-show-more";
import CardFilmComponent from "./components/card-film";
import FilmPopupComponent from "./components/film-details";
import FilmListComponent from "./components/film-list";
import MainNavigationComponent from "./components/main-navigate";
import ProfileComponent from "./components/profile";
import SectionFilmsComponent from "./components/section-films";
import SortFilmsComponent from "./components/sort-films";
import FooterStatsComponent from "./components/footer-statistics";
import {generateFilms} from "./components/mock/film";
import {render, RenderPosition} from "./utils.js";

const FILMS_COUNT = 23;
const SHOWING_FILMS_ON_START_COUNT = 5;
const SHOWING_FILMS_BY_BUTTON_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;
const COUNT_WATCHED_FILMS = 13;

const renderCardFilm = (filmListContainer, film) => {
  const onOpenPopupClick = () => {
    bodyElement.appendChild(popupFilmComponent.getElement());
  };

  const onClosePopupButtonClick = () => {
    bodyElement.removeChild(popupFilmComponent.getElement());
  };
  const cardFilmComponent = new CardFilmComponent(film);
  const posterCardFilmElement = cardFilmComponent.getElement().querySelector(`.film-card__poster`);
  const titleCardFilmElement = cardFilmComponent.getElement().querySelector(`.film-card__title`);
  const commentsCardFilmElement = cardFilmComponent.getElement().querySelector(`.film-card__comments`);
  const popupFilmComponent = new FilmPopupComponent(film);
  const closePopupButton = popupFilmComponent.getElement().querySelector(`.film-details__close-btn`);

  posterCardFilmElement.addEventListener(`click`, onOpenPopupClick);
  titleCardFilmElement.addEventListener(`click`, onOpenPopupClick);
  commentsCardFilmElement.addEventListener(`click`, onOpenPopupClick);
  closePopupButton.addEventListener(`click`, onClosePopupButtonClick);

  render(filmListContainer, cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderSectionFilms = (mainElement, films) => {
  render(mainElement, new MainNavigationComponent(films).getElement(), RenderPosition.BEFOREEND);
  render(siteMainElement, new SortFilmsComponent().getElement(), RenderPosition.BEFOREEND);

  const sectionFilmsElement = new SectionFilmsComponent().getElement();
  const filmsListElement = new FilmListComponent(`All movies. Upcoming`, ``).getElement();
  const filmListExtraTopRateElement = new FilmListComponent(`Top rated movies`, `extra`).getElement();
  const filmListExtraMostCommentElement = new FilmListComponent(`Most commented`, `extra`).getElement();
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
  const filmsListTopRatedContainerElement = filmListExtraTopRateElement.querySelector(`.films-list__container`);
  const filmsListMostCommentContainerElement = filmListExtraMostCommentElement.querySelector(`.films-list__container`);
  const showMoreButtonElement = new ShowMoreButtonComponent().getElement();

  render(mainElement, sectionFilmsElement, RenderPosition.BEFOREEND);
  render(sectionFilmsElement, filmsListElement, RenderPosition.BEFOREEND);

  let showingFilmsCount = SHOWING_FILMS_ON_START_COUNT;

  films.slice(0, showingFilmsCount)
    .forEach((film) => renderCardFilm(filmsListContainerElement, film));

  render(filmsListElement, showMoreButtonElement, RenderPosition.BEFOREEND);
  showMoreButtonElement.addEventListener(`click`, () => {
    const prevTasksCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON_COUNT;

    films.slice(prevTasksCount, showingFilmsCount)
      .forEach((film) => renderCardFilm(filmsListContainerElement, film));

    if (showingFilmsCount >= films.length) {
      showMoreButtonElement.remove();
    }
  });

  render(sectionFilmsElement, filmListExtraTopRateElement, RenderPosition.BEFOREEND);
  render(sectionFilmsElement, filmListExtraMostCommentElement, RenderPosition.BEFOREEND);

  // генерация карточек для доп блоков
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    renderCardFilm(filmsListTopRatedContainerElement, films[i]);
    renderCardFilm(filmsListMostCommentContainerElement, films[i + 2]);
  }
};

const films = generateFilms(FILMS_COUNT);

const bodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer__statistics`);

const profileElement = new ProfileComponent(COUNT_WATCHED_FILMS).getElement();
const footerStatsElement = new FooterStatsComponent(films.length).getElement();

renderSectionFilms(siteMainElement, films);

render(headerElement, profileElement, RenderPosition.BEFOREEND);
render(footerElement, footerStatsElement, RenderPosition.BEFOREEND);

// render(bodyElement, createFilmDetailsTemplate(films[0]), `beforeend`);

