import { FilterPill, FilterIcon, FilterLabel } from './styledComponents'

import { iconMap } from '../../utils/iconMap'

const FilterItem = ({ filterItemDetails, onChangeActiveFilter }) => {
  const { id, name } = filterItemDetails
  const Icon = iconMap[id]
  console.log(Icon)

  const onClickFilter = () => {
    onChangeActiveFilter(id)
  }

  return (
    <FilterPill type="button" onClick={onClickFilter}>
      <FilterIcon>{Icon}</FilterIcon>
      <FilterLabel>{name}</FilterLabel>
    </FilterPill>
  )
}

export default FilterItem
