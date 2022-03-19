import moment from 'moment'

const RowBuilder = ({ counter, cols, data, handle_click, click_icon }) => {
  return (
    <tr>
      <td>{counter}</td>
      {cols.map((col, index) => (
        <td key={col + index}>{<span>{col === 'created_at' || col === 'updated_at' ? moment(data[col]).format('HH:mm:ss YYYY-MM-DD') : data[col]}</span>}</td>
      ))}
      {handle_click ? (
        <td className='pl-4'>
          <button className='btn btn-outline-dark btn-sm' onClick={() => handle_click(data.id, Number(counter))}>
            {click_icon}
          </button>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  )
}

export default RowBuilder
