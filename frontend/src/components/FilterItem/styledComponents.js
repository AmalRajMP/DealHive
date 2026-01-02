import styled from 'styled-components'

export const FilterPill = styled.button`
  min-height: 82px;

  min-width: 87px;
  max-width: 90px;

  padding: 10px 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: linear-gradient(180deg, #ffffff, #f6faff);
  border: 1px solid rgba(0, 91, 186, 0.12);
  border-radius: 14px;

  color: #005bba;
  cursor: pointer;

  box-sizing: border-box;

  box-shadow: 0px 3px 8px rgba(94, 169, 250, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 14px rgba(94, 169, 250, 0.35);
    background: linear-gradient(180deg, #ffffff, #eef5ff);
  }

  &:active {
    transform: scale(0.96);
  }
`

export const FilterIcon = styled.div`
  font-size: 24px;
  color: #005bba;

  display: flex;
  align-items: center;
  justify-content: center;

  line-height: 1;
`

export const FilterLabel = styled.span`
  font-size: 11.5px;
  font-weight: 500;
  color: #005bba;
  text-align: center;
  line-height: 1.2;

  white-space: normal;
  word-break: break-word;
`
