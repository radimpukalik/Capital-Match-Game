type ButtonTypes = "clicked" | "valid" | "invalid";

export const addButtonStyles = (items: string[], buttonType: ButtonTypes): void => {
  items.forEach((item) => {
    const button = document.querySelector(`button[data-item="${item}"]`);
    button?.classList.add(buttonType);
  });
};

export const removeButtonStyles = (
  items: string[],
  buttonType: ButtonTypes
): void => {
  items.forEach((item) => {
    const button = document.querySelector(`button[data-item="${item}"]`);
    button?.classList.remove(buttonType);
  });
};
