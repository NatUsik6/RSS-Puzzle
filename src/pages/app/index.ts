import LoginPage from '../login';

class App {
  private container: HTMLElement;

  private initialPage: LoginPage;

  constructor() {
    this.container = document.body;
    this.initialPage = new LoginPage('login-page');
  }

  run(): void {
    document.querySelector('html')!.dataset.bsTheme = 'dark';
    const loginPageHTML = this.initialPage.render();
    this.container.append(loginPageHTML);
  }
}

export default App;
