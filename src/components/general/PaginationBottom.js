import React from 'react'

import IconButton from '@mui/material/IconButton'
import NavigateNext from '@mui/icons-material/NavigateNext'
import NavigateBefore from '@mui/icons-material/NavigateBefore'
const words_he = require('../../utils/words_he').words_he

const PaginationBottom = ({ limit, offset, meta_data, previous_page, next_page }) => {
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
      <div>{words_he['sum_rows'] + meta_data.sum_rows}</div>
    </div>
  )
}

export default PaginationBottom
