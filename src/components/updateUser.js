import {Modal, Form, Radio, message, Input} from "antd";
import React,{useState} from "react";
import Draggable from 'react-draggable'
import axios from "axios";

function UpdateUser(props) {
    //绑定表单
    const bindUpdateRef = React.createRef()

    //提示框移动
    //modal是否可以移动
    const [disabled,setDisabled] = useState(true)
    //modal拖拽的方向
    const [bounds,setBounds] = useState({left:0,top:0,bottom:0,right:0})
    //和可以拖拽组件Draggable进行绑定
    const draggableRef = React.createRef()
    const onStart = (event,uiDate)=> {
        //获取浏览器窗口的高度宽度
        const {clientWidth,clientHeight} = window.document.documentElement
        //获取modal的外div
        const targetReact = draggableRef.current.getBoundingClientRect()
        setBounds({
            bounds:{
                left:-targetReact.left + uiDate.x,
                right:clientWidth-(targetReact.right-uiDate.x),
                top:-targetReact.top + uiDate.y,
                bottom:clientHeight - (targetReact.bottom - uiDate.y)
            }
        })
    }

    return (
        <>
            <Modal
                title={
                    <div style={{
                        width:'100%',
                        cursor:'move'
                    }}
                         onMouseMove={()=> {
                             if(disabled) {
                                 setDisabled(false)
                             }
                         }}
                         onMouseOut={()=> {
                             if(disabled) {
                                 setDisabled(true)
                             }
                         }}
                    >
                        修改用户信息
                    </div>
                }
                visible={props.visible}
                destroyOnClose
                cancelText='取消'
                onCancel={()=> {
                    props.close()
                }}
                okText='确定'
                onOk={async ()=> {
                    await bindUpdateRef.current.validateFields().then(value=> {
                        axios.put('http://localhost:3001/users/update',{data:value}).then(result=> {
                            console.log(props.edit)
                            props.close()
                            props.modifyCode(result.data.meta.code)
                            message.success(result.data.meta.msg)
                        })
                    })
                }}
                modalRender = {(modal)=> (
                    <Draggable disabled={disabled} bounds={bounds} onStart={(event,uiDate)=> onStart(event,uiDate)}>
                        <div ref={draggableRef}>{modal}</div>
                    </Draggable>
                )}
            >
                <Form ref={bindUpdateRef}>
                    <Form.Item name='id' label='编号' initialValue={props.edit.id}>
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item name='username' label='姓名' initialValue={props.edit.username}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='rid' label='角色' initialValue={props.edit.rid==='1'?1:2}>
                        <Radio.Group>
                            <Radio value={1}>管理员</Radio>
                            <Radio value={2}>超级管理员</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name='mobile' label='电话' initialValue={props.edit.mobile} rules={[{
                        pattern:/^1[3|5|7|8][0-9]{9}$/,
                        message:'请输入正确的联系方式'
                    }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='email' label='邮箱' initialValue={props.edit.email}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateUser