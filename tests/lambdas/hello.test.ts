import { hello } from "../../app/lambdas"

describe("hello", () => {
  it("returns a response", async () => {
    const response = hello()
    expect(response.statusCode).toEqual(200)
  })
})
