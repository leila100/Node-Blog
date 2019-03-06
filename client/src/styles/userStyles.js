import styled from "styled-components"

export const ListWrapper = styled.div`
  ul {
    list-style-type: square;
  }

  li {
    margin-top: 10px;
    font-size: 1.8rem;
    a {
      color: dodgerblue;
    }
  }
`

export const InfoWrapper = styled.div`
  ul {
    list-style-type: circle;
    margin-bottom: 30px;
  }
  li {
    margin-bottom: 10px;
    font-size: 1.8rem;
  }

  a {
    border: 1px solid dodgerblue;
    padding: 10px;
    font-size: 2rem;
    border-radius: 10px;
    outline: none;
    :hover {
      background-color: dodgerblue;
      color: white;
    }
  }
`

export const Name = styled.div`
  margin-bottom: 20px;
  font-size: 2.5rem;
  font-weight: 700;
  color: dodgerblue;
`
