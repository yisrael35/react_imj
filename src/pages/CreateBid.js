//react
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

//material
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

//components
import TableCosts from '../components/pages/TableCosts'
import CreateBidComponent from '../components/pages/CreateBid'
import TableScheduleTimeEvent from '../components/pages/TableScheduleTimeEvent'
import EmailAndDownload from '../components/general/EmailAndDownload'

//redux
import * as action_bid from '../redux/Bid/action'
import * as action_popUp from '../redux/PopUp/action'
import moment from 'moment'

import Dictionary from '../utils/dictionary'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: 'auto',
    textAlign: 'center',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  table: {
    textAlign: 'center',
    padding: theme.spacing(3),
    margin: 'auto',
  },
  padding: {
    padding: theme.spacing(1),
  },
  currencies: {
    width: '200px',
    marginTop: theme.spacing(2),
  },
}))

const CreateBid = (props) => {
  const user = useSelector((state) => state.auth.userContent)
  const dictionary = Dictionary()
  const currencies = [
    { value: 'nis', label: dictionary['nis'] },
    { value: 'usd', label: dictionary['dollar'] },
  ]
  const dispatch = useDispatch()

  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [total_b_discount, setTotalBDiscount] = useState(0)
  const [total_a_discount, setTotalADiscounts] = useState(0)
  const [total_discount, setDiscount] = useState(0)
  const [currency, setCurrency] = useState('nis')
  const [bid_id, setBidId] = useState(undefined)

  const [bid_info, setBidInfo] = useState({
    event_type: '',
    location: '',
    user: user.id,
    event_date: moment().format('YYYY-MM-DD'),
    event_comment: '',
    client_id: '',
    event_name: '',
    max_participants: 2,
    language: 'he',
  })
  const [enable_send, setEnableSend] = useState(false)
  const [costs, setCosts] = useState([
    { description: '', amount: '', unit_cost: '', total_cost: '', discount: '', comment: '' },
    { description: '', amount: '', unit_cost: '', total_cost: '', discount: '', comment: '' },
    { description: '', amount: '', unit_cost: '', total_cost: '', discount: '', comment: '' },
  ])
  const [schedule_time_event, setScheduleTimeEvent] = useState([
    { start_time: '', end_time: '', activity_description: '' },
    { start_time: '', end_time: '', activity_description: '' },
    { start_time: '', end_time: '', activity_description: '' },
  ])
  const steps = [dictionary['new_bid'], dictionary['time_schedule'], dictionary['costs']]

  useEffect(() => {
    setEnableSend(true)
  }, [schedule_time_event])

  useEffect(() => {
    let total_cost = 0
    let discount = 0
    for (const cost of costs) {
      total_cost += Number(cost.total_cost)
      discount += Number(cost.discount)
    }
    setDiscount(Number(discount).toFixed(2))
    setTotalBDiscount(Number(total_cost).toFixed(2))
    setTotalADiscounts(Number(total_cost - discount).toFixed(2))
    if (total_cost > 0) {
      setEnableSend(true)
    }
  }, [costs])

  if (activeStep === steps.length) {
    const message = (
      <Grid>
        <span>
          <h3 className='text-muted'>{dictionary['bid_created']}</h3>
          <h5>{`${dictionary['bid_id']}: ${bid_id}`}</h5>
        </span>
      </Grid>
    )
    const content = <EmailAndDownload message={message} bid_id={bid_id} />
    dispatch(action_popUp.setPopUp(content))
  }

  const handle_save_bid = async () => {
    const bid_id = await dispatch(action_bid.create_new_bid(bid_info))
    if (bid_id) {
      setBidId(bid_id)
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else {
      const error_msg = (
        <div>
          <div> {dictionary['error_accord']}</div>
        </div>
      )
      dispatch(action_popUp.setPopUp(error_msg))
    }
  }

  const handle_save_schedule_event = async () => {
    const data_schedule = []
    for (const schedule of schedule_time_event) {
      if (schedule.start_time !== '' && schedule.end_time) {
        data_schedule.push(schedule)
      }
    }
    const res = await dispatch(action_bid.create_schedule_event({ schedule_time_event: data_schedule, bid_id }))
    if (res) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else {
      const error_msg = (
        <div>
          <div> {dictionary['error_accord']}</div>
        </div>
      )
      dispatch(action_popUp.setPopUp(error_msg))
    }
  }

  const handle_save_costs = async () => {
    const data_costs = []
    for (const cost of costs) {
      if (cost.amount !== '' && cost.total_cost !== '' && cost.unit_cost) {
        data_costs.push(cost)
      }
    }
    const res = await dispatch(action_bid.create_costs({ costs: data_costs, bid_id }))
    if (res) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setEnableSend(false)
    } else {
      const error_msg = (
        <div>
          <div> {dictionary['error_accord']}</div>
        </div>
      )
      dispatch(action_popUp.setPopUp(error_msg))
    }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid>
            <CreateBidComponent bid_info={bid_info} setBidInfo={setBidInfo} handle_save_bid={handle_save_bid} />
          </Grid>
        )
      case 1:
        return (
          <Grid>
            <Grid container>
              <Grid item xs={12}>
                <span>
                  <h3 className='text-muted'>{dictionary['bid_created']}</h3>
                </span>
                {`${dictionary['bid_id']}: ${bid_id}`}
              </Grid>
              <Grid item className={classes.table}>
                <TableScheduleTimeEvent setScheduleTimeEvent={setScheduleTimeEvent} schedule_time_event={schedule_time_event} />
              </Grid>
              <Grid item xs={12}>
                <button className='btn btn-success m-4' onClick={handle_save_schedule_event} disabled={!enable_send}>
                  {dictionary['save']}
                </button>
                <button
                  className='btn btn-outline-dark m-2'
                  onClick={() => {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1)
                  }}
                >
                  {dictionary['skip']}
                </button>
              </Grid>
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <Grid>
            <Grid item xs={12}>
              <span>
                <h3 className='text-muted'>{dictionary['bid_created']}</h3>
              </span>
              {`${dictionary['bid_id']}: ${bid_id}`}
            </Grid>
            <TableCosts
              setCosts={setCosts}
              costs={costs}
              calculation={{
                total_b_discount,
                total_a_discount,
                total_discount,
                setTotalBDiscount,
                setTotalADiscounts,
                setDiscount,
              }}
            />
            <Select
              className={classes.currencies}
              placeholder={dictionary['nis']}
              options={currencies}
              id='currency'
              label='currency'
              onChange={(e) => {
                setCurrency(e.value)
              }}
            />
            <div>
              <div>
                {dictionary['total_cost_before_discount']} {total_b_discount} {currency === 'nis' ? dictionary['nis'] : dictionary['dollar']}
              </div>
              <div>
                {dictionary['total_discount']} {total_discount} {currency === 'nis' ? dictionary['nis'] : dictionary['dollar']}
              </div>
              <div>
                {dictionary['total_cost_after_discount']} {total_a_discount} {currency === 'nis' ? dictionary['nis'] : dictionary['dollar']}
              </div>
            </div>
            <button className='btn btn-success m-4' onClick={handle_save_costs} disabled={!enable_send}>
              {dictionary['save']}
            </button>
            <button
              className='btn btn-outline-dark m-2'
              onClick={() => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
              }}
            >
              {dictionary['skip']}
            </button>
          </Grid>
        )
      default:
        return 'Unknown step'
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <span className={classes.padding}>{label}</span>
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}> {dictionary['bid_created']}</Typography>
          </div>
        ) : (
          <div>
            <Grid className={classes.instructions}>{getStepContent(activeStep)}</Grid>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateBid
