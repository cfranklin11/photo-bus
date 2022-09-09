import { hello } from "../../app/lambdas/hello.js"

const context = {
  callbackWaitsForEmptyEventLoop: true,
  functionName: "hello",
  functionVersion: "1",
  invokedFunctionArn: "arn",
  memoryLimitInMB: "42",
  awsRequestId: "id",
  logGroupName: "group",
  logStreamName: "stream",
  getRemainingTimeInMillis: () => 42,
  done: () => null,
  fail: () => null,
  succeed: () => null,
}

describe("hello", () => {
  it("returns a response", async () => {
    const response = await hello(null, context, () => null)
    expect(response.statusCode).toEqual(200)
  })
})
