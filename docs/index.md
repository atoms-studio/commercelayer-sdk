# Commercelayer SDK
![npm (scoped)](https://img.shields.io/npm/v/@atoms-studio/commercelayer-sdk)&nbsp; 
![npm](https://img.shields.io/npm/dm/@atoms-studio/commercelayer-sdk)&nbsp;
[![Build Status](https://github.com//atoms-studio/commercelayer-sdk/workflows/Node.js%20CI/badge.svg)](https://github.com/atoms-studio/commercelayer-sdk/actions)&nbsp;
[![codecov](https://codecov.io/gh/atoms-studio/commercelayer-sdk/branch/main/graph/badge.svg?token=PYZQB331CP)](https://codecov.io/gh/atoms-studio/commercelayer-sdk)


A lightweight, opinionated CommerceLayer SDK built for fast delivery of e-commerce functionalities.

<br>

### Why
The official CommerceLayer SDK is a great multi-purpose library, however we realized that it was missing a few functionalities that we had to reimplement in every project we worked on.
<br>
This library aims to speed development up by creating a thinner and easier interface with the CommerceLayer API and provide utilities to deal with the most common scenerios.

<br>

### Features
<br>

#### Strongly typed
All supported resources are strongly typed and provide code autocompletion for attributes and relationships, decreasing time spent reading the CommerceLayer API documentation.

<br>

#### Automatic token refresh
Combining Authentication and Resource API into a single library allows for automatic refresh of tokens when a request fails due to an expired token.

<br>

#### Token caching
Tokens are cached by their scope and expiration date, avoiding rate limiting errors when generating static pages or making a lot of concurrent requests.

<br>

#### Seamless multi-market switching
Switch between multiple markets and automatically create new auth tokens for that market.
