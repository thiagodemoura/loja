import React, { useEffect } from "react";
import "../App.less";
import { Table, Button, Breadcrumb } from "antd";
import {EditOutlined} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { produtoController } from "../controllers/ProdutoController";

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
      <Button
        className="botao"
        shape="round"
        onClick={() => {
          dispatch(produtoController.buscarProduto());
        }}
      >
        Busca
        
      </Button>
      
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
              <Button
                shape="round"
                key={"editar" + record.id}
                onClick={() => {
                  produtoController.editarProduto(record.id);
                }}
              >
                <EditOutlined />
                Edição
              </Button>
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
