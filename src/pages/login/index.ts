import { createElement, getFormData } from '../../core/scripts';

class LoginPage {
  private regEx: RegExp = /^[A-Z][a-zA-Z\-]+$/;

  private form: HTMLFormElement;

  constructor(id: string) {
    this.form = document.createElement('form');
    this.form.id = id;
    this.form.className =
      'form-sign-in w-100 p-4 border border-dark-subtle border-opacity-25 rounded-3';

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveFormData();
    });
  }

  private checkInputState = (): void => {
    const buttonLogin = this.form.querySelector('.login-button') as HTMLButtonElement;
    const inputs = this.form.querySelectorAll('input');

    let allValid = true;
    inputs.forEach((input) => {
      const value = input.value.trim();
      const errorMessageDiv = input.nextElementSibling as HTMLDivElement;
      if (value.length < input.minLength) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        errorMessageDiv.textContent = `Input must be at least ${input.minLength} characters long.`;
        allValid = false;
      } else if (!this.regEx.test(value)) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        errorMessageDiv.textContent =
          'Input must start with an uppercase letter and contain only letters or hyphens.';
        allValid = false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        errorMessageDiv.textContent = '';
      }
    });

    if (allValid && buttonLogin) {
      buttonLogin.disabled = false;
    } else if (buttonLogin) {
      buttonLogin.disabled = true;
    }
  };

  private saveFormData(): void {
    const data = getFormData(this.form);
    const formData = {
      firstName: data['first-name-form-input'],
      surname: data['surname-form-input'],
    };
    const jsonString = JSON.stringify(formData);
    localStorage.setItem('formData', jsonString);
  }

  private loadFormData(): void {
    const formDataString = localStorage.getItem('formData');
    if (formDataString) {
      try {
        const formData = JSON.parse(formDataString);
        const { firstName, surname } = formData;

        const inputFirstName = this.form.querySelector(
          '#first-name-form-input'
        ) as HTMLInputElement;
        const inputSurname = this.form.querySelector('#surname-form-input') as HTMLInputElement;

        if (firstName) {
          inputFirstName.value = firstName;
          inputFirstName.dispatchEvent(new Event('input'));
        }

        if (surname) {
          inputSurname.value = surname;
          inputSurname.dispatchEvent(new Event('input'));
        }
      } catch (e) {
        console.error('Error parsing formData from localStorage', e);
      }
    }
  }

  private createFirstNameInput(): void {
    const divFirstName = createElement('div', 'first-name mb-3', this.form);

    const labelFirstName = createElement(
      'label',
      'login-form-label form-label',
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
    inputFirstName.minLength = 3;
    inputFirstName.required = true;
    inputFirstName.pattern = this.regEx.source;
    inputFirstName.addEventListener('input', this.checkInputState);

    createElement('div', 'invalid-feedback', divFirstName);
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
    inputSurname.minLength = 4;
    inputSurname.required = true;
    inputSurname.pattern = this.regEx.source;
    inputSurname.addEventListener('input', this.checkInputState);

    createElement('div', 'invalid-feedback', divSurname);
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

    this.loadFormData();

    return this.form;
  }
}

export default LoginPage;
