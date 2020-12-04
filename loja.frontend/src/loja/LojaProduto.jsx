import React, { useEffect } from "react";
import { Table, Button, Input, InputNumber, AutoComplete, Layout } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { produtoController } from "../controllers/ProdutoController";
import "../App.less";




function LojaProduto() {
  const dispatch = useDispatch();
  const options = [
    (value) => dispatch(produtoController.buscarProdutoPorModelo(value))
  ];

  return (
    <Layout>
      <Layout.Content>
        <AutoComplete style={{ width: 200 }}
          options={options}
          placeholder="Produto"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        ></AutoComplete>
        <InputNumber style={{ margin: 10 }} placeholder="Minimo"></InputNumber>
        <InputNumber placeholder="Total"></InputNumber>
        <Button className="botaoplusminus"><PlusCircleOutlined /></Button>
        <Button className="botaoplusminus"><MinusCircleOutlined /></Button>
        <br/>
        <Table rowKey="id" >
          <Table.Column title="Id" dataIndex="id" key="id" />
          <Table.Column title="Produto" dataIndex="produto" key="produto" />
          <Table.Column title="Quantidade Minima" dataIndex="quantidadeMinima" key="quantidadeMinima" />
          <Table.Column title="Total" dataIndex="total" key="total" />
        </Table>
      </Layout.Content>

    </Layout >
  );
}

export default LojaProduto;
