import React,{useRef} from "react";
import {Form,Input,Row,Col,message,Modal,Button}from 'antd';
import {UserOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import '../style/login.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";



export default function  Login (){
    const bindLogin=React.useRef()
    const navigate=useNavigate()

   const    login = async () => {
         await bindLogin.current.validateFields().then(value => {
             console.log(value);
             fetch('http://localhost:3001/login/login', {
                 method: 'post',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                     username: value.username,
                     password: value.password,
                 })
             }).then(res => {
                 return res.json();
             }).then(data => {
                 if (data.meta.status === 200) {
                     sessionStorage.setItem('userName', value.username);
                     sessionStorage.setItem('token', data.data.token);//将token写入
                    navigate('/home')
                     //将主页的url压入地址栏

                 } else {
                     message.error(data.msg);
                 }
             }).catch(err => {
                 console.log(err);
             })
         })
     };


     return (
             <>
                 <section className='login-content'>
                     <h2>用户登录</h2>
                     <Form ref={bindLogin}>


                         <Form.Item name='username'
                                    rules={[{
                                        required: true,
                                        message: '用户名不能为空'
                                    }]}
                         >
                             <Input prefix={<UserOutlined/>}
                                    placeholder='请输入用户名'
                             />
                         </Form.Item>

                         <Form.Item name='password'
                                    rules={[{
                                        required: true,
                                        message: '密码不能为空'
                                    }]}
                         >
                             <Input prefix={<EyeInvisibleOutlined />}
                                    placeholder='请输入密码'
                                    type='password'
                             />
                         </Form.Item>


                         <Form.Item>
                             <Button type='primary' className='login-form-button' onClick={login}>
                                 登录
                             </Button>
                     
                         </Form.Item>


                     </Form>
                 </section>
             </>
         )

};
