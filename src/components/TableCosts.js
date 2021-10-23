import TableRow from './TableRowCosts'

export default function TableCosts({ costs, setCosts }) {
  const handle_add_row = () => {
    setCosts([...costs,{ description: '', amount: '', unit_cost: '',total_cost: '',discount: '',comment: '' }])
  }

  return (
    <div>
      table costs:
      <table>
        <thead>
          <tr>
            <th>description</th>
            <th>amount</th>
            <th>unit_cost</th>
            <th>total_cost</th>
            <th>discount</th>
            <th>comment</th>
          </tr>
        </thead>
        <tbody>
          {costs.map((element, index) => (
            <TableRow costs={element} index={index} key={index} costs_array={costs} />
          ))}
        </tbody>
      </table>
      <button type='button' className='btn btn-info' onClick={handle_add_row}>
        +
      </button>
    </div>
  )
}
