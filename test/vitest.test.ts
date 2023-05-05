import { JestApi, createSuite } from "./suite";

import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";

const { fn } = vi;

createSuite({
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  fn,
} as unknown as JestApi);
