import TableRow from './TableRowCosts'
const words_he = require('../../utils/words_he').words_he

export default function TableCosts({ costs, setCosts  }) {
  const handle_add_row = () => {
    setCosts([...costs,{ description: '', amount: '', unit_cost: '',total_cost: '',discount: '',comment: '' }])
  }

  return (
    <div>
      {words_he['costs']}
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
            <TableRow  index={index} key={index} costs_array={costs} setCosts={setCosts} />
          ))}
        </tbody>
      </table>
      <button type='button' className='btn btn-info' onClick={handle_add_row}>
        +
      </button>
    </div>
  )
}
