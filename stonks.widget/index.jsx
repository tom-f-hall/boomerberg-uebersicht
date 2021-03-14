// Stonk market Übersicht widget
// Evolved from https://github.com/felixhageloh/uebersicht-widgets/tree/master/simple-stocks

import { colourScheme, tickers, position, congratulations, commiserations } from './src/config'
import { StonksWidget, StonksHeader, BoomerbergLogo, StonksTable, TableHeader, TableRow, TableRowNumber, TableData } from './src/styles'
import { intToString } from './src/fns'

export const className = position

// Form query string
const query = tickers.map ((element, index) => (index ? ',' : '') + encodeURI(element.ticker))

// Define data fetch
export const command = `curl -s 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=${query}'`

// Refresh every 15 minutes
export const refreshFrequency = 900000

// Render function
export const render = ({output, error}) => {
  
  if (error) return (
    <div>Something went wrong: <strong>{String(error)}</strong></div>
  )

  const data = JSON.parse(output)
  const stonks = data.quoteResponse.result


  // Renders an amount of tendies in currency
  const renderTendies = (tendies) => tendies.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return(
    <StonksWidget>
      <StonksHeader>
        <BoomerbergLogo>Boomerberg ™ © ®</BoomerbergLogo>
        <p> {`Stonks Tracker. Last updated ${new Date().toLocaleString(undefined)}`}</p>
      </StonksHeader>
      <StonksTable>
        <tr>
          <TableHeader></TableHeader>
          <TableHeader>Stonk</TableHeader>
          <TableHeader>Ticker</TableHeader>
          <TableHeader>Curr</TableHeader>
          <TableHeader isNumber>Last Price</TableHeader>
          <TableHeader isNumber>Chg % 1D</TableHeader>
          <TableHeader isNumber>Av Chg % 50D</TableHeader>
          <TableHeader isNumber>Av Chg % 200D</TableHeader>
          <TableHeader isNumber>Vol</TableHeader>
          <TableHeader isNumber>Mkt Cap</TableHeader>
          <TableHeader>Market</TableHeader>
          <TableHeader>News</TableHeader>
          <TableHeader isNumber>Hodling</TableHeader>
          <TableHeader isNumber>Tendies</TableHeader>
          <TableHeader isNumber>Gainz</TableHeader>
          <TableHeader isNumber>Gainz %</TableHeader>
        </tr>
        <tbody>
          {stonks.map( (stonk, index) => {
            const {symbol, shortName, fullExchangeName, currency, regularMarketPrice, regularMarketTime, regularMarketPreviousClose, regularMarketVolume, fiftyDayAverageChangePercent, twoHundredDayAverageChangePercent, marketCap } = stonk
            // Get direction for price
            const direction = regularMarketPrice > regularMarketPreviousClose ? 'up' : 'down'
            // Calculate change (on Prev close)
            const change = regularMarketPrice - regularMarketPreviousClose
            // Calculate change % (on Prev close)
            const changepct = change / regularMarketPreviousClose
            // Get date
            const date = new Date(regularMarketTime*1000)
            // Lookup holding
            const holding = tickers.find(element => element.ticker == symbol)
            // Calculate gainz
            const gainz = ((holding.holding * regularMarketPrice) - holding.cost)
                        
            return(
              <TableRow key={index}>
                <TableRowNumber>{`${(index + 1).toString()}.`}</TableRowNumber>
                <TableData>{shortName}</TableData>
                <TableData>{symbol}</TableData>
                <TableData>{currency}</TableData>
                <TableData isNumber>{renderTendies(regularMarketPrice)}</TableData>
                <TableData colour={direction == 'up' ? colourScheme.gainsText : colourScheme.lossesText} isNumber isPrimary>{parseFloat(changepct).toFixed(2)+'%'}</TableData>
                <TableData colour={fiftyDayAverageChangePercent > 0 ? colourScheme.gainsText : colourScheme.lossesText} isNumber>{renderTendies(fiftyDayAverageChangePercent * 100)+'%'}</TableData>
                <TableData colour={twoHundredDayAverageChangePercent > 0 ? colourScheme.gainsText : colourScheme.lossesText} isNumber>{renderTendies(twoHundredDayAverageChangePercent * 100)+'%'}</TableData>
                <TableData isNumber>{intToString(regularMarketVolume)}</TableData>
                <TableData isNumber>{intToString(marketCap)}</TableData>
                <TableData>{fullExchangeName} {('0' + date.getDate().toString()).slice(-2)}/{'0' + (date.getMonth()+1).toString().slice(-2)}/{date.getFullYear()} {('0' + date.getHours().toString()).slice(-2)}:{('0' + date.getMinutes().toString()).slice(-2)}:{('0' + date.getSeconds().toString()).slice(-2)}</TableData>
                <TableData colour={direction == 'up' ? colourScheme.gainsText : colourScheme.lossesText}>{direction == 'up' ? congratulations : commiserations}</TableData>
                <TableData isNumber>{ holding.holding ? renderTendies(holding.holding) : renderTendies(0)}</TableData>
                <TableData isNumber>{ (holding.cost && holding.holding) ? renderTendies(holding.holding * regularMarketPrice) : 'n/a'}</TableData>
                <TableData colour={ (holding.cost && holding.holding) ? gainz > 0 ? colourScheme.gainsText : colourScheme.lossesText : null } isNumber>{ (holding.cost && holding.holding) ? renderTendies(gainz) : 'n/a'}</TableData>
                <TableData colour={ (holding.cost && holding.holding) ? gainz > 0 ? colourScheme.gainsText : colourScheme.lossesText : null } isNumber>{ (holding.cost && holding.holding) ? renderTendies(gainz / holding.cost * 100)+'%' : 'n/a'}</TableData>
              </TableRow>
            )
          })}
          </tbody>
        </StonksTable>
      </StonksWidget>
  )
}