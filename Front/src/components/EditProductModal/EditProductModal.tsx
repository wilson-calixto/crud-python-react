import { Divider, Input, InputNumber} from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { CustomFormItem } from './styles';
import { Content } from 'antd/es/layout/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import  { Modal as AntModal } from 'antd';
import type { IProduct } from '../../api/resources/products/IProduct';
import useEditProductsSchema from './useEditProductsSchema';
 
 

interface INewProductModalProps {
  isOpen: boolean;
  onConfirm: (data: IProduct) => void;
  onCancel: () => void;
  loading: boolean;
  product:IProduct;
 }

 
const EditProductModal: React.FC<INewProductModalProps> = ({
  onCancel,
  onConfirm,
  isOpen,
  loading,
  product
}) => {
   const {
    control,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<IProduct>({
    defaultValues: {
      id:product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price,
      is_active:product.is_active,
    },
    resolver: yupResolver(useEditProductsSchema()),
    reValidateMode: 'onChange',
    mode: 'all',
    shouldFocusError: false,
  });

 
 
  // const debouncedSearchPartNumber = debounce((value: string) => {
  //   onChangePartNumber({ value });
  // }, 500);

  const onFinish = async (data:IProduct) => {
   try {
      await onConfirm(data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <AntModal
      title={'Editar produto'}
      onOk={handleSubmit(onFinish)}
      onCancel={onCancel}
      open={isOpen}
      centered
      afterClose={() => {
        reset();
      }}
      width="30rem"
      closable={true}
      confirmLoading={loading}
      focusTriggerAfterClose={false}
      maskClosable={false}
      okText={'Salvar'}
    >
 
      <Content
        style={{
          padding: '0.5rem',
        }}
      >
        <Controller
  control={control}
  name="name"
  render={({ field }) => (
    <CustomFormItem
      label="Nome"
      required
      validateStatus={formErrors.name ? 'error' : undefined}
      help={formErrors.name?.message}
      labelCol={{ span: 24 }}
    >
      <Input {...field} placeholder="Digite o nome do produto" />
    </CustomFormItem>
  )}
/>

<Controller
  control={control}
  name="description"
  render={({ field }) => (
    <CustomFormItem
      label="Descrição"
      required
      validateStatus={formErrors.description ? 'error' : undefined}
      help={formErrors.description?.message}
      labelCol={{ span: 24 }}
    >
      <Input.TextArea {...field} placeholder="Descreva o produto" rows={3} />
    </CustomFormItem>
  )}
/>


<Controller
  control={control}
  name="stock"
  render={({ field: { onChange, value } }) => (
    <CustomFormItem
      label="Quantidade em estoque"
      required
      validateStatus={formErrors.stock ? 'error' : undefined}
      help={formErrors.stock?.message}
      labelCol={{ span: 24 }}
    >
      <InputNumber
        min={1}
        style={{ width: '100%' }}
        value={value}
        onChange={(v) => v && onChange(v)}
       />
    </CustomFormItem>
  )}
/>

<Controller
  control={control}
  name="price"
  render={({ field: { onChange, value } }) => (
    <CustomFormItem
      label="Valor (R$)"
      required
      validateStatus={formErrors.price ? 'error' : undefined}
      help={formErrors.price?.message}
      labelCol={{ span: 24 }}
    >
      <InputNumber
        min={0.01}
        step={0.01}
        style={{ width: '100%' }}
        value={value}
        onChange={(v) => v && onChange(v)}
        placeholder="349.90"
      />
    </CustomFormItem>
  )}
/>




      </Content>
      <Divider
        style={{
          margin: 0,
        }}
      />
    </AntModal>
  );
};

export default EditProductModal;
