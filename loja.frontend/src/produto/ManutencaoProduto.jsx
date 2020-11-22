/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from "react";
import "../App.less";
import { Form, Input, Button, Breadcrumb } from "antd";
import { produtoController } from "../controllers/ProdutoController";
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
export default function ManutencaoProduto() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        dispatch(produtoController.salvarProduto(values));
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const params = useParams();
    //will mount
    useEffect(() => {
        const id = Number(params.id && params.id > 0 ? params.id : 0);

        dispatch(produtoController.carregarManutencaoProduto(id));
    }, [dispatch, params]);

    //Will update
    const produtoR = useSelector((state) => state.produto.entidade);
    useEffect(() => {
        form.setFieldsValue(produtoR);
    }, [form, produtoR]); // Apenas re-execute o efeito quando o lojaR mudar

    return (
        <div>
            <Breadcrumb style={{ margin: "0 0 30px" }} className="breabcrumb">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/produto" >Produto</Breadcrumb.Item>
                <Breadcrumb.Item >Manutenção Produto</Breadcrumb.Item>
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
                        name="modelo"
                        label="Modelo"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="serial"
                        label="Serial"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="descricao"
                        label="Descricao"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="local"
                        label="Local"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="quantidade"
                        label="Quantidade"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="observacoes"
                        label="Observacoes"
                    >
                        <Input />
                    </Form.Item>
                </div>
        <Button className="botao" shape="round" htmlType="submit" type="submit">
            Salvar
        </Button>
        <Button className="botao" shape="round" href="/produto">
            Retornar
        </Button>
            </Form>
        </div>
    );
}
