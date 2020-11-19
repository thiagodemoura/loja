/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from "react";
import "../App.less";
import { Form, Input, Button, Breadcrumb } from "antd";
import { lojaController } from "../controllers/LojaController";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 10,
  },
};
const validateMessages = {
  required: "${label} é Obrigatório!",
  types: {
    number: "${label} Não é um numero válido!",
  },
};
export default function ManutencaoLoja() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(lojaController.salvarLoja(values));
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const params = useParams();
  //will mount
  useEffect(() => {
    const id = Number(params.id && params.id > 0 ? params.id : 0);

    dispatch(lojaController.carregarManutencao(id));
  }, [dispatch, params]);

  //Will update
  const lojaR = useSelector((state) => state.loja.entidade);
  useEffect(() => {
    form.setFieldsValue(lojaR);
  }, [form, lojaR]); // Apenas re-execute o efeito quando o lojaR mudar

  return (
    <div>
      <Breadcrumb style={{ margin: "0 0 30px" }} className="breabcrumb">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/loja">Loja</Breadcrumb.Item>
        <Breadcrumb.Item>Manutenção Loja</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <div className="formulario">
          <Form.Item name="id" label="Id" style={{ display: 'none' }}>
            <Input readOnly={true} />
          </Form.Item>
          <Form.Item
            name="nome"
            label="Nome"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cnpj"
            label="CNPJ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rua"
            label="Rua"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bairro"
            label="Bairro"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="numero"
            label="Numero"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telefone"
            label="Telefone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <Button className="botao" shape="round" htmlType="submit" type="submit">
          Salvar
        </Button>
        <Button className="botao" shape="round" href="/loja">
          Retornar
        </Button>
      </Form>
    </div>
  );
}
