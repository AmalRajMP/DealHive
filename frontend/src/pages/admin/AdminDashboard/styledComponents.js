import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f8fafc;
`

export const Sidebar = styled.div`
  width: 240px;
  background: linear-gradient(180deg, #0f172a, #1e293b);
  color: white;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 40px;
`

export const MenuItem = styled(NavLink)`
  padding: 12px 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background: rgba(255, 255, 255, 0.2);
    font-weight: 600;
  }
`

export const Content = styled.div`
  flex: 1;
  padding: 40px;
  overflow-y: auto;
`
