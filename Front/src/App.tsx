import { useQuery } from '@tanstack/react-query';
import { Table, Skeleton, Alert, Button, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CreateProductModal from './components/CreateProductModal/CreateProductModal';
import useRequestedOrdersTab from './hooks/useCreateAndEditProduct';

interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: string;
}

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('http://127.0.0.1:8000/api/products');//add env variables
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  const data = await res.json();
  return data.results;
}

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
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  
  const {
    openCreateNewOrder,
    handleCancelCreateNewOrder,
    handleOpenCreateNewOrder,
    confirmCreateNewOrder, 
    isLoadingCreateRequestOrder,
   } = useRequestedOrdersTab();


  if (isLoading) return <Skeleton active />;
  if (error instanceof Error) {
    return <Alert message="Erro" description={error.message} type="error" showIcon />;
  }


  return (
    <div style={{ padding: 24 }}>
        <CreateProductModal
        isOpen={openCreateNewOrder}
        onCancel={handleCancelCreateNewOrder}
        onConfirm={confirmCreateNewOrder}
        loading={isLoadingCreateRequestOrder}        
      />

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

       <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 5 }} />
      {/* <Counter /> */}
    </div>
  );
}

function App() {
  return <Products />;
}

export default App;
