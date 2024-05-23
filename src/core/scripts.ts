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
  const values: { [prop: string]: string } = {};

  inputs.forEach((input) => {
    values[input.id] = input.value;
  });

  return values;
}
