import AbstractComponent from "../components/abstract-component";

const createButtonShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createButtonShowMoreTemplate();
  }

  setClickHandler(handler) {
    this._element.addEventListener(`click`, handler);
  }
}
