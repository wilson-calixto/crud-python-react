import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { API } from "../api";

import type { INewOrderForm } from "../api/resources/products/IProduct";
import type { NotificationInstance } from "antd/es/notification/interface";
 
const useProduct = (api:NotificationInstance) => {
  const [openCreateNewOrder, setOpenCreateNewOrder] = useState<boolean>(false);
  // const { onError } = useAxiosErrorHandler();

  
  

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
      mutationFn: (newOrder: INewOrderForm) =>
        API.Products.createProduct(newOrder).response,
      onError() {
        api['error']({
          message: 'Error',
          description:
            'Erro ao criar produto.',
        });
        handleCloseCreateNewOrder();
        },
    });

  const handleCloseCreateNewOrder = () => {
    setOpenCreateNewOrder(false);
  };
    const handleOpenCreateNewOrder = () => {
    setOpenCreateNewOrder(true);
  };

  const confirmCreateNewOrder = async (data: INewOrderForm) => {
    try {
       await createProduct(data);
        api['success']({
          message: 'Sucesso',
          description:
            'Produto criado com sucesso.',
        });
        handleCloseCreateNewOrder();
        refetch();
        
        
    } catch (e) {
      console.log(e);
    }
  };

  return {
    isLoadingProductsTable,
    dataAllProductsTable,
    openCreateNewOrder,
    handleCloseCreateNewOrder,
    handleOpenCreateNewOrder,
    confirmCreateNewOrder,
    isLoadingCreateProduct,
  };
};

export default useProduct;
