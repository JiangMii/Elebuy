import {Button, Space, Table, Input, Radio} from "antd";
import {FormOutlined,EnvironmentOutlined} from "@ant-design/icons";
import {useState,useEffect} from "react";
import axios from "axios";
import UpdateOrder from "./updateOrder";
import Location from "./location";
const {Column} = Table
const {Search} = Input

export default function Order() {
    const [order,setOrder] = useState([])
    const [code,setCode] = useState(0)



    //挂载
    useEffect(()=> {
        getOrder()
    },[code])

    //获取订单数据
    const getOrder = ()=> {
        axios.get('http://localhost:3001/order/search').then(result=> {
            console.log(result.data.data)
            setOrder(result.data.data)
        })
    }
   // const dateFormat=function (dt){
   //      const dat=new Date(dt)
   //     const y=dat.getFullYear()
   //     const m = (dat.getMonth()+1).toString().padStart(2,'0')
   //     const d = (dat.getDate()-1).toString().padStart(2,'0')
   //     const hh = (dat.getHours()).toString()
   //     const mm = dat.getMinutes().toString().padStart(2,'0')
   //     const ss = dat.getSeconds().toString().padStart(2,'0')
   //
   //
   //      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
   // }
   const dateFormat=function (dt){
        let year=dt.split('T')[0]
       let hour=dt.split('T')[1].split('.')[0]
       return `${year} ${hour}`
   }

    //修改信息
    //修改信息框开合状态
    const [editRecord,setEditRecord] = useState({})
    const [updateOrder,setUpdateOrder] = useState(false)
    //打开
    const openUpdateOrder = (record)=> {
        setEditRecord(record)
        setUpdateOrder(true)
    }
    //关闭
    const closeUpdateOrder = ()=> {
        setUpdateOrder(false)
    }


    //定位信息
    const [location,setLocation] = useState(false)
    //打开
    const openLocation = ()=> {
        setLocation(true)
    }
    //关闭
    const closeLocation = ()=> {
        setLocation(false)
    }
    const onSearch=(value)=>{
        console.log(value)
        axios.get(`http://localhost:3001/order/find/${value}`).then(result=>{
            console.log(result.data.data)
            let arr=[],obj=result.data.data
            arr.push(obj)
            setOrder(arr)

        })
    }

    return (
        <>
            <div>
                <Search placeholder='请输入内容' style={{width:220,marginBottom:'10px'}} onSearch={onSearch}/>
            </div>
            {/*修改订单信息*/}
            <UpdateOrder visible={updateOrder} close={closeUpdateOrder} edit={editRecord} modefyCode={setCode}/>
            {/*定位信息*/}
            <Location visible={location} close={closeLocation}/>
            <Table bordered dataSource={order} rowKey={(record)=>record.order_number}>
                <Column align='center' key='order_id' dataIndex='order_id' title='#'/>
                <Column align='center' dataIndex='order_number' key='order_number' title='订单编号'/>
                <Column align='center' dataIndex='order_price' key='order_price' title='订单价格'/>
                <Column align='center' dataIndex='pay_status' key='pay' title='是否付款' render={(pay_status)=> (
                    pay_status === 0?<Button type='danger' size='small' value={0}>未付款</Button>:
                        <Button type='primary' size='small' value={1}>已付款</Button>
                )}>
                </Column>
                <Column align='center' dataIndex='is_send' key='is_send' title='是否发货' render={(is_send)=> (
                    is_send === 0?<span>否</span>:<span>是</span>
                    )}/>
                <Column align='center' dataIndex='create_time' key='create_time' title='下单时间'  render={(create_time)=>{
                    console.log(create_time)
                   return  dateFormat(create_time)
                }}/>
                <Column key='action' title='操作' align='center' render={(record)=> (
                    <Space size='middle'>
                        <Button type='link' size='middle'  icon={<FormOutlined/>} onClick={()=>openUpdateOrder(record)}>编辑</Button>
                        <Button type='link' size='middle' style={{color:'#52c41a'}} icon={<EnvironmentOutlined/>} onClick={()=>openLocation()}>查看</Button>
                    </Space>
                )}/>
            </Table>
        </>
    )
}

