import React from "react";
import AsyncSelect from "react-select/async";
import { Table, Button, InputNumber, AutoComplete, Layout } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import "../App.less";
import { lojaController } from "../controllers/LojaController";





function LojaProduto() {
  const dispatch = useDispatch();

  const handleChangeInputNumberEntity = (name) => (value) => {
    dispatch(lojaController.updateEntity({ [name]: value }));
  };


  const listaProdutos = useSelector((state) => state.loja.listaProdutos);
  const selectedProduto = useSelector((state) => state.loja.selectedProduto);
  const selectedProdutoList = useSelector((state) => state.loja.selectedProdutoList);

  const promiseProduto = async (searchText) => {
    return lojaController.buscarProdutoPorModelo(searchText);
  }
  const selectProduto = (produto) => {
    dispatch(lojaController.selectProduto(produto))
  }
  //useEffect(() => {
  //  form.setFieldsValue(lojaR);
  //}, [form, lojaR]);
  return (
    <Layout>
      <Layout.Content>
        <AsyncSelect loadOptions={promiseProduto}
          instanceId="produtolist"
          isMulti={false}
          cacheOptions
          defaultOptions
          isClearable={true}
          value={selectedProduto.produto}
          getOptionLabel={(option) => {
            return option.modelo;
          }}
          getOptionValue={(option) => {
            return option.id;
          }}
          onChange={(option) => {
            selectProduto(option)
          }}
        />
        <InputNumber id="total" step={1} style={{ margin: 10 }}
          onChange={handleChangeInputNumberEntity("selectedProduto.total")}
          placeholder="Total" value={selectedProduto.total} />

        <InputNumber id="minimo" step={1}
          onChange={handleChangeInputNumberEntity("selectedProduto.quantidadeMinima")}
          placeholder="Minimo" value={selectedProduto.quantidadeMinima} />
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
