import { IBaseStore } from "./IBaseStore";

export class MainStore<TState> implements IBaseStore<TState> {
  private _state: TState;
  constructor(public onStateChange?: (state: TState) => void) { }

  public get state(): TState { return this._state; }
  public set state(state: TState) {
    this._state = state;
    this.onStateChange?.(this.state);
  }

  public transit<T extends any[]>(reduction: (p: TState, ...a: T) => TState, ...args: T): void {
    this.state = reduction(this._state, ...args);
  }
}
