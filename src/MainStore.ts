import { Reduction } from "./Reduction";
import { IBaseStore } from "./IBaseStore";

export class MainStore<TState> implements IBaseStore<TState> {
  private _state: TState;
  constructor(public onStateChange?: (state: TState) => void) { }

  public get state(): TState { return this._state; }
  public set state(state: TState) {
    this._state = state;
    this.onStateChange?.(this.state);
  }

  public transit(reduction: Reduction<TState>): void {
    this.state = reduction(this._state);
  }
}
