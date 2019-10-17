import React, { useContext } from "react";
import { AppContext } from './../../store/index';
function my() {
  const store = useContext(AppContext)
  let arr =(store.obj && store.obj.result) || [];
  return (
    <>
      <div>{store.getCount}</div>
      {
        arr.map(item => {
          return (
            <div>{item.top_comments_content}</div>
          )
        })

      }
    </>
  );
}
export default my;