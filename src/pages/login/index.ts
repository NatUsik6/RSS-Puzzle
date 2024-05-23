import { createElement, getFormData } from '../../core/scripts';

class LoginPage {
  private form: HTMLFormElement;

  constructor(id: string) {
    this.form = document.createElement('form');
    this.form.id = id;
    this.form.className =
      'form-sign-in w-100 p-4 border border-dark-subtle border-opacity-25 rounded-3';

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getFormData(this.form);
      console.log(data);
    });
  }

  private setSubmitButtonState(): void {
    const buttonLogin = this.form.querySelector('.login-button') as HTMLButtonElement;

    if (Object.values(getFormData(this.form)).every((value) => value.trim()) && buttonLogin) {
      buttonLogin.disabled = false;
    } else if (buttonLogin) {
      buttonLogin.disabled = true;
    }
  }

  private createFirstNameInput(): void {
    const divFirstName = createElement('div', 'first-name mb-3', this.form);

    const labelFirstName = createElement(
      'label',
      'login-form-label  form-label',
      divFirstName
    ) as HTMLLabelElement;
    labelFirstName.textContent = 'First Name';
    labelFirstName.htmlFor = 'first-name-form-input';

    const inputFirstName = createElement(
      'input',
      'login-form-input form-control',
      divFirstName
    ) as HTMLInputElement;
    inputFirstName.id = 'first-name-form-input';
    inputFirstName.type = 'text';
    inputFirstName.required = true;
    inputFirstName.addEventListener('input', this.setSubmitButtonState);
  }

  private createSurnameInput(): void {
    const divSurname = createElement('div', 'surname mb-3', this.form);

    const labelSurname = createElement(
      'label',
      'login-form-label form-label',
      divSurname
    ) as HTMLLabelElement;
    labelSurname.textContent = 'Surname';
    labelSurname.htmlFor = 'surname-form-input';

    const inputSurname = createElement(
      'input',
      'login-form-input form-control',
      divSurname
    ) as HTMLInputElement;
    inputSurname.id = 'surname-form-input';
    inputSurname.type = 'text';
    inputSurname.required = true;
    inputSurname.addEventListener('input', this.setSubmitButtonState);
  }

  private createButtonLogin(): void {
    const buttonLogin = createElement(
      'button',
      'login-button btn btn-primary',
      this.form
    ) as HTMLButtonElement;
    buttonLogin.textContent = 'Login';
    buttonLogin.type = 'submit';
    buttonLogin.disabled = true;
  }

  render(): HTMLFormElement {
    const loginTitle = createElement('h1', 'login-title h3 mb-3 fw-normal', this.form);
    loginTitle.textContent = 'Please login';

    this.createFirstNameInput();
    this.createSurnameInput();
    this.createButtonLogin();

    document.querySelector('body')!.className = 'bg-dark-subtle bg-gradient';

    return this.form;
  }
}

export default LoginPage;
