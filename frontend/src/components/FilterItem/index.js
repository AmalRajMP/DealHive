import { FilterPill, FilterIcon, FilterLabel } from './styledComponents'

import { iconMap } from '../../utils/iconMap'

const FilterItem = ({ filterItemDetails }) => {
  const { id, name } = filterItemDetails
  const Icon = iconMap[id]

  return (
    <FilterPill>
      <FilterIcon>{Icon}</FilterIcon>
      <FilterLabel>{name}</FilterLabel>
    </FilterPill>
  )
}

export default FilterItem
