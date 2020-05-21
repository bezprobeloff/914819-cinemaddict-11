import AbstractComponent from "../components/abstract-component";

const createMainNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigate extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createMainNavigationTemplate();
  }
}
