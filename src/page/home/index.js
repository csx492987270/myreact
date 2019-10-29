import React, { useState, useEffect,useContext} from "react";
import { Carousel } from 'antd';
import  Api from '../../axios';
import './home.less';
import {Observer, observer} from 'mobx-react-lite';
import {AppContext} from './../../store/index';
import { Link } from 'react-router-dom';
import useWindowPosition from './state'
// import PropTypes from 'prop-types';
function home(str) {
  const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
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
  const position = useWindowPosition();
  const [size, setSize] = useState({ width: 100, height: 100 });
  useEffect(()=>{
    
  },[])
  // useEffect(() => {  
  //   // 注意：这是个简化版的实现
  //   window.addEventListener('mousemove', handleWindowMouseMove);
  //   return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  // }, [state]);
  const loadData = async (obj)=> {
    let res = await Api.getJoke(obj);
    getList(res.result);
    store.saveObj(res)
  }
  const handleWindowMouseMove =(e)=> {
    console.log(state)
    // 展开 「...state」 以确保我们没有 「丢失」 width 和 height
    setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
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
      <li><Link to="/my">34545</Link></li>
      <p>num: {num}</p>
      <button onClick={() => setNum(num + 1)}>set num</button>

      {/* 深度监听 store 变化并进行重渲染，导致下面两行结果相同 */}
      <p>Count: {store.getCount}</p>
      <Observer>{() => <p>Count2: {store.getCount}</p>}</Observer>
      <button onClick={() => store.handleCount()}>Counter Add</button>
    </>
  );
}
// home.propTypes = {
//   str:PropTypes.number
// }
export default home;