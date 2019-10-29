import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Switch,
  Button,
  Modal,
  Form,
  Input,
  Radio
} from 'antd';
import './system.less';
const Dictionaries =() => {
  let [visible, setVisible] = useState(false);
  let [titles, setTitles] = useState();
  let columns = [
    {
      title: '编号',
      dataIndex: 'key'
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (key, status) => (
        <Switch checked={status.status ? true : false} onClick={() => swClik(key, status)} />
      )
    },
    {
      title: '操作',
      fixed: 'right',
      width: 250,
      render: (status) => <Button type="link" onClick={() => clickBtn(status)}>查看</Button>,
    },
  ];
  let data = [
    {
      key: '1',
      name: 'John Brown',
      status: 0
    },
    {
      key: '2',
      name: 'Jim Green',
      status: 1
    }
  ];

  const swClik =(key, status)  =>{
    data = data.map(item => {
      if (item.key == status.key) {
        if (item.status == 0) {
          item.status = 1
        } else {
          item.status = 0
        }
      }
      return item;
    })
  }
  //新增
  const addList=(params)=> {
    setTitles(titles = "新增")
    setVisible(visible = true);
    let arr= [1,1,3,4,[1,3,4,6,7,9],[2,3],2,[1,[485]]];
    let arr1 =  Array.from(new Set(arr.flat(Infinity))).sort((a,b) => a-b);
    console.log(arr1)
    const map = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);
    
    console.log( [...map.keys()])
    // [1, 2, 3]
    
    console.log([...map.values()])
    // ['one', 'two', 'three']
    
    console.log([...map.entries()])
    // [[1,'one'], [2, 'two'], [3, 'three']]
    
    console.log([...map])
    // let arr1 = arr.flat(Infinity);
    // let arr3 = new Set(arr1);
    // let arr4 = Array.from(arr3)
    // console.log(arr4.sort((a,b)=> a-b))
    new Promise((resolve,reject)=> {

    })

  }
  //操作
   const clickBtn =  async (data)=> {
   let num =   await add()
   console.log(num)
    setTitles(titles = "编辑")
    setVisible(visible = true)
  }
  //弹框确认
  const handleOk=() => {
    setVisible(visible = false)
  };
  const add = () => {
    return 10
  }
  //弹框取消
  const handleCancel = () => {
    setVisible(visible = false)
  };
  return (
    <>
      <div className="ta-r"> <Button type="primary" size="small" onClick={() => addList()}>新增</Button></div>
      <Table 
       className="tables" 
       columns={columns} 
       dataSource={data} 
       />
      <Modal
        title={titles}
        okText="确认"
        cancelText="取消"
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <Form layout="inline">
          <Form.Item label="*收付款方式名称：" labelCol="{span: 3, offset: 12}">
            <Input
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item label="*状态：">
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default Dictionaries;