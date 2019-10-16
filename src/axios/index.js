import { get} from './url';
export const getJoke = (context, payload) =>{
  get("/getJoke", payload)
}
    