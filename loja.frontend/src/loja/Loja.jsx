import React, { useEffect } from "react";
import "../App.less";
import { Table, Button, Breadcrumb } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { lojaController } from "../controllers/LojaController";

function Loja({ match }) {
  const lojaR = useSelector((state) => state.loja);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(lojaController.carregarBusca());
  }, [dispatch]);
  return (
    <div className="tabela">
      <Breadcrumb style={{ margin: "10px 0" }} className="breabcrumb">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Loja</Breadcrumb.Item>
      </Breadcrumb>
      <Button
        className="botao"
        shape="round"
        onClick={() => {
          dispatch(lojaController.buscarLoja());
        }}
      >
        Busca
      </Button>
      <Table rowKey="id" dataSource={lojaR.lista}>
        <Table.Column title="Id" dataIndex="id" key="id" />
        <Table.Column title="Nome" dataIndex="nome" key="nome" />
        <Table.Column title="CNPJ" dataIndex="cnpj" key="cnpj" />
        <Table.Column title="Rua" dataIndex="rua" key="rua" />
        <Table.Column title="Bairro" dataIndex="bairro" key="bairro" />
        <Table.Column title="Numero" dataIndex="numero" key="numero" />
        <Table.Column title="Telefone" dataIndex="telefone" key="telefone" />
        <Table.Column
          title="Ações"
          key="acao"
          render={(text, record, index) => {
            return (
              <Button.Group>
                <Button
                  key={"editar" + record.id}
                  onClick={() => {
                    lojaController.editarLoja(record.id);
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  key={"apagar" + record.id}
                  onClick={() => {
                    dispatch(lojaController.apagarLoja(record.id));
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
            lojaController.editarLoja(0);
          }}
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
}

export default Loja;
