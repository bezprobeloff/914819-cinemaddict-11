import {createElement} from "../utils";
import AbstractComponent from "../components/abstract-component";

const createSortFilmsTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class SortFilms extends AbstractComponent {
  getTemplate() {
    return createSortFilmsTemplate();
  }
}
