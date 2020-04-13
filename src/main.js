import ShowMoreButtonComponent from "./components/button-show-more";
import CardFilmComponent from "./components/card-film";
import FilmPopupComponent from "./components/film-details";
import FilmListComponent from "./components/film-list";
// import {createFilmsListExtraTemplate} from "./components/film-list-extra";
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
const FILMS_LIST_EXTRA_COUNT = 2;
const COUNT_WATCHED_FILMS = 13;

const renderCardFilm = () => {};
const renderSectionFilms = () => {};

const films = generateFilms(FILMS_COUNT);

const bodyElement = document.querySelector(`body`);
// const render = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer__statistics`);

render(headerElement, createProfileTemplate(COUNT_WATCHED_FILMS), `beforeend`);
render(siteMainElement, createMainNavigationTemplate(films), `beforeend`);
render(siteMainElement, createSortFilmsTemplate(), `beforeend`);

render(siteMainElement, createSectionFilmsTemplate(), `beforeend`);
const sectionFilmsElement = siteMainElement.querySelector(`.films`);

render(sectionFilmsElement, createFilmsListTemplate(`All movies. Upcoming`), `beforeend`);

const filmsListElement = sectionFilmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_ON_START_COUNT;

films.slice(0, showingFilmsCount)
  .forEach((film) => render(filmsListContainerElement, createCardFilmTemplate(film), `beforeend`));

render(filmsListElement, createButtonShowMoreTemplate(), `beforeend`);

render(sectionFilmsElement, createFilmsListTemplate(`Top rated movies`, `extra`), `beforeend`);
render(sectionFilmsElement, createFilmsListTemplate(`Most commented`, `extra`), `beforeend`);

for (let i = 0; i < FILMS_LIST_EXTRA_COUNT; i++) {
  const filmsListExtraElement = sectionFilmsElement.querySelectorAll(`.films-list--extra`).item(i);
  const filmsListExtraContainerElement = filmsListExtraElement.querySelector(`.films-list__container`);

  for (let j = 0; j < FILMS_EXTRA_COUNT; j++) {
    render(filmsListExtraContainerElement, createCardFilmTemplate(films[j]), `beforeend`);
  }
}

render(footerElement, createFooterStatistics(films.length), `beforeend`);

// render(bodyElement, createFilmDetailsTemplate(films[0]), `beforeend`);

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON_COUNT;

  films.slice(prevTasksCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainerElement, createCardFilmTemplate(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});
