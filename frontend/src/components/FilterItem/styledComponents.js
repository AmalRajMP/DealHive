import styled from 'styled-components'

export const FilterPill = styled.button`
  min-width: 70px;
  max-width: 70px;
  height: 78px;

  padding: 8px 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  background-color: #e6f0ff;
  border: none;
  border-radius: 12px;

  color: #005bba;
  cursor: pointer;

  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.96);
  }
`

export const FilterIcon = styled.div`
  font-size: 22px;
  color: #005bba;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FilterLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #005bba;
  text-align: center;
  line-height: 1.1;

  /* Prevent overflow + enable 2-line wrap */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* show max 2 lines */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; /* allow text wrapping */
`
