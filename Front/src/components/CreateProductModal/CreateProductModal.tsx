import { Divider, Input, InputNumber} from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { CustomFormItem } from './styles';
import { Content } from 'antd/es/layout/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import useNewOrderModalSchema from './useNewOrderSchema';
import  { Modal as AntModal } from 'antd';
import type { INewOrderForm } from '../../api/resources/products/IProduct';



export interface INewOrderModalData extends INewOrderForm {
  description: string;
}

interface INewOrderModalProps {
  isOpen: boolean;
  onConfirm: (data: INewOrderForm) => void;
  onCancel: () => void;
  loading: boolean;
 }

const CreateProductModal: React.FC<INewOrderModalProps> = ({
  onCancel,
  onConfirm,
  isOpen,
  loading 
}) => {
 
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<INewOrderForm>({
    defaultValues: {
      name: 'Teclado Mecânico',
      description: 'Teclado com switches azuis e RGB',
      stock: 10,
      price: 349.9,
      is_active:true,
    },
    resolver: yupResolver(useNewOrderModalSchema()),
    reValidateMode: 'onChange',
    mode: 'all',
    shouldFocusError: false,
  });

 
  const handleSub = async (data: INewOrderForm) => {
    try {

      await onConfirm(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const debouncedSearchPartNumber = debounce((value: string) => {
  //   onChangePartNumber({ value });
  // }, 500);

  return (
    <AntModal
      title={'Criar novo produto'}
      onOk={handleSubmit(handleSub)}
      onCancel={onCancel}
      open={isOpen}
      centered
      destroyOnClose
      afterClose={() => {
        reset();
      }}
      width="30rem"
      closable={true}
      confirmLoading={loading}
      focusTriggerAfterClose={false}
      maskClosable={false}
      okText={'Criar'}
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

export default CreateProductModal;
