const filterReducer = (state = 'ALL', action) => {
    console.log(action)
    switch (action.type) {
      case 'SET_FILTER':
        return action.filter
      default:
        return state
    }
  }
  
  export const filterChange = (filter) => {
    if (filter === "") {
        return {
            type: 'ALL'
        }
    } else return {
      type: 'SET_FILTER',
      filter: filter
    }
  }
  
  export default filterReducer