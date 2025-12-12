import styled from 'styled-components'

export const FilterPill = styled.button`
  height: 78px;
  min-width: 70px;
  max-width: 70px;

  padding: 8px 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  background-color: #ffffffff;
  border: none;
  border-radius: 12px;

  color: #005bbaff;
  cursor: pointer;

  box-shadow: 0px 2px 6px rgba(94, 169, 250, 1);
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
