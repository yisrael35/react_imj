import TableRow from './TableRowCosts'
import { Grid } from '@mui/material/'

import Dictionary from '../../utils/dictionary'

export default function TableCosts({ costs, setCosts }) {
  const dictionary = Dictionary()

  const handle_add_row = () => {
    setCosts([...costs, { description: '', amount: '', unit_cost: '', total_cost: '', discount: '', comment: '' }])
  }

  return (
    <Grid container>
      <Grid item xs={8} style={{ paddingBottom: '10px' }}>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            <h4 className='text-muted'> {dictionary['costs']}</h4>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <table>
          <thead className='table_header'>
            <tr>
              <th>{dictionary['description']}</th>
              <th>{dictionary['amount']}</th>
              <th>{dictionary['unit_cost']}</th>
              <th>{dictionary['total_cost']}</th>
              <th>{dictionary['discount']}</th>
              <th>{dictionary['comment']}</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((element, index) => (
              <TableRow index={index} key={index} costs_array={costs} setCosts={setCosts} />
            ))}
          </tbody>
        </table>
        <Grid item xs={0.1}>
          <button type='button' className='btn btn-outline-dark' onClick={handle_add_row}>
            +
          </button>
        </Grid>
      </Grid>
    </Grid>
  )
}
