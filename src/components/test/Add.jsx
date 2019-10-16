import React, { useState, useEffect, useRef } from "react";
import { getJoke } from '../../axios';
import { Button } from 'antd';
let id;
function Add() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
     id = setInterval(() => {
      setCount(c => c + step);
    }, 1000);
    return () => clearInterval(id);
  }, [step]);
  useEffect(() => {
    let obj={page:1,count:2,type:'video'};
    getJoke(obj)
  }, []);
  
  return (
    <>
      <h1>{count}</h1>
      <button onClick={()=> clearInterval(id)}>5435345345</button>
      <Button type="primary">Primary</Button>
      <input value={step} onChange={e => setStep(Number(e.target.value))} />
    </>
  );
}

export default Add;
