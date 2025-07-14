import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { API } from "../api";

import type { INewProductForm, Product } from "../api/resources/products/IProduct";
import type { NotificationInstance } from "antd/es/notification/interface";
 
const useProduct = (api:NotificationInstance) => {
  const [openCreateNewProduct, setOpenCreateNewProduct] = useState<boolean>(false);
 

  const [openEditProduct, setOpenEditProduct] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product|undefined>();


const showEditOrderModal = (row: Product) => {
    setOpenEditProduct(true);
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

  const { mutateAsync: editProduct } =
    useMutation({
      mutationFn: (NewProduct: INewProductForm) =>
        API.Products.editProduct(NewProduct?.id, NewProduct).response,
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
  };

  const handleCloseEditProduct = () => {
    setSelectedProduct(undefined);
    setOpenEditProduct(false);
  };

  const handleOpenCreateNewProduct = () => {  
    setOpenCreateNewProduct(true);
  };

    const confirmEditProduct = async (data: INewProductForm) => {
    try {
       await editProduct(id,data);
        api['success']({
          message: 'Sucesso',
          description:
            'Produto criado com sucesso.',
        });
        handleCloseEditProduct();
        refetch();
        
        
    } catch (e) {
      console.log(e);
    }
  };
  
  const confirmCreateNewProduct = async (data: INewProductForm) => {
    try {
       await createProduct(data);
        api['success']({
          message: 'Sucesso',
          description:
            'Produto criado com sucesso.',
        });
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
  };
};

export default useProduct;
