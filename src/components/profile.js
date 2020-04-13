import {createElement} from "../utils";

const createProfileTemplate = (countWatchedFilm) => {
  let profileRating = ``;
  if (countWatchedFilm > 0 && countWatchedFilm < 11) {
    profileRating = `novice`;
  } else if (countWatchedFilm > 10 && countWatchedFilm < 21) {
    profileRating = `fan`;
  } else if (countWatchedFilm > 20) {
    profileRating = `movie buff`;
  }
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(countWatchedFilm) {
    this._countWatchedFilm = countWatchedFilm;

    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._countWatchedFilm);
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
