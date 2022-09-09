import "source-map-support/register"

import type { Handler } from "aws-lambda"

export const hello: Handler = async (): Promise<{
  statusCode: number
  body: string
}> => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: "Go Serverless v1.0! Your function executed successfully!",
    },
    null,
    2
  ),
})
