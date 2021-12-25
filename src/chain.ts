import { Reduction } from "./Reduction";

export function chain<TState, T extends any[]>(reduction: (s: TState, ...a: T) => TState, ...chained: Reduction<TState>[])
  : (s: TState, ...a: T) => TState {
  return (state: TState, ...args: T) => chained.reduce((state, chained) => chained(state), reduction(state, ...args));
}
