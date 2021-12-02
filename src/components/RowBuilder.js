const words_he = require('../utils/words_he').words_he

const RowBuilder = ({ counter, cols, data, handle_edit }) => {
  return (
    <tr>
      <td className='pl-4'>{counter}</td>
      {cols.map((col, index) => (
        <td key={col + index}>{<span className='text-muted'>{data[col]}</span>}</td>
      ))}
      {handle_edit ? (
        <td className='pl-4'>
          <button onClick={() => handle_edit(data.id, Number(counter) )}>{words_he['edit']}</button>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  )
}

export default RowBuilder
