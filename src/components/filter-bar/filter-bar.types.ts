export type IInputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export interface IMultiSelectChangeEvent {
  target: { value: string[] };
}
export interface IDateRangeChangeEvent {
  target: { value: string };
}
export type TFieldChangeHandler = (
  actionType: "SET_SOURCES" | "SET_CATEGORIES" | "SET_AUTHORS"
) => (e: IMultiSelectChangeEvent) => void;
export type TSearchChangeHandler = (e: IInputChangeEvent) => void;
export type TDateRangeChangeHandler = (e: IDateRangeChangeEvent) => void;
export type TClearSearchHandler = () => void;
export type TResetAllHandler = () => void;
