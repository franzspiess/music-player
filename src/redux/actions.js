import {paramCreator} from '../functions/functions';

const fetchSearch = (obj) => ({
  type:'FETCH',
  api: {
    route: paramCreator(obj)
  }
})

const fetchOne = (id) => ({
  type:'FETCH_ONE',
  api: {
    route: `lookup?id=${id}`
  }
})

const updateQuery = (key) => ({
  type: 'QUERY',
  data: key

})

export {
  fetchSearch,
  updateQuery,
  fetchOne
}