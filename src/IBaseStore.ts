import { Reduction } from "./Reduction";

export interface IBaseStore<TState> {
  get state(): TState;
  transit(r: Reduction<TState>): void;
}
