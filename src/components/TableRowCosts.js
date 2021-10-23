import React, { useState } from 'react'
export default function TableRow({ index, costs, costs_array }) {
  const [description, setDescription] = useState(costs.description)
  const [amount, setAmount] = useState(costs.amount)
  const [unit_cost, setUnitCost] = useState(costs.unit_cost)
  const [total_costs, setTotalCosts] = useState(costs.total_costs)
  const [discount, setDiscount] = useState(costs.discount)
  const [comment, setComment] = useState(costs.comment)

  const handle_description = (e) => {
    setDescription(e)
    costs_array[index].description = e
  }
  const handle_amount = (e) => {
    setAmount(e)
    costs_array[index].amount = e
  }
  const handle_unit_cost = (e) => {
    setUnitCost(e)
    costs_array[index].unit_cost = e
  }
  const handle_total_costs = (e) => {
    setTotalCosts(e)
    costs_array[index].total_costs = e
  }
  const handle_discount = (e) => {
    setDiscount(e)
    costs_array[index].discount = e
  }
  const handle_comment = (e) => {
    setComment(e)
    costs_array[index].comment = e
  }

  return (
    <tr>
      <td>
        <input
          type='text'
          value={description}
          onChange={(e) => {
            handle_description(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='text'
          value={amount}
          onChange={(e) => {
            handle_amount(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='text'
          value={unit_cost}
          onChange={(e) => {
            handle_unit_cost(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='text'
          value={total_costs}
          onChange={(e) => {
            handle_total_costs(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='text'
          value={discount}
          onChange={(e) => {
            handle_discount(e.target.value)
          }}
        />
      </td>
      <td>
        <input
          type='text'
          value={comment}
          onChange={(e) => {
            handle_comment(e.target.value)
          }}
        />
      </td>
    </tr>
  )
}
