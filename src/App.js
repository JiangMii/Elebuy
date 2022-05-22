import './App.css';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import 'antd/dist/antd.css';
import Home from "./components/home";
import Login from "./components/login";
import PrivateRoute from "./routers/router";
import React,{Component} from "react";
import Roles from "./components/roles";
import PermissionList from "./components/permissionList";
import Line from "./echart/echarts";
import Goods from "./components/Goods";
import Category from "./components/Category";
import UploadComponent from "./components/UploadComponent";
import Order from "./components/order";
import User from "./components/user";
function App() {
  return (
<BrowserRouter>
<Routes>
    <Route  exact path={'/'} element={<Login/>}/>
     <Route path={'/login'} element={<Login/>}/>
    <Route path={'/home'} element={<PrivateRoute/>}>
    <Route path={'/home'} element={<Home/>}>
         <Route path={'/home/roles'} element={<Roles/>}/>
         <Route path={'/home/per'} element={<PermissionList/>}/>
         <Route path={'/home/report'} element={<Line/>}/>
        <Route path={'/home/goods'} element={<Goods/>}/>
        <Route path={'/home/cat'} element={<Category/>}/>
        <Route path={'/home/order'} element={<Order/>}/>
        <Route path={'/home/users'} element={<User/>}/>
</Route>
</Route>
</Routes>
</BrowserRouter>


  );
}
export default App;


// export default class App extends Component{
// render(){
//     return(
//         <div className="App">
//              <BrowserRouter>
//             <Routes>
//                  <Route path={'/'} exact element={<Login history={this.props.history}/>}/>
//                <Route path={'/'} element={<Login history={this.props.history}/>}/>
//             </Routes>
//                  <PrivateRoute path={'/home'} element={<Home/>}/>
//              </BrowserRouter>
//
//
//              </div>
//     )
// }
// }
