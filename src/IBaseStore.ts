export interface IBaseStore<TState> {
  get state(): TState;
  transit<T extends any[]>(reduction: (p: TState, ...a: T) => TState, ...args: T): void;
}
