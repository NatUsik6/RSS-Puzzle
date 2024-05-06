const firstName = document.getElementById('first-name') as HTMLInputElement;
firstName.addEventListener('change', setLoginButtonAvailability);

const surname = document.getElementById('surname') as HTMLInputElement;
surname.addEventListener('change', setLoginButtonAvailability);

const buttonLogin = document.querySelector('button-login');

function setLoginButtonAvailability(): void {
    if (firstName.value !== '' && surname.value !== '') {
        buttonLogin?.classList.remove('disabled');
    } else {
        buttonLogin?.classList.add('disabled');
    }
}
