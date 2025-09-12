const labels = document.querySelectorAll(".calculator__label");
const inputs = document.querySelectorAll(".calculator__input");

export const setErrorForm = () => {
  labels.forEach((label) => {
    label.classList.add("calculator__label-error");
  });

  inputs.forEach((input) => {
    input.classList.add("calculator__input-error");
  });
};

export const setValidForm = () => {
  labels.forEach((label) => {
    label.classList.remove("calculator__label-error");
  });

  inputs.forEach((input) => {
    input.classList.remove("calculator__input-error");
  });
};

export const showErrorSpan = (key: string, message: string = "") => {
  const span = document.querySelector(`#error-${key}`) as HTMLSpanElement;
  span.textContent = message;
  span.classList.remove("calculator__span-error");
};

export const hiddenErrorSpan = (key: string) => {
  const span = document.querySelector(`#error-${key}`) as HTMLSpanElement;
  span.textContent = "";
  span.classList.add("calculator__span-error");
};
