import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  jest,
} from "@jest/globals";

import { createSuite } from "./suite";

const { fn } = jest;

createSuite({
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  fn,
});
