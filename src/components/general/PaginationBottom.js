import React from 'react'
import IconButton from '@mui/material/IconButton'
import NavigateNext from '@mui/icons-material/NavigateNext'
import NavigateBefore from '@mui/icons-material/NavigateBefore'
import Dictionary from '../../utils/dictionary'

const PaginationBottom = ({ limit, offset, meta_data, previous_page, next_page }) => {
  const dictionary = Dictionary()

  return (
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <IconButton color='primary' onClick={previous_page} disabled={offset === 0} style={{ padding: '6px', margin: '2px' }}>
        <NavigateNext />
      </IconButton>
      <IconButton
        color='primary'
        onClick={next_page}
        disabled={meta_data.sum_rows <= offset || meta_data.sum_rows <= limit || meta_data.sum_rows <= Number(limit) + Number(offset)}
        style={{ padding: '6px', margin: '2px' }}
      >
        <NavigateBefore />
      </IconButton>
      <div>{dictionary['sum_rows'] + meta_data.sum_rows}</div>
    </div>
  )
}

export default PaginationBottom
