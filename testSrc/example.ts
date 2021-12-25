import { IBaseStore, IStore, Store } from "../src";
import { Reduction } from "../src/Reduction";
import { State } from "../src/State";

class RootStore extends Store<RootState> implements IStore<RootState> {
  public f1: IStore<ChildState>;
  constructor(store: IBaseStore<RootState>) {
    super(store);
    const self = this;
    this.f1 = new ChildStore({
      get state(): ChildState { return self.state.f1; },
      transit(reduction: Reduction<ChildState>): void { self.transit(state => ({ ...state, f1: reduction(state.f1) })); }
    });
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
