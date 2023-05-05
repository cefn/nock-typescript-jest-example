import type {
  jest,
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} from "@jest/globals";

import nock from "nock";

import { getGoogle } from "../src";

export interface JestApi {
  describe: typeof describe;
  test: typeof test;
  expect: typeof expect;
  beforeAll: typeof beforeAll;
  afterAll: typeof afterAll;
  fn: typeof jest.fn;
}

export function createSuite(options: JestApi) {
  const { describe, test, expect, beforeAll, afterAll, fn } = options;

  const interceptors: nock.Interceptor[] = [];

  function interceptWithHello(url: URL) {
    const interceptor = nock(url.origin).get(url.pathname);
    interceptor.reply(200, "Hello world").persist();
    interceptors.push(interceptor);
  }

  describe("Verify Nock mocking", () => {
    beforeAll(() => {
      interceptWithHello(new URL("https://www.google.com"));
    });

    afterAll(() => {
      interceptors.forEach((interceptor) =>
        nock.removeInterceptor(interceptor)
      );
    });

    test("Prove nock interception", async () => {
      const result = await getGoogle();
      expect(result.body).toBe("Hello world");
    });
  });
}
