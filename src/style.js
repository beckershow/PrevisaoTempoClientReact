import styled from 'styled-components'

export const Container = styled.div`

  h1 {
    text-align: center;
    border-bottom: 0px solid silver;    
    padding-bottom: 5px;
  }

  h2 {
    text-align: center;
    border-bottom: 1px solid silver;
    padding-bottom: 5px;
  }

  ul {
    border-bottom: 1px solid silver;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }

  li {
    font-size: 11px;
  }

  table {
    border: 0px solid #FFF;
    border-collapse: collapse;
    width: 100%;    
  }

  th {
    font-size: 14px;
    text-align: left;
    border: 0px solid #FFF;
  }

  td, th {
    border: 1px solid #FFF;
    padding: 2px;
    font-size: 12px;
    text-align: left;
  }
`

export const TableDatalhamento = styled.table`
  display: none;  
`
