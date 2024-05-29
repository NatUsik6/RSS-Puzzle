export function createElement(
  elementType: string,
  className: string,
  parent: HTMLElement
): HTMLElement {
  const element = document.createElement(elementType);
  element.className = className;
  parent.append(element);

  return element;
}

export function getFormData(form: HTMLFormElement): { [prop: string]: string } {
  const inputs = form.querySelectorAll('input');
  const data: { [prop: string]: string } = {};

  inputs.forEach((input) => {
    data[input.id] = input.value;
  });

  return data;
}
