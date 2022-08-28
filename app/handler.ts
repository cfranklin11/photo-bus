import type { Handler } from "aws-lambda"

import * as lambdas from "./lambdas"

export const hello: Handler = async () => lambdas.hello()

export const upload: Handler = async () => {
  await lambdas.upload()
}
