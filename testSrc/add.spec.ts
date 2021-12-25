import { test } from "@b08/test-runner";
import { add } from "../src";

test("add", t => {
  // arrange

  // act
  const result = add(2, 3);

  // assert
  t.equal(result, 5);
});
