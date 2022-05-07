import RowBuilder from './RowBuilder'

const TableBuilder = ({ items, cols, headers, title, offset, handle_click, click_icon }) => {
  return (
    <div>
      <div className='tables_page'>
        <h3 className='mb-2'> {title}</h3>
        <table className='table user-table mb-0'>
          <thead>
            <tr>
              <th scope='col' className='border-0 text-muted font-medium pl-4'>
                #
              </th>
              {cols.map((col, index) => (
                <th scope='col' className='border-0 text-muted font-medium pl-4' key={col}>
                  {headers[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((data, index) => (
              <RowBuilder data={data} counter={index + 1 + Number(offset)} key={data.id} cols={cols} handle_click={handle_click} click_icon={click_icon} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableBuilder
