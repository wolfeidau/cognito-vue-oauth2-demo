# cognito-vue-oauth2-demo

This application illustrates how to use the Amazon cognito service with [vue.js](https://vuejs.org/) and the recently released OAuth2 API.

## AWS Setup

Before you start have a read over [What is Amazon Cognito?](http://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)

To setup this project you first need to configure the Cognito service using the cloudformation [cognito.yaml](aws/cognito.yml).

Assign a domain to your cognito pool as per [Assigning a Domain to Your User Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-assign-domain.html).

Configure the redirect URL under the [Specifying App Client Settings for Your User Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-settings.html).

Then create `.env` file using the `.envrc.example` as a starting point.

More information on this read over [Defining Resource Servers for Your User Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-define-resource-servers.html)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at https://localhost:4200
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
