let currentMarkets: number[] = []

/* istanbul ignore next */
export const __resetMarket = (): void => {
  currentMarkets = []
}

export const setMarket = (marketId: number | number[]): void => {
  let markets: number[]
  if (Array.isArray(marketId)) {
    markets = marketId
  } else {
    markets = [marketId]
  }

  // Always assign a copy, otherwise consumer's modifications
  // on the input parameter would alter the value
  currentMarkets = markets.slice()
}

// Always return a copy so consumers cannot alter directly
export const getMarket = (): number[] => currentMarkets.slice()

export const getScope = (): string =>
  currentMarkets.map((market) => `market:${market}`).join(' ')
