import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
// import AddIcon from '@material-ui/icons/Add'
import Event from '@material-ui/icons/Event'

export default function FloatingActionButtons({ handle_click, button_content }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(5),
    },
  }))
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Fab color='primary' onClick={handle_click}>
        <Event className='floating_button' />
      </Fab>
    </div>
  )
}
