import { Table, Skeleton, Button, Row, Flex, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CreateProductModal from './components/CreateProductModal/CreateProductModal';
import useProduct from './hooks/useProduct';
import type { Product } from './api/resources/products/IProduct';

 
 
const columns: ColumnsType<Product> = [
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
];
 
function Products() {
  const [api, contextHolder] = notification.useNotification();

 

  
  const {
    openCreateNewOrder,
    handleCloseCreateNewOrder,
    handleOpenCreateNewOrder,
    confirmCreateNewOrder, 
    isLoadingCreateProduct,
    isLoadingProductsTable,
    dataAllProductsTable
   } = useProduct(api);


  if (isLoadingProductsTable) return <Skeleton active />;
 
 

  return (
    <div style={{ padding: 24, marginTop:'50px' }}>
            {contextHolder}

 
        <CreateProductModal
        isOpen={openCreateNewOrder}
        onCancel={handleCloseCreateNewOrder}
        onConfirm={confirmCreateNewOrder}
        loading={isLoadingCreateProduct}        
      />

      <Flex vertical justify='center' >
      <Row
      align={'middle'}
      justify={'space-between'}
      >

      
      <h1>Produtos</h1>
      <Button
       onClick={handleOpenCreateNewOrder}
       type='primary'
       >Criar produto</Button>
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
