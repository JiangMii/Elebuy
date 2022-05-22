import {Button, message, Modal, Space, Table} from "antd";
import {EditOutlined, DeleteOutlined, SnippetsOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import React, {useState,useEffect,useRef} from "react";
import axios from "axios";
import UpdateRoles from "./updateRoles";
import AddRoles from "./addRoles";
import Permission from "./permission";


const {Column}=Table;
export default function Roles(){

const[roles,setRoles]=useState([]);
const [addRoleForm,setAddRoleForm]=useState(false);//是否显示添加窗口
const [code,setCode]=useState(0);
const[updateForm,setUpdateForm]=useState(false);
const [editRecord,setEditRecord]=useState({});
const [editPermission,setEditPermission]=useState(0);//分配权限时被点击的该行id
const[permissionForm,setPermissionForm]=useState(false);

useEffect(()=>{
    getRoles()
},[code]);


const getRoles=()=>{
    axios.get('http://localhost:3001/roles/all').then(result=>{
        setRoles(result.data.data);
       // console.log(result.data.data[0])
    })
};
    const openAddRole=()=>{
        setAddRoleForm(true);
    };
    const closeAddRole=()=>{
        setAddRoleForm(false);
    };
    const deleteRole=(id)=>{

        Modal.confirm({
            title:'确定删除该角色吗？',
            icon:<EditOutlined/>,
            okText:'确定',

            okType:'danger',
            cancelText:'取消',
            onOk:()=>{
                axios.delete('http://localhost:3001/roles/delete',{data:{id:id}}).then(result=>{
                    console.log(id)
                    message.success(result.data.meta.msg);
                    setCode(result.data.meta.status);
                }).catch(err=>{
                    console.log(err)
                })
            }
        })
    }

const closeUpdateForm=()=>{
        setUpdateForm(false);
};
    const openUpdateForm=(record)=>{
        setUpdateForm(true);
        setEditRecord(record);
    };
    const closePerForm=()=>{
        setPermissionForm(false);
    };

    const openPerForm=(id)=>{
        setPermissionForm(true);
        setEditPermission(id);
      

    }

    return(
        <>
           <Button type={'primary'} icon={<EditOutlined/>} style={{marginBottom:'20px'}} onClick={openAddRole}> 添加角色</Button>

            <AddRoles visible={addRoleForm} closeForm={closeAddRole} modifyCode={setCode}/>
           <UpdateRoles visible={updateForm} closeForm={closeUpdateForm} editRecord={editRecord} setCode={setCode}/>
         <Permission visible={permissionForm} editPermission={editPermission} closeForm={closePerForm} setCode={setCode} />
            <Table border dataSource={roles}  rowKey={(record)=>record.id}>
                <Column dataIndex={'roleId'} key={'roleId'} title={'编号'} align={'center'}/>
                <Column dataIndex={'roleName'} key={'roleName'} title={'角色名称'} align={'center'}/>
                <Column dataIndex={'roleDesc'} key={'roleDesc'} title={'角色描述'} align={'center'}/>
                <Column  key={'action'} title={'操作'} align={'center'} render={(record)=>(
                   <space size={'middle'}>
                    <Button type='link' size='small' icon={<EditOutlined/>} onClick={()=>{openUpdateForm(record)}}> 编辑</Button>
                    <Button type='link' size='small' icon={<DeleteOutlined/>} onClick={()=>{deleteRole(record.roleId)}}> 删除</Button>
                    <Button type='link' size='small' icon={<SnippetsOutlined/>} onClick={()=>{openPerForm(record.roleId)}}> 添加权限</Button>
        </space>
                )}/>
            </Table>



        </>
    )
}