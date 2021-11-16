import React from 'react'
export default function TableRow({ index, costs_array, setCosts }) {
  const handle_description = (e) => {
    costs_array[index].description = e
    setCosts([...costs_array])
  }
  const handle_amount = (e) => {
    costs_array[index].amount = e
    costs_array[index].total_cost = Number(e) * Number(costs_array[index].unit_cost)
    setCosts([...costs_array])
  }
  const handle_unit_cost = (e) => {
    costs_array[index].unit_cost = e
    costs_array[index].total_cost = Number(e) * Number(costs_array[index].amount)
    setCosts([...costs_array])
  }
  // const handle_total_cost = (e) => {
  //   costs_array[index].total_cost = e
  //   setCosts([...costs_array])
  // }
  const handle_discount = (e) => {
    costs_array[index].discount = e
    setCosts([...costs_array])
  }
  const handle_comment = (e) => {
    costs_array[index].comment = e
    setCosts([...costs_array])
  }

  return (
    <tr>
      <td>
        <input
          type='text'
          value={costs_array[index].description}
          onChange={(e) => {
            handle_description(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='number'
          min='0'
          step='any'
          value={costs_array[index].amount}
          onChange={(e) => {
            handle_amount(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='number'
          min='0'
          step='any'
          value={costs_array[index].unit_cost}
          onChange={(e) => {
            handle_unit_cost(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='number'
          min='0'
          step='any'
          value={costs_array[index].total_cost}
          onChange={(e) => {
            // handle_total_cost(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='number'
          min='0'
          step='any'
          value={costs_array[index].discount}
          onChange={(e) => {
            handle_discount(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='text'
          value={costs_array[index].comment}
          onChange={(e) => {
            handle_comment(e.target.value)
          }}
        />
      </td>
    </tr>
  )
}
