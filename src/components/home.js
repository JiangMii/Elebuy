import {Button, Layout, Menu} from "antd";
import { UserOutlined ,PieChartOutlined,TeamOutlined,BarcodeOutlined ,DesktopOutlined } from '@ant-design/icons';
import {Link, Route, BrowserRouter, Routes, Outlet,useNavigate} from "react-router-dom";
import React from "react";
import Roles from "./roles";
import PermissionList from "./permissionList";
import logo from '../react.jpg'
import Line from "../echart/echarts";
const {Header,Sider,Content}=Layout;
const { SubMenu } = Menu;

export default function Home(){
    const navigate=useNavigate();
    const exit=()=>{
        navigate('/')
    }
    return(

        <Layout>
            <Header className={'header'}>

              <img src={logo}  style={{float:'left',marginTop:'6px',marginLeft:'-50px',width:'50px',height:'50px'}}/>

              <h1 style={{color:'white',fontSize:'20px',float:'left'}}>电商后台</h1>
                <Button onClick={()=>{exit()}} style={{float:'right',backgroundColor:'#369',color:'white',marginTop:'15px',marginLeft:'10px',marginRight:'-30px'}}> 退出 </Button>
               <h1 style={{color:'white',fontSize:'18px',float:'right'}}> 当前用户：{sessionStorage.getItem('userName')}</h1>

            </Header>
            <Layout>
                <Sider width={200} className={'site-layout-content'}>
                    <Menu   theme={'dark'}    mode={'inline'} defaultSelectedKeys={['1']} defaultOpenKeys={['side1']} style={{height:'100%'}}>
                        <SubMenu key={'side1'} icon={<UserOutlined/>} title={'用户管理'}>
                            <Menu.Item key={'1'}>
                            <Link to={'users'}>用户列表</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key={'side2'} icon={<TeamOutlined/>} title={'权限管理'}>
                            <Menu.Item key={'2'}>
                                <Link to={'roles'}> 角色列表</Link>
                            </Menu.Item>
                            <Menu.Item key={'3'}>
                                <Link to={'per'}>权限列表</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key={'side3'} icon={<BarcodeOutlined />} title={'商品管理'}>
                            <Menu.Item key={'4'}>
                                <Link to={'goods'}>商品列表</Link>
                            </Menu.Item>
                            <Menu.Item key={'5'}> 分类参数</Menu.Item>
                            <Menu.Item key={'6'}> <Link to={'cat'}>商品分类</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key={'side4'} icon={<DesktopOutlined />} title={'订单管理'}>
                            <Menu.Item key={'7'}> <Link to={'order'}>订单列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key={'side5'} icon={<PieChartOutlined/>} title={'数据统计'}>
                            <Menu.Item key={'8'}>
                                <Link to={'report'}>数据报表</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{padding:'0 24px 24px'}}>

                    <Content className={'site-layout-background'} style={{padding:24,margin:0,minHeight:400,color:'black'}}>

                  <Outlet/>
                    </Content>

                </Layout>
            </Layout>
        </Layout>

    )
};