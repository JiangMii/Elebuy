import React,{useState} from "react";
import {Button,Modal,message,Form,Input}from 'antd';
import axios from "axios";

export default function updateRoles(props){
    const updateRolesRef=React.createRef();


    return(
        <>
        <Modal
            title={<div style={{width:'100%',cursor:'move'}}>
                更新信息
            </div>}
            visible={props.visible}
            okText={'提交'}
            okCancel={'取消'}
            onOk={async ()=>{
                await updateRolesRef.current.validateFields().then(value => {
                    axios.put(' http://localhost:3001/roles/update',{data:value}).then(result=>{
                        props.closeForm();
                        props.setCode(result.data.meta.status);
                        message.success(result.data.meta.msg)
                    })
                })
            }}
            onCancel={()=>{
                props.closeForm();
            }}
            destroyOnClose
        >
<Form  ref={updateRolesRef}>
    <Form.Item label='编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号' name='roleId' initialValue={props.editRecord.roleId} rules={[{required:true}]}>
  <Input disabled={true}/>
    </Form.Item>
    <Form.Item label='角色名称' name='roleName' initialValue={props.editRecord.roleName} rules={[{required:true,message:'请输入角色名称'}]}>
<Input/>
    </Form.Item>
    <Form.Item label='角色描述' name='roleDesc' initialValue={props.editRecord.roleDesc} rules={[{required:true,message:'请输入角色描述'}]}>
        <Input/>
    </Form.Item>
</Form>
        </Modal>
        </>
    )
}