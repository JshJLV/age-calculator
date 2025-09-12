import {
  setErrorForm,
  setValidForm,
  showErrorSpan,
  hiddenErrorSpan,
} from "./set-styles";

const form = document.querySelector("#calculator-form") as HTMLFormElement;
const yearSpan = document.querySelector("#year-result") as HTMLSpanElement;
const monthSpan = document.querySelector("#month-result") as HTMLSpanElement;
const daySpan = document.querySelector("#day-result") as HTMLSpanElement;

type LikeData = {
  day: number;
  month: number;
  year: number;
};

type FormErrors = {
  emptyField: string;
  invalidDate: string;
  invalidMonth: string;
  invalidYear: string;
};

const formErrors: FormErrors = {
  emptyField: "This field is required",
  invalidDate: "Must be a valid day",
  invalidMonth: "Must be a valid month",
  invalidYear: "Must be in the past",
};

const isValidDate = (day: number, month: number, year: number): boolean => {
  let hasError = false;
  const date = new Date(year, month - 1, day);

  if (date.getDate() !== day) {
    showErrorSpan("day", formErrors.invalidDate);
    hasError = true;
  } else {
    hiddenErrorSpan("day");
  }

  if (date.getMonth() !== month - 1) {
    showErrorSpan("month", formErrors.invalidMonth);
    hasError = true;
  } else {
    hiddenErrorSpan("month");
  }

  if (new Date().getFullYear() < year) {
    showErrorSpan("year", formErrors.invalidYear);
    hasError = true;
  } else {
    hiddenErrorSpan("year");
  }

  if (hasError) {
    setErrorForm();
    return hasError;
  }

  return hasError;
};

const validateForm = (data: LikeData) => {
  let hasError = false;
  const dayNum = data.day;
  const monthNum = data.month;
  const yearNum = data.year;

  if (!dayNum) {
    showErrorSpan("day", formErrors.emptyField);
    setErrorForm();
    hasError = true;
  } else {
    hiddenErrorSpan("day");
  }

  if (!monthNum) {
    showErrorSpan("month", formErrors.emptyField);
    setErrorForm();
    hasError = true;
  } else {
    hiddenErrorSpan("month");
  }

  if (!yearNum) {
    showErrorSpan("year", formErrors.emptyField);
    setErrorForm();
    hasError = true;
  } else {
    hiddenErrorSpan("year");
  }

  if (!hasError) {
    console.log("Todos los campos llenos");
    setValidForm();
    hasError = isValidDate(dayNum, monthNum, yearNum);
    return !hasError;
  }
};

const calculateAge = (data: LikeData) => {
  const currentDate = new Date();
  const birthday = new Date(data.year, data.month - 1, data.day);
  let dayResult, monthResult, yearResult;

  dayResult = currentDate.getDate() - birthday.getDate();
  monthResult = currentDate.getMonth() - birthday.getMonth();
  yearResult = currentDate.getFullYear() - birthday.getFullYear();

  if (birthday.getDate() > currentDate.getDate()) {
    dayResult += 30;
    monthResult -= 1;
    if (birthday.getMonth() >= currentDate.getMonth()) {
      monthResult += 12;
      yearResult -= 1;
    }
  }

  if (
    birthday.getMonth() > currentDate.getMonth() &&
    birthday.getDate() < currentDate.getDate()
  ) {
    monthResult += 12;
    yearResult -= 1;
  }

  yearSpan.textContent = `${yearResult}`;
  monthSpan.textContent = `${monthResult}`;
  daySpan.textContent = `${dayResult}`;
};

const handleForm = (event: Event) => {
  event.preventDefault();

  const data = Object.fromEntries(
    new FormData(event.target as HTMLFormElement)
  );

  const likeData: LikeData = {
    day: Number(data.day) as number,
    month: Number(data.month) as number,
    year: Number(data.year) as number,
  };

  if (validateForm(likeData)) {
    calculateAge(likeData);
  }
};

form.addEventListener("submit", handleForm);
