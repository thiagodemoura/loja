import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.less";
import { Button, Layout, Menu } from "antd";
import {
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import logo from "./images/logo.png";

import Loja from "./loja/Loja";
import Manutencao from "./loja/ManutencaoLoja";
import Produto from "./produto/Produto";
import ManutencaoProduto from "./produto/ManutencaoProduto";

const { Header, Footer, Sider, Content } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="App">
      <Layout className="Sidebar" style={{ minHeight: "100vh" }}>
        <Sider collapsed={collapsed}>
          <Menu
            className="Menu"
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={["1"]}
          >
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<ShopOutlined />}>
              <Link to="/loja">Loja</Link>
            </Menu.Item>
            <Menu.Item icon={<ShoppingCartOutlined />}>
              <Link to="/produto">Produto</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="background">
            <Button
              icon={<MenuFoldOutlined />}
              onClick={(e) => {
                setCollapsed(!collapsed);
              }}
            ></Button>
          </Header>
          <Content style={{ margin: "16px 0" }}>
            <div className="rotas">
              <Switch>
                <Route path="/" exact></Route>
                <Route path="/loja" exact component={Loja}></Route>
                <Route path="/loja/:id" exact component={Manutencao}></Route>
                <Route path="/produto" exact component={Produto}></Route>

                <Route
                  path="/produto/:id"
                  component={ManutencaoProduto}
                ></Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            LS Store ©2020 Created by Lucas Saraiva
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
