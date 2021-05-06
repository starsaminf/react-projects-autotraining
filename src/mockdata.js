const mockData = {
  lists: {
    "01list": {
      id: "01list",
      title: "To do",
      cards: [{
          id: "01list",
          title: "Buy lettuce"
        }, {
          id: "02card",
          title: "Buy tomato"
        }, {
          id: "03card",
          title: "Buy breakfast"
        }
      ]
    },
    "02list": {
      id: "02list",
      title: "In progress",
      cards: []
    }
  },
  listIds: ["01list", "02list"]
}

export default mockData;