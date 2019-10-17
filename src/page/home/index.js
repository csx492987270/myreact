import React, { useState, useEffect,useContext} from "react";
import { Carousel } from 'antd';
import  Api from '../../axios';
import './home.css';
import {Observer, observer} from 'mobx-react-lite';
import {AppContext} from './../../store/index';
function home() {
  const [dataList, getList] = useState([]);
  const [videoCategoryList, getVideo] = useState([]);
  const [num, setNum] = useState(10);
  const store = useContext(AppContext);
  useEffect(() => {
    let obj = { page: 2, count: 2, type: 'video' };
    loadData(obj);
  }, []);
  useEffect(() => {
    videoData();
  }, []);

  const loadData = async (obj)=> {
    let res = await Api.getJoke(obj);
    getList(res.result);
    store.saveObj(res)
  }

  const videoData = async ()=> {
    let res = await Api.videoCategory();
    getVideo(res.result);
  }
  return (
    <>
      <Carousel autoplay>
        {
          dataList.map((item, index) => {
            let sectionStyle = {
              width: "100%",
              height: "300px",
              background: `url(${item.thumbnail})`
            };
            return (
              <div
                key={index}
              >
                <div style={sectionStyle}></div>
              </div>
            )
          })
        }
      </Carousel>
      <p>num: {num}</p>
      <button onClick={() => setNum(num + 1)}>set num</button>

      {/* 深度监听 store 变化并进行重渲染，导致下面两行结果相同 */}
      <p>Count: {store.getCount}</p>
      <Observer>{() => <p>Count2: {store.getCount}</p>}</Observer>
      <button onClick={() => store.handleCount()}>Counter Add</button>
    </>
  );
}
export default home;