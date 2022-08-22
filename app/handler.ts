import type { Handler } from "aws-lambda"

import * as lambdas from "./lambdas/hello"

export const hello: Handler = async () => lambdas.hello()
