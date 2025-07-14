import { Table, Skeleton, Button, Row, Flex, notification, Modal, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CreateProductModal from './components/CreateProductModal/CreateProductModal';
import useProduct from './hooks/useProduct';
import EditProductModal from './components/EditProductModal/EditProductModal';
import type { IProduct } from './api/resources/products/IProduct';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';




function Products() {
  const [api, contextHolder] = notification.useNotification();
  const {
    openEditProduct,
    openCreateNewProduct,
    selectedProduct,
    handleCloseCreateNewProduct,
    handleCloseEditProduct,
    handleOpenCreateNewProduct,
    confirmCreateNewProduct,
    confirmEditProduct,
    isLoadingCreateProduct,
    isLoadingProductsTable,
    dataAllProductsTable,
    showEditOrderModal,
    showDeleteOrderModal,
    openDeleteProduct,
    handleOk,
    handleCancel
  } = useProduct(api);




  const columns: ColumnsType<IProduct> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quantidade',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Ações',
      dataIndex: '',
      key: 'x',
      render: (row) => <>


        <a onClick={() => showEditOrderModal(row)} style={{ marginRight: 8 }}>
          <EditOutlined /> Editar
        </a>
        <div></div>

            <a style={{ color: 'red' }} onClick={() => showDeleteOrderModal(row)}>
          <DeleteOutlined /> Deletar
        </a>
      </>,
    },
  ];







  if (isLoadingProductsTable) return <Skeleton active />;


  return (
    <div style={{ padding: 24, marginTop: '50px' }}>
      {contextHolder}


      {selectedProduct &&
        <Modal
          title="Deletar"
          open={openDeleteProduct}
          okText={'Sim'}
          onOk={() => handleOk(selectedProduct)}
          confirmLoading={false}
          onCancel={handleCancel}
          cancelText={'Cancelar'}
        >
          <p>{'Deseja deletar esse registro?'}</p>
        </Modal>
      }

      {selectedProduct &&
        <EditProductModal
          isOpen={openEditProduct}
          onCancel={handleCloseEditProduct}
          onConfirm={confirmEditProduct}
          loading={isLoadingCreateProduct}
          product={selectedProduct}
        />
      }

      <CreateProductModal
        isOpen={openCreateNewProduct}
        onCancel={handleCloseCreateNewProduct}
        onConfirm={confirmCreateNewProduct}
        loading={isLoadingCreateProduct}
      />

      <Flex vertical justify='center' >

        <Row
          align={'middle'}
          justify={'center'}
        >
          <div style={{ paddingLeft: '-10px' }}>
            <Image
              src='public/logo.png'></Image>
          </div>
        </Row>

        <Row
          align={'middle'}
          justify={'space-between'}
        >
          <h1>Produtos</h1>
     <Button
  onClick={handleOpenCreateNewProduct}
  type="primary"
  icon={<PlusOutlined />}
>
  Criar produto
</Button>
        </Row>

        <Table loading={isLoadingProductsTable} columns={columns} dataSource={dataAllProductsTable} rowKey="id" pagination={{ pageSize: 5 }} />
      </Flex>
    </div>
  );
}

function App() {
  return <Products />;
}

export default App;
