import {Table, Space, Button,Input,Modal,message,Switch} from "antd";
import {FormOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import React,{useEffect,useState,useRef} from "react";
import axios from "axios";
import AddUser from "./addUser";
import UpdateUser from "./updateUser";
const {Column} = Table
const {Search} = Input

function User() {
    const [users,setUsers] = useState([])
    const [code,setCode] = useState(0)

    //挂载
    useEffect(()=> {
        getUsers()
    },[code])

    //获取用户信息
    const getUsers = ()=> {
        axios.get('http://localhost:3001/users/all').then(result=> {
            console.log(result.data.data)
            setUsers(result.data.data)
        })
    }

    //添加用户
    //是否打开添加用户信息框状态
    const [addUser,setAddUser] = useState(false)
    //打开添加用户添加框
    const openAddUser = ()=> {
        setAddUser(true)
    }
    //关闭添加用户添加框
    const closeAddUser = ()=> {
        setAddUser(false)
    }

    //查找某个用户
    const search = React.createRef()

    //搜索框查找信息
    const onSearch = (value)=> {
        console.log(value)
        axios.get('http://localhost:3001/users/search',{params:{value:value}}).then(result=> {
            let arr=[]
            arr.push(result.data.data)
            setUsers(arr)
            message.success(result.data.meta.msg)
        })
    }

    //删除用户信息
    const deleteUser = (id)=> {
        Modal.confirm({
            title:'确定删除吗？',
            icon:<ExclamationCircleOutlined/>,
            okText:'确定',
            okType:'danger',
            cancelText:'取消',
            onOk:()=> {
                axios.delete(`http://localhost:3001/users/delete/${id}`).then(result=> {
                    message.success(result.data.meta.msg)
                    setCode(result.data.meta.status)
                })
            }
        })
    }

    //修改用户信息
    //存储选中编辑的数据
    const [editRecord,setEditRecord] = useState({})
    //是否打开修改用户添加框
    const [updateUser,setUpdateUser] = useState(false)
    //打开
    const openUpdateUser = (record)=> {
        setUpdateUser(true)
        //传入选中数据
        setEditRecord(record)
    }
    //关闭
    const closeUpdateUser = ()=> {
        setUpdateUser(false)
    }

    //修改用户状态
    const [state,setState] = useState(false)
    const changeState = (record) => {
        // setState(!state)
        console.log(record)
        axios.put('http://localhost:3001/users/change',{data:record}).then(result=>{
            message.success(result.data.meta.msg)
        })
    }

    return (
        <>
            <div>
                {/*搜索框*/}
                <Search
                    placeholder="请输入内容"
                    enterButton
                    style={{width:'240px',marginBottom:'10px'}}
                    // ref={search}
                    onSearch={onSearch}
                />
                {/*<Button onClick={searchUser}>搜索</Button>*/}
                <Button type='default' style={{margin:'0 5px 2px'}} onClick={openAddUser}>添加用户</Button>
            </div>
            {/*添加信息框*/}
            <AddUser visible={addUser} close={closeAddUser} modifyCode={setCode}/>
            {/*更新信息框*/}
            <UpdateUser visible={updateUser} close={closeUpdateUser} edit={editRecord} modifyCode={setCode}/>
            {/*表格展示数据*/}
            <Table border dataSource={users} rowKey={(record) => record.mg_name}>
                <Column key='id' dataIndex='id' align={'center'} title='#'/>
                <Column dataIndex='username' key='username' align={'center'} title='姓名'/>
                <Column dataIndex='email' key='email' align={'center'} title='邮箱'/>
                <Column dataIndex='mobile' key='mobile' align={'center'} title='电话'/>
                <Column dataIndex='rid' key='rid' align={'center'} title='角色' render={(rid)=> (
                    rid === 0?<span>管理员</span>:<span>超级管理员</span>
                )}/>
                <Column dataIndex='mg_state' key='mg_state' align={'center'} title='状态' render={(record)=> (
                    // mg_state === 0?<Switch checked={state}/>:<Switch checked={!state}/>
                   <Switch onChange={( )=> changeState(record)} defaultChecked={record.mg_state===1?true:false}/>
                )}/>
                <Column key='action' title='操作' align='center' render={(record)=> (
                    <Space size='middle'>
                        <Button type='link' size='middle' icon={<FormOutlined/>} onClick={()=>openUpdateUser(record)}/>
                        <Button danger type='link' size='middle' icon={<DeleteOutlined/>} onClick={()=> deleteUser(record.id)}/>
                    </Space>
                )}/>
            </Table>
        </>
    )
}

export default User