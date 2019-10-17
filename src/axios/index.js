import { get} from './url';  
export default {
  getJoke: params => get('/getJoke', params),
  meitu:  params => get('/meituApi', params),
  videoCategory:  params => get('/videoCategory', params)
}