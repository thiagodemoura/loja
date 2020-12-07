import React, { useEffect } from "react";
import { Table, Button, Input, InputNumber, AutoComplete, Layout } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import "../App.less";
import { lojaController } from "../controllers/LojaController";




function LojaProduto() {
  const dispatch = useDispatch();

  const onSearch = (searchText) => {
    dispatch(lojaController.buscarProdutoPorModelo(searchText))
  }
  const listaProdutos = useSelector((state) => state.loja.listaProdutos);
  //useEffect(() => {
  //  form.setFieldsValue(lojaR);
  //}, [form, lojaR]);
  return (
    <Layout>
      <Layout.Content>
        <AutoComplete style={{ width: 200 }}
          options={listaProdutos}
          placeholder="Produto"
          onSearch={onSearch}
        ></AutoComplete>
        <InputNumber style={{ margin: 10 }} placeholder="Minimo"></InputNumber>
        <InputNumber placeholder="Total"></InputNumber>
        <Button className="botaoplusminus"><PlusCircleOutlined /></Button>
        <Button className="botaoplusminus"><MinusCircleOutlined /></Button>
        <br />
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
