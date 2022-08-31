# Photo Bus

[![build](https://github.com/cfranklin11/photo-bus/actions/workflows/build.yml/badge.svg)](https://github.com/cfranklin11/photo-bus/actions/workflows/build.yml)

Store photos in your cloud service of choice, and post them to your photo sharing service of choice

## Setup

- Install [`nvm`](https://github.com/nvm-sh/nvm) and run `nvm install`.
- Run `npm i` to install dependencies.
- Run `npm run policy` to generate a basic IAM policy for the user responsible for deploying the app to AWS (alternatively, you can just create an admin user).
  - Be sure to allow the `lambda:TagResource` action as this is required and doesn't seem to get included by the policy tool.
- In AWS, create a role with the policy generated in the previous step and apply it to a user.
- Copy the credentials from the user from the step above and use them to deploy the app.
