import { Collapse, fade, makeStyles, Paper, Typography } from '@material-ui/core'
import { useState } from "react"
import AddCardorListText from './AddCardorListText';

function AddCardorList({type, listId}) {
  const [open, setOpen] = useState(true)
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <AddCardorListText setOpen={setOpen} type={type} listId = {listId}/>
      </Collapse>
      <Collapse in={!open}>
        <Paper className={classes.addCardorListText} onClick={() => setOpen(true)}>
          <Typography> 
            {
              type === "card" ? "+ Add a card" : "+ Add another list"
            }
            
          </Typography>
        </Paper>
      </Collapse>
    </div>
  )
}

const useStyle = makeStyles(theme => ({
  root: {
    width: "300px",
    marginTop: theme.spacing(1)
  },
  addCardorListText: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: "#ebecf0",
    "&:hover" : {
      backgroundColor: fade("#000", 0.25)
    }
  }
}))

export default AddCardorList
