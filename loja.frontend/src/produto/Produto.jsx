import React, { useEffect } from "react";
import "../App.less";
import { Table, Button, Breadcrumb, Input } from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { produtoController } from "../controllers/ProdutoController";

const {Search} = Input;
function Produto({ match }) {
  const produtoR = useSelector((state) => state.produto);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(produtoController.carregarBusca());
  }, [dispatch]);
  return (
    <div className="tabela">
      <Breadcrumb style={{ margin: "10px 0" }} className="breabcrumb">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item >Produto</Breadcrumb.Item>
      </Breadcrumb>

      <Search placeholder="Pesquisar Produto  " onSearch={(value)=>dispatch(produtoController.buscarProdutoPorModelo(value))}  style={{ width: 200, margin: '10px 10px' }}/>
      
      <Table rowKey="id" dataSource={produtoR.lista}>
        <Table.Column title="Id" dataIndex="id" key="id" />
        <Table.Column title="Modelo" dataIndex="modelo" key="modelo" />
        <Table.Column title="Serial" dataIndex="serial" key="serial" />
        <Table.Column title="Descrição" dataIndex="descricao" key="descricao" />
        <Table.Column title="Status" dataIndex="status" key="status" />
        <Table.Column title="Local" dataIndex="local" key="local" />
        <Table.Column title="Quantidade" dataIndex="quantidade" key="quantidade" />
        <Table.Column title="Observacoes" dataIndex="observacoes" key="observacoes" />
        <Table.Column
          title="Ações"
          key="acao"
          render={(text, record, index) => {
            return (
              <Button.Group>
              <Button
                key={"editar" + record.id}
                onClick={() => {
                  produtoController.editarProduto(record.id);
                }}
              >
                <EditOutlined />
              </Button>
              <Button
                key={"apagar" + record.id}
                onClick={() => {
                  dispatch(produtoController.apagarProduto(record.id));
                }}
              >
                <DeleteOutlined />
              </Button>
            </Button.Group>
            );
          }}
        />
      </Table>

      <div>
        <Button
          className="botao"
          shape="round"
          onClick={() => {
            produtoController.editarProduto(0);
          }}
        >
          Adicionar
        </Button>
        <Button className="botao" shape="round">
          Apagar
        </Button>
      </div>
    </div>
  );
}

export default Produto;
