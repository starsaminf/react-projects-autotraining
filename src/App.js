import { makeStyles } from "@material-ui/core"
import TrelloList from "./components/TrelloList";
import background_image from "./background.png"
import AddCardorList from "./components/AddCardorList";
import mockData from './mockdata.js'
import { useState } from "react"
import ContextAPI from "./ContextAPI"
import uuid from "react-uuid"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

function App() {
  const classes = userStyle()
  const [data, setData] = useState(mockData)
  const updateListTitle = (newTitle, listId) => {
    const list = data.lists[listId]
    list.title = newTitle
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    })
  }
  const addCard = (title, listId) => {
    console.log(listId)
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title
    }
    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    })
  }
  const addList = (title) => {
    const newListId = uuid()
    setData({
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: {
          id: newListId,
          title,
          cards: []
        }
      }
    })
  }
  const onDragEnd = (result) => {
    const { destination, destination: { droppableId: destdroppableId, index: destIndex }, source, source: { droppableId: sourcedroppableId, index: sourceIndex }, draggableId, type } = result

    if (!destination) {
      return;
    }
 
    if (type === "list") {
      const newListIds = data.listIds
      newListIds.splice(sourceIndex, 1)
      newListIds.splice(destIndex, 0, draggableId)
      return;
    }
    const sourceList = data.lists[sourcedroppableId]
    const destinationList = data.lists[destdroppableId]
    const draggingCard = sourceList.cards.filter((card) => card.id === draggableId)[0]

    if (sourcedroppableId === destdroppableId) {
      sourceList.cards.splice(sourceIndex, 1)
      destinationList.cards.splice(destIndex, 0, draggingCard)
      setData({
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        }
      })
    } else {
      sourceList.cards.splice(sourceIndex, 1)
      destinationList.cards.splice(destIndex, 0, draggingCard)

      setData({
        ...data,
        [sourceList.id]: sourceList,
        [destinationList.id]: destinationList
      })
    }

  }
  return (
    <ContextAPI.Provider value={{ updateListTitle, addCard, addList }}>
      <div className={classes.root}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="12345" type="list" direction="horizontal">
            {
              (provided) => (
                <div className={classes.container} ref={provided.innerRef} {...provided.droppableProps}>
                  {
                    data.listIds.map(listID => {
                      const list = data.lists[listID]
                      return <TrelloList list={list} key={listID} />
                    })
                  }
                  <div>
                    <AddCardorList type="list" />
                    {provided.placeholder}
                  </div>
                </div>
              )
            }
          </Droppable>
        </DragDropContext>
      </div>
    </ContextAPI.Provider>
  );
}
const userStyle = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    overflow: "auto",
    backgroundImage: `url(${background_image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  container: {
    display: "flex"
  }
}))

export default App;
