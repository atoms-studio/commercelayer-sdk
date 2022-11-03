### [1.4.1](https://github.com/atoms-studio/commercelayer-sdk/compare/1.4.0...1.4.1) (2022-11-03)


### Features

* export additional methods ([4b4409e](https://github.com/atoms-studio/commercelayer-sdk/commit/4b4409e3f041fcb2e5a897fc6e4f1f549174429f))

## [1.4.0](https://github.com/atoms-studio/commercelayer-sdk/compare/1.3.2...1.4.0) (2022-04-21)


### Features

* add customer groups ([#6](https://github.com/atoms-studio/commercelayer-sdk/issues/6)) ([5c43df6](https://github.com/atoms-studio/commercelayer-sdk/commit/5c43df6cf6614a95453ada1944bf2698ad3a5fab))
* add timeout option to config ([c2de1fc](https://github.com/atoms-studio/commercelayer-sdk/commit/c2de1fc3476e83a0939b209663f37b0147204f52))

### [1.3.2](https://github.com/atoms-studio/commercelayer-sdk/compare/1.3.1...1.3.2) (2022-02-01)


### Features

* update all polymorphic relationships ([5ac69af](https://github.com/atoms-studio/commercelayer-sdk/commit/5ac69af15949a3f9c05bee35147adf852aa6e5e0))


### Bug Fixes

* properly handle polymorphic relationships ([39f6bd3](https://github.com/atoms-studio/commercelayer-sdk/commit/39f6bd376e9405cbbcffc7f6ca8033b6874eaffd))

### [1.3.1](https://github.com/atoms-studio/commercelayer-sdk/compare/1.3.0...1.3.1) (2022-01-11)


### Bug Fixes

* **resources:** type on StockItems ([06ca892](https://github.com/atoms-studio/commercelayer-sdk/commit/06ca892ade06ce591942ccb7f83c3a46dbe46ba0))

## [1.3.0](https://github.com/atoms-studio/commercelayer-sdk/compare/1.2.0...1.3.0) (2022-01-11)


### Features

* **resources:** add StockItems ([371039b](https://github.com/atoms-studio/commercelayer-sdk/commit/371039be840eb7011351ab06a9703d50b7c82a7f))

## [1.2.0](https://github.com/atoms-studio/commercelayer-sdk/compare/1.1.0...1.2.0) (2022-01-11)


### Features

* **resources:** add StockLocations ([3e14c01](https://github.com/atoms-studio/commercelayer-sdk/commit/3e14c01227b4a219cf8f351616239cf69ba3c925))

## [1.1.0](https://github.com/atoms-studio/commercelayer-sdk/compare/1.0.2...1.1.0) (2021-09-22)


### Features

* add CustomerPaymentSources ([80bb7bd](https://github.com/atoms-studio/commercelayer-sdk/commit/80bb7bd292580f71079291aec57d22abedcb8d3e))

### [1.0.2](https://github.com/atoms-studio/commercelayer-sdk/compare/1.0.1...1.0.2) (2021-09-22)

### [1.0.1](https://github.com/atoms-studio/commercelayer-sdk/compare/1.0.0...1.0.1) (2021-09-17)


### Bug Fixes

* add missing skus attributes ([cb1263b](https://github.com/atoms-studio/commercelayer-sdk/commit/cb1263b8f22850ef973549d7ecd8c92260c19e88))

## [1.0.0](https://github.com/atoms-studio/commercelayer-sdk/compare/1.0.0-beta.2...1.0.0) (2021-09-17)


### Features

* add new skus attributes ([388a200](https://github.com/atoms-studio/commercelayer-sdk/commit/388a200eb636391d392722121553e7df9d4f2f36))

## [1.0.0-beta.2](https://github.com/atoms-studio/commercelayer-sdk/compare/1.0.0-beta.1...1.0.0-beta.2) (2021-08-17)


### Features

* **examples:** update to new create/update parameters ([fe8c2bc](https://github.com/atoms-studio/commercelayer-sdk/commit/fe8c2bc127ec14d2cdd2515a09c0447af851350f))
* **resources:** allow omitting attributes for create and update ([3bb85f3](https://github.com/atoms-studio/commercelayer-sdk/commit/3bb85f3c054b6e787d40ab99f29442265950e3c6))


### Bug Fixes

* **auth:** correct customer token expiration after refresh ([97ec0ec](https://github.com/atoms-studio/commercelayer-sdk/commit/97ec0ecccddbd1fde7f925590068fb1903690367))

## [1.0.0-beta.1](https://github.com/atoms-studio/commercelayer-sdk/compare/0.1.0-alpha.8...1.0.0-beta.1) (2021-08-12)


### Features

* **auth:** throw error when restoring invalid session data ([9768af5](https://github.com/atoms-studio/commercelayer-sdk/commit/9768af5d22f4f7f23ad1cfe39015b4f0e5227b53))
* **resources:** add CustomerPasswordResets, OrderCopies, OrderSubscriptions ([a3e579a](https://github.com/atoms-studio/commercelayer-sdk/commit/a3e579a288c007ec4e82346c8e8f40a60c65a7d7))


### Bug Fixes

* **tests:** expect error on invalid session data ([fcec7e7](https://github.com/atoms-studio/commercelayer-sdk/commit/fcec7e7d1cd762627391b97b555435e78613accf))

## [0.1.0-alpha.8](https://github.com/atoms-studio/commercelayer-sdk/compare/0.1.0-alpha.7...0.1.0-alpha.8) (2021-07-23)


### Features

* **auth:** add integration support ([e3d5509](https://github.com/atoms-studio/commercelayer-sdk/commit/e3d5509d44d0e38ba3e33b2cf6c7f6859134fd1d))

## [0.1.0-alpha.7](https://github.com/atoms-studio/commercelayer-sdk/compare/0.1.0-alpha.6...0.1.0-alpha.7) (2021-07-20)


### Bug Fixes

* **api:** allow common resource attributes in create/update payloads ([ea731c1](https://github.com/atoms-studio/commercelayer-sdk/commit/ea731c15b7064c7bc248a25f19f0e173543abc49))

## 0.1.0-alpha.6 (2021-07-19)


### Features

* add DeliveryLeadTimes ([696282e](https://github.com/atoms-studio/commercelayer-sdk/commit/696282ea30958018cdbf0ad09230bc31670a1768))
* add initial method to create resources ([e34409b](https://github.com/atoms-studio/commercelayer-sdk/commit/e34409b395725d58dd4a6348376271ee2012acb0))
* add tests ([51e4489](https://github.com/atoms-studio/commercelayer-sdk/commit/51e4489e4f5d637aa641d36c0195c7a21556c5d0))
* **api:** add findAll, create, destroy ([6d9a6e2](https://github.com/atoms-studio/commercelayer-sdk/commit/6d9a6e2e995287788a868e9ab204ac8439d5c7a9))
* **api:** add query parameters to create and update ([23a0d9b](https://github.com/atoms-studio/commercelayer-sdk/commit/23a0d9b8c4d7fc8e6475b4bd16d9964a943b9bf7))
* **api:** add related resource fetching ([aa237f9](https://github.com/atoms-studio/commercelayer-sdk/commit/aa237f9fe92bdb9d320207a66d101ed6065e514d))
* **api:** add request token in headers ([1a28094](https://github.com/atoms-studio/commercelayer-sdk/commit/1a280946525a5d807fb91aac6c5a993908608ddd))
* **api:** implement all features ([c07d651](https://github.com/atoms-studio/commercelayer-sdk/commit/c07d651600e8dccc8935703d357eee7219f36dbc))
* **api:** initial API stub ([18adefa](https://github.com/atoms-studio/commercelayer-sdk/commit/18adefa9e3fe7893f601e8cc39e93f8d0cb86a7c))
* **api:** update resource signature ([83382ba](https://github.com/atoms-studio/commercelayer-sdk/commit/83382baf536d394fb21bb33e2fe47fc79b83f2b7))
* **auth:** add useCustomerToken ([1baf7dc](https://github.com/atoms-studio/commercelayer-sdk/commit/1baf7dcbaf7c3bd29c417149b2eb1b0653c44fa0))
* **auth:** fetch customer profile when logging or refreshing the token ([68327ec](https://github.com/atoms-studio/commercelayer-sdk/commit/68327ec5a2f0ab8d4954f4930788cbc0e59f53c0))
* **auth:** finalize initial auth interface ([2bc8e91](https://github.com/atoms-studio/commercelayer-sdk/commit/2bc8e91a36cc5c2ef6f526796b93444256b6f59a))
* **auth:** throw error when logging in without a market set ([b866670](https://github.com/atoms-studio/commercelayer-sdk/commit/b8666704a6c4c91e448ca6df4d24c259d0597396))
* **e2e:** improve integration tests ([3e081e0](https://github.com/atoms-studio/commercelayer-sdk/commit/3e081e0be47d35d9049bf44f8d4be50d860e1ffd))
* **e2e:** initial setup ([08059c5](https://github.com/atoms-studio/commercelayer-sdk/commit/08059c5f267af4610669bade7aae3f6a9b776889))
* **examples:** add checkout flow ([bc182ec](https://github.com/atoms-studio/commercelayer-sdk/commit/bc182ec2ae8c202b950b52cf775e6dc313ec2dbd))
* **examples:** add initial examples ([a51562c](https://github.com/atoms-studio/commercelayer-sdk/commit/a51562c0a7ac8730a367848e5fc0136c7a918978))
* **resources:** add new resources ([9f9818b](https://github.com/atoms-studio/commercelayer-sdk/commit/9f9818b9266e36d2bc13c7d488943afa10b26830))
* **resources:** add StripePayments ([5840504](https://github.com/atoms-studio/commercelayer-sdk/commit/584050488b02c7d8a05d6b75fd4f39b6f70e5c65))
* **resources:** add WireTransfers ([33875e0](https://github.com/atoms-studio/commercelayer-sdk/commit/33875e0eda48dc05cd36cc78423072f991137530))
* **scripts:** add script to generate resources ([33820cb](https://github.com/atoms-studio/commercelayer-sdk/commit/33820cbef75a4a32ffddbd97591318d5bee75aef))
* **scripts:** append exports to index and lint files ([9b58624](https://github.com/atoms-studio/commercelayer-sdk/commit/9b5862417fc950ad994dbd807de9c59fa771a2d6))
* **scripts:** update resource creation ([0fe8ac9](https://github.com/atoms-studio/commercelayer-sdk/commit/0fe8ac97e4ea3c6ebd717b9487f46c62b8ba82c9))
* setup repo ([0b91e31](https://github.com/atoms-studio/commercelayer-sdk/commit/0b91e313b67716fef130a9501d1d76f34093ac72))


### Bug Fixes

* **auth:** correct token expiration ([0e5bb2e](https://github.com/atoms-studio/commercelayer-sdk/commit/0e5bb2e3524e98f0f574b900df34f3ec5f71fafe))
* **scripts:** use proper resource slug when fetching docs ([deda58b](https://github.com/atoms-studio/commercelayer-sdk/commit/deda58b6c443dc4de0a5448af3afb644c5518a3a))
* **serializer:** include metadata in attributes ([113e04a](https://github.com/atoms-studio/commercelayer-sdk/commit/113e04ae44ed7578fc6f240f58bb2cfa1f58ca94))
* **serializer:** use snake case for keys ([84619d9](https://github.com/atoms-studio/commercelayer-sdk/commit/84619d968835b152e0a17a7b33e32f3588c8c692))
* **tests:** api pagination issues ([5ca60e4](https://github.com/atoms-studio/commercelayer-sdk/commit/5ca60e4c3d5fe4058a369034c3302f3cd4db3005))

