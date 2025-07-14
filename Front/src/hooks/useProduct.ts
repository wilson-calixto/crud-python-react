import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { API } from "../api";

import type { IProduct, INewProductForm } from "../api/resources/products/IProduct";
import type { NotificationInstance } from "antd/es/notification/interface";

const useProduct = (api: NotificationInstance) => {
  const [openCreateNewProduct, setOpenCreateNewProduct] = useState<boolean>(false);


  const [openEditProduct, setOpenEditProduct] = useState<boolean>(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState<boolean>(false);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>();


  const showEditOrderModal = (row: IProduct) => {
    setOpenEditProduct(true);
    setSelectedProduct(row);
  };

  const showDeleteOrderModal = (row: IProduct) => {
    setOpenDeleteProduct(true);
    setSelectedProduct(row);
  };



  const {
    data: dataAllProductsTable,
    isFetching: isLoadingProductsTable,
    refetch,
  } = useQuery({
    queryKey: ["dataAllProductsTable"],
    refetchOnWindowFocus: false,
    queryFn: () => API.Products.getProductsData().response,
  });

  const { mutateAsync: createProduct, isPending: isLoadingCreateProduct } =
    useMutation({
      mutationFn: (NewProduct: INewProductForm) =>
        API.Products.createProduct(NewProduct).response,
      onError() {
        api['error']({
          message: 'Error',
          description:
            'Erro ao criar produto.',
        });
        handleCloseCreateNewProduct();
      },
    });


  const { mutateAsync: deleteProduct } =
    useMutation({
      mutationFn: async (id: number) => {
        const result = API.Products.deleteProduct(id);
        if (!result) {
          throw new Error('deleteProduct retornou undefined');
        }
        return result.response;
      },
      onError() {
        api['error']({
          message: 'Error',
          description: 'Erro ao deletar produto.',
        });
        setOpenEditProduct(false);
      },
    });



  const { mutateAsync: editProduct } =
    useMutation({
      mutationFn: (NewProduct: IProduct) =>
        API.Products.editProduct(NewProduct).response,
      onError() {
        api['error']({
          message: 'Error',
          description:
            'Erro ao criar produto.',
        });
        handleCloseEditProduct();
      },
    });



  const handleCloseCreateNewProduct = () => {
    setOpenCreateNewProduct(false);
    // setSelectedProduct(undefined);
  };

  const handleCloseEditProduct = () => {
    setSelectedProduct(undefined);
    setOpenEditProduct(false);
  };

  const handleOpenCreateNewProduct = () => {
    setOpenCreateNewProduct(true);
  };

  const confirmEditProduct = async (data: IProduct) => {
    try {
      await editProduct(data);  

      setTimeout(() => {
      api['success']({
        message: 'Sucesso',
        description:
          'Produto editado com sucesso.',
      });
      }, 100);

      handleCloseEditProduct();
      refetch();
    } catch (e) {
      console.log(e);
    }
  };



  const handleOk = async (data: IProduct) => {

    try {
      const id = data.id;
      if (id) {
        await deleteProduct(id);

      setTimeout(() => {
        api['success']({
          message: 'Sucesso',
          description:
            'Produto Deletado com sucesso.',
        });
      }, 100);
        setOpenDeleteProduct(false);
        refetch();
      }


    } catch (e) {
      console.log(e);
    }
 
  };

  const handleCancel = () => {
    setOpenDeleteProduct(false);
  };



  const confirmCreateNewProduct = async (data: INewProductForm) => {
    try {
      await createProduct(data);
 
      setTimeout(() => {
        api['success']({
          message: 'Sucesso',
          description:
          'Produto criado com sucesso.',
        });
      }, 100);
      handleCloseCreateNewProduct();
      refetch();


    } catch (e) {
      console.log(e);
    }
  };

  return {
    isLoadingProductsTable,
    dataAllProductsTable,
    openCreateNewProduct,
    handleCloseCreateNewProduct,
    handleCloseEditProduct,
    handleOpenCreateNewProduct,
    confirmCreateNewProduct,
    confirmEditProduct,
    isLoadingCreateProduct,
    selectedProduct,
    setSelectedProduct,
    showEditOrderModal,
    openEditProduct,
    openDeleteProduct,
    showDeleteOrderModal,
    handleOk,
    handleCancel
  };
};

export default useProduct;
