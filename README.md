[![Build Status](https://github.com//atoms-studio/commercelayer-sdk/workflows/Node.js%20CI/badge.svg)](https://github.com/atoms-studio/commercelayer-sdk/actions)
[![codecov](https://codecov.io/gh/atoms-studio/commercelayer-sdk/branch/main/graph/badge.svg?token=PYZQB331CP)](https://codecov.io/gh/atoms-studio/commercelayer-sdk)

# CommerceLayer SDK
An opinionated CommerceLayer SDK built for quick delivery of e-commerce functionalities.

## Why
The official CommerceLayer SDK is a great multi-purpose library that covers a lot of scenarios, but we found out that in every e-commerce we built, we had to provide extra code to handle some common features and edge cases.<br>
This library aims to speed-up development by creating a thinner and easier interface with the CommerceLayer API and provide utilities to deal with the aforementioned problems.

## Features

### Strongly typed
All supported resources are strongly typed and provide code autocompletion for attributes and relationships, decreasing time spent reading the CommerceLayer API documentation.

### Automatic token refresh
Combining Authentication and API into a single library allows for automatic refresh of tokens when a request fails due to an expired token.

### Token caching
Tokens are cached by their scope and expiration date, avoiding rate limiting errors when generating static pages or making a lot of concurrent requests.

