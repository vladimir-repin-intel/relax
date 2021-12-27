import { IBaseStore } from "./IBaseStore";
import { MainStore } from "./MainStore";

export class StateHistory<TState> implements IBaseStore<TState> {
  public history: TState[] = [];
  constructor(private store: MainStore<TState>, initial?: TState) {
    if (initial != null) {
      this.transit(() => initial);
    }
  }

  public get state(): TState { return this.store.state; }
  public set state(state: TState) {
    this.transit(function manualTransit(): TState { return state; });
  }

  public transit<T extends any[]>(reduction: (p: TState, ...a: T) => TState, ...args: T): void {
    this.store.transit(reduction, ...args);
    this.history.push(this.state);
  }

  public back(): void {
    const index = this.history.indexOf(this.state);
    if (index < 1) { return; }
    this.store.state = this.history[index - 1];
  }

  public forward(): void {
    const index = this.history.indexOf(this.state);
    if (index === this.history.length - 1 || index === -1) { return; }
    this.store.state = this.history[index + 1];
  }
}
