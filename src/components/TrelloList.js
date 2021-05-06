import { Paper, CssBaseline, makeStyles } from "@material-ui/core"
import { Draggable, Droppable } from "react-beautiful-dnd"
import AddCardorList from "./AddCardorList"
import ListTitle from "./ListTitle"
import TrelloCard from "./TrelloCard"

const TrelloList = ({ list, index }) => {
  const classes = userStyle();
  return (
    <Draggable draggableId={list.id} index={index}>
      {
        (provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <Paper className={classes.root} {...provided.dragHandleProps}>
              <CssBaseline />
              <ListTitle title={list.title} listId={list.id} />
              <Droppable droppableId={list.id}>
                {
                  (provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {
                        list.cards.map((card, index) => (
                          <TrelloCard card={card} key={card.id} index={index} />
                          ))
                        }
                        {provided.placeholder}
                    </div>
                  )
                }
              </Droppable>
              <AddCardorList type="card" listId={list.id} />
            </Paper>
          </div>
        )
      }

    </Draggable>
  )
}
const userStyle = makeStyles(theme => ({
  root: {
    width: "300px",
    backgroundColor: "#ebecf0",
    margin: theme.spacing(1)
  }
}))
export default TrelloList
