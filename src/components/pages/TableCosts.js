import TableRow from './TableRowCosts'
import { Grid } from '@mui/material/'
const words_he = require('../../utils/words_he').words_he

export default function TableCosts({ costs, setCosts }) {
  const handle_add_row = () => {
    setCosts([...costs, { description: '', amount: '', unit_cost: '', total_cost: '', discount: '', comment: '' }])
  }

  return (
    <Grid container>
      <Grid item xs={8} style={{ paddingBottom: '10px' }}>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            <h4 className='text-muted'> {words_he['costs']}</h4>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <table>
          <thead className='table_header'>
            <tr>
              <th>{words_he['description']}</th>
              <th>{words_he['amount']}</th>
              <th>{words_he['unit_cost']}</th>
              <th>{words_he['total_cost']}</th>
              <th>{words_he['discount']}</th>
              <th>{words_he['comment']}</th>
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
