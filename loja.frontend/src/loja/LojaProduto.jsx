import React from "react";
import AsyncSelect from "react-select/async";
import { Table, Button, InputNumber, Layout } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import "../App.less";
import { lojaController } from "../controllers/LojaController";
import ButtonGroup from "antd/lib/button/button-group";





function LojaProduto() {
  const dispatch = useDispatch();

  const handleChangeInputNumberEntity = (name) => (value) => {
    dispatch(lojaController.updateEntity({ [name]: value }));
  };

  const loja = useSelector((state) => state.loja);

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
          value={loja.selectedProduto.produto}
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
        <InputNumber id="total" step={1} min={1} style={{ margin: 10 }}
          onChange={handleChangeInputNumberEntity("selectedProduto.total")}
          placeholder="Total" value={loja.selectedProduto.total} />

        <InputNumber id="minimo" step={1} min={1}
          onChange={handleChangeInputNumberEntity("selectedProduto.quantidadeMinima")}
          placeholder="Minimo" value={loja.selectedProduto.quantidadeMinima} />
        <ButtonGroup>
          <Button disabled={loja.selectedProduto.produto && loja.selectedProduto.produto.id === 0} onClick={(e) => { dispatch(lojaController.addToList()); }}><PlusCircleOutlined /></Button>
        </ButtonGroup>
        <br />
        <Table rowKey={(record) => { return record.produto.id }} dataSource={loja.entidade.produtos} >

          <Table.Column title="Produto" dataIndex="produto" key="produto" render={(text, record, index) => {
            return record.produto.modelo
          }} />
          <Table.Column title="Quantidade Minima" dataIndex="quantidadeMinima" key="quantidadeMinima" />
          <Table.Column title="Total" dataIndex="total" key="total" />
          <Table.Column title="Ação" render={(text, record, index) => {
            return (
              <Button onClick={(e) => { dispatch(lojaController.removeFromList(record.produto)); }}><MinusCircleOutlined /></Button>)
          }} />
        </Table>
      </Layout.Content>

    </Layout>
  );
}

export default LojaProduto;
