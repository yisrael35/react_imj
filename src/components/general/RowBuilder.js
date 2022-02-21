import { FaRegEdit } from 'react-icons/fa'

const RowBuilder = ({ counter, cols, data, handle_edit }) => {
  return (
    <tr>
      <td>{counter}</td>
      {cols.map((col, index) => (
        <td key={col + index}>{<span>{data[col]}</span>}</td>
      ))}
      {handle_edit ? (
        <td className='pl-4'>
          <button className='btn btn-secondary btn-sm' onClick={() => handle_edit(data.id, Number(counter))}>
            <FaRegEdit
              style={{
                fontSize: '18px',
                margin: '2px',
              }}
            />
          </button>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  )
}

export default RowBuilder
