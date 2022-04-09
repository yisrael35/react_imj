import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'

export default function FloatingActionButtons({ handle_click, button_content }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'absolute',
      bottom: theme.spacing(2),
      left: theme.spacing(5),
    },
  }))
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Fab color='primary' onClick={handle_click}>
        {button_content}
      </Fab>
    </div>
  )
}
