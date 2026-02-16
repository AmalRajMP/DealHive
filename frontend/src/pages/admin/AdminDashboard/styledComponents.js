import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`

export const Sidebar = styled.div`
  width: 220px;
  background: #f1f5f9;
  padding: 20px;
`

export const Title = styled.h3`
  margin-bottom: 20px;
`

export const MenuItem = styled.p`
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`

export const Content = styled.div`
  flex: 1;
  padding: 30px;
`
