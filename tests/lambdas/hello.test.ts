import { hello } from "../../app/lambdas/hello.js"

describe("hello", () => {
  it("returns a response", async () => {
    const response = hello()
    expect(response.statusCode).toEqual(200)
  })
})
