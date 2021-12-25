import { IBaseStore } from "./IBaseStore";
import { State } from "./State";

type KeysOfType<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
type PickByType<T, U> = Pick<T, KeysOfType<T, U>>;

export type IStore<TState> = {
  get state(): TState;
  transit<T extends any[]>(reduction: (s: TState, ...t: T) => TState, ...args: T): void;
} & {
    [P in keyof PickByType<TState, State>]: IStore<TState[P]>;
  };

export class Store<TState> {
  constructor(private store: IBaseStore<TState>) { }

  get state(): TState { return this.store.state; }

  public transit<T extends any[]>(reduce: (p: TState, ...a: T) => TState, ...args: T): void {
    this.store.transit(state => reduce(state, ...args));
  }
}
