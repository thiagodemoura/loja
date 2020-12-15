import React from "react";
import { Table, Button, InputNumber, AutoComplete, Layout } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import "../App.less";
import { lojaController } from "../controllers/LojaController";




function LojaProduto() {
  const dispatch = useDispatch();

  const onSearch = (searchText) => {
    dispatch(lojaController.buscarProdutoPorModelo(searchText))
  }
  const onSelect = (value) => {
    dispatch(lojaController.selectProduto(value))
  }
  const listaProdutos = useSelector((state) => state.loja.listaProdutos);
  const selectedProduto = useSelector((state) => state.loja.selectedProduto);
  const selectedProdutoList = useSelector((state) => state.loja.selectedProdutoList);

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
          onSelect={onSelect}
          value={selectedProduto.produto}

        />
        <InputNumber id="minimo" step={1} style={{ margin: 10 }} placeholder="Minimo" value={selectedProduto.produto.total} />
        <InputNumber id="total" step={1} placeholder="Total" value={selectedProduto.produto.quantidadeMinima} />
        <Button className="botaoplusminus"><PlusCircleOutlined /></Button>
        <Button className="botaoplusminus"><MinusCircleOutlined /></Button>
        <br />
        <Table rowKey="id" dataSource={selectedProdutoList} >
          <Table.Column title="Id" dataIndex="id" key="id" />
          <Table.Column title="Produto" dataIndex="produto" key="produto" />
          <Table.Column title="Quantidade Minima" dataIndex="quantidadeMinima" key="quantidadeMinima" />
          <Table.Column title="Total" dataIndex="total" key="total" />
        </Table>
      </Layout.Content>

    </Layout>
  );
}

export default LojaProduto;
