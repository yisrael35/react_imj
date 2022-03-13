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

const words_he = require('../utils/words_he').words_he

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: 'auto',
    textAlign: 'center',
  },
  button: {
    marginRight: theme.spacing(1),
    // background: '#078839',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  ScheduleTimeEvent: {
    margin: theme.spacing(10),
  },
  costs: {
    margin: theme.spacing(10),
  },
  padding: {
    padding: theme.spacing(1),
  },
}))

const CreateBid = (props) => {
  const user = useSelector((state) => state.auth.userContent)
  const dispatch = useDispatch()

  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [total_b_discount, setTotalBDiscount] = useState(0)
  const [total_a_discount, setTotalADiscounts] = useState(0)
  const [total_discount, setDiscount] = useState(0)
  const [currency, setCurrency] = useState('nis')
  //TODO
  const [bid_id, setBidId] = useState(undefined)
  // const [bid_id, setBidId] = useState('81490f6d-97e0-11ec-94d1-005056c00001')

  const [bid_info, setBidInfo] = useState({
    event_type: undefined,
    location: undefined,
    user: user.id,
    event_date: moment().format('YYYY-MM-DD'),
    event_comment: undefined,
    client_id: undefined,
    event_name: undefined,
    max_participants: undefined,
    language: 'he',
  })
  const [enable_send, setEnableSend] = useState(false)
  const [costs, setCosts] = useState([{ description: '', amount: '', unit_cost: '', total_cost: '', discount: '', comment: '' }])
  const [schedule_time_event, setScheduleTimeEvent] = useState([{ start_time: '', end_time: '', activity_description: '' }])
  const steps = [words_he['new_bid'], words_he['time_schedule'], words_he['costs']]

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
    const content = <EmailAndDownload message={` bid number: ${bid_id} create successfully `} bid_id={bid_id} />
    dispatch(action_popUp.setPopUp(content))
  }

  const handle_save_bid = async () => {
    const bid_id = await dispatch(action_bid.create_new_bid(bid_info))
    if (bid_id) {
      setBidId(bid_id)
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else {
      //TODO -- display message
      const error_msg = (
        <div>
          <div>Error accord please try again</div>
        </div>
      )
      dispatch(action_popUp.setPopUp(error_msg))
    }
    // props.history.push('/Home')
  }

  const handle_save_schedule_event = async () => {
    const res = await dispatch(action_bid.create_schedule_event({ schedule_time_event, bid_id }))
    console.log({ res })
    if (res) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else {
      //TODO -- display message
    }
  }

  const handle_save_costs = async () => {
    const res = await dispatch(action_bid.create_costs({ costs, bid_id }))
    if (res) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setEnableSend(false)
    } else {
      //TODO -- display message
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
          <Grid className={classes.ScheduleTimeEvent}>
            <Grid>
              <span>
                <h3>{words_he['bid_created']}</h3>
              </span>
              {`${words_he['bid_id']}: ${bid_id}`}
            </Grid>
            <TableScheduleTimeEvent setScheduleTimeEvent={setScheduleTimeEvent} schedule_time_event={schedule_time_event} />
            {/* TODO */}
            <button className='btn btn-success m-4' onClick={handle_save_schedule_event} disabled={!enable_send}>
              {words_he['save']}
            </button>
            <button
              className='btn btn-outline-dark m-2'
              onClick={() => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
              }}
            >
              {words_he['skip']}
            </button>
          </Grid>
        )
      case 2:
        return (
          <Grid className={classes.costs}>
            <Grid>
              <div>{words_he['bid_created']}</div>
              {`${words_he['bid_id']}: ${bid_id}`}
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
              className={'select'}
              placeholder={words_he['nis']}
              options={currencies}
              id='currency'
              label='currency'
              onChange={(e) => {
                setCurrency(e.value)
              }}
            />
            <div>
              <div>
                {words_he['total_cost_before_discount']} {total_b_discount} {currency === 'nis' ? words_he['nis'] : words_he['dollar']}
              </div>
              <div>
                {words_he['total_discount']} {total_discount} {currency === 'nis' ? words_he['nis'] : words_he['dollar']}
              </div>
              <div>
                {words_he['total_cost_after_discount']} {total_a_discount} {currency === 'nis' ? words_he['nis'] : words_he['dollar']}
              </div>
            </div>
            {/* TODO */}
            <button className='btn btn-success m-4' onClick={handle_save_costs} disabled={!enable_send}>
              {words_he['save']}
            </button>
            <button
              className='btn btn-outline-dark m-2'
              onClick={() => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
              }}
            >
              {words_he['skip']}
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
            <Typography className={classes.instructions}> {words_he['bid_created']}</Typography>
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

const currencies = [
  { value: 'nis', label: words_he['nis'] },
  { value: 'usd', label: words_he['dollar'] },
]
