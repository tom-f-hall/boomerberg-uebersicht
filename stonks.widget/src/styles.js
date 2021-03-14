import { styled } from "uebersicht"
import { colourScheme } from './config'

export const StonksWidget = styled('div')`
  background-color: ${colourScheme.background};
  padding: 5px;
  width: 90%;
`

export const StonksHeader = styled('div')`
  height: 80px;
  padding: 0px 10px 10px 10px;
  color: white;
  font-size: 18pxx;
  font-family: Tahoma
`

export const BoomerbergLogo = styled('h2')`
  font-size: 24px;
  font-weight: bold;
  color: white;
  font-family: Helvetica;
`
export const StonksTable = styled("table")`
  border-collapse: collapse;
  table-layout: fixed;
  font-family: Tahoma;
  background-color: ${colourScheme.background};
  color: ${colourScheme.rowText};
  border: 1px solid ${colourScheme.tableBorder};
`

export const TableHeader = styled('th')(props => ({
  textAlign: props.isNumber ? 'right' : 'left',
  backgroundColor: colourScheme.headerBackground,
  color: colourScheme.headerText,
  fontSize: '12px',
  padding: '3px 5px 5px 5px',
  borderRight: `1px solid ${colourScheme.headerBorder}`,
}))

export const TableRow = styled('tr')`
  font-size: 12px;
  font-weight: 200;
  width: 280px;
  max-width: 280px;
  overflow: hidden;
  border-bottom: 1px solid ${colourScheme.tableBorder};
`

export const TableRowNumber = styled('td')`
  text-align: right;
  color: ${colourScheme.rowNumberText};
  
`

export const TableData = styled('td')(props => ({
  textOverflow: 'ellipsis',
  width: '200px',
  whiteSpace: 'nowrap',
  overflow: 'fixed',
  color: props.isPrimary ? colourScheme.background : props.colour,
  backgroundColor: props.isPrimary && props.colour,
  textAlign: props.isNumber ? 'right' : 'left',
  padding: '3px 5px 3px 5px',
  borderRight: `1px solid ${colourScheme.rowBorder}`
  
}))
