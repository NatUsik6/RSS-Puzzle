const firstName = document.getElementById('first-name') as HTMLInputElement;
const surname = document.getElementById('surname') as HTMLInputElement;
const buttonLogin = document.querySelector('button-login');

function setLoginButtonAvailability(): void {
  if (firstName.value !== '' && surname.value !== '') {
    buttonLogin?.classList.remove('disabled');
  } else {
    buttonLogin?.classList.add('disabled');
  }
}

firstName.addEventListener('change', setLoginButtonAvailability);
surname.addEventListener('change', setLoginButtonAvailability);
