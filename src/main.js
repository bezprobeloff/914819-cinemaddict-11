import PageController from "./controllers/page";
import ProfileComponent from "./components/profile";
import FooterStatsComponent from "./components/footer-statistics";
import MainNavigationComponent from "./components/main-navigate";
import {generateFilms} from "./components/mock/film";
import {render, append, remove, RenderPosition} from "./utils/render";

const FILMS_COUNT = 23;
const COUNT_WATCHED_FILMS = 13;

const films = generateFilms(FILMS_COUNT);

const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer__statistics`);
const profileComponent = new ProfileComponent(COUNT_WATCHED_FILMS);
const footerStatsComponent = new FooterStatsComponent(films.length);
const pageController = new PageController(siteMainElement);

render(headerElement, profileComponent, RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationComponent(films), RenderPosition.BEFOREEND);
pageController.render(films);
render(footerElement, footerStatsComponent, RenderPosition.BEFOREEND);
