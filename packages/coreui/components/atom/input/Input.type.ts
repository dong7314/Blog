export type InputType = "text" | "password";

export type InputSize = "s" | "m" | "l";

export interface InputRef {
  setBlur: () => void;
  setFocus: () => void;
  getValue: () => string;
  setValue: (newValue: string) => void;
  clearValue: () => void;
}