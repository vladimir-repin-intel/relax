import { IBaseStore, IStore, Store } from "../src";
import { State } from "../src/State";

class RootStore extends Store<RootState> implements IStore<RootState> {
  public f1: IStore<ChildState>;
  constructor(store: IBaseStore<RootState>) {
    super(store);
    const self = this;
    const f1SubStore = {
      get state(): ChildState { return self.state.f1; },
      transit<T extends any[]>(reduction: (p: ChildState, ...a: T) => ChildState, ...args: T): void {
        self.transit(state => ({ ...state, f1: reduction(state.f1, ...args) }));
      }
    };
    this.f1 = new ChildStore(f1SubStore);
  }
}

class ChildStore extends Store<ChildState> implements IStore<ChildState> {
}

interface RootState extends State {
  f1: ChildState;
  f3: string;
  f4: string;
}

interface ChildState extends State {
  f2: number;
}

function updateF3(prev: RootState, f3: string): RootState {
  return {
    ...prev,
    f3
  };
}

function updateF3nF4(prev: RootState, f3: string, f4: string): RootState {
  return {
    ...prev,
    f3,
    f4
  };
}

const a: IStore<RootState> = null;
const b = a.transit(updateF3nF4, "a2", "b2");
const c = a.transit(updateF3, "av2");
const childStore = a.f1;
