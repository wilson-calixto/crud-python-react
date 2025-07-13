import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { API } from "../api";

import type { INewOrderForm } from "../api/resources/products/IProduct";
import useAxiosErrorHandler from "./useAxiosErrorHandler";
import { useToastFactory } from "./useToastFactory";

const useRequestedOrdersTab = () => {
  const [openCreateNewOrder, setOpenCreateNewOrder] = useState<boolean>(false);
  const { onError } = useAxiosErrorHandler();

  const successToast = useToastFactory({
    toastType: "success",
    message: "",
  });

  const {
    data: dataRequestOrdersTable,
    isFetching: isLoadingRequestOrdersTable,
    refetch,
  } = useQuery({
    queryKey: ["dataRequestOrdersTable"],
    refetchOnWindowFocus: false,
    queryFn: () => API.Products.getRequestOrdersData().response,
  });

  const { mutateAsync: createProduct, isPending: isLoadingCreateRequestOrder } =
    useMutation({
      mutationFn: (newOrder: INewOrderForm) =>
        API.Products.createProduct(newOrder).response,
      onSuccess() {
        // successToast({
        //   description: translate({
        //     id: "repair.request.save.success",
        //   }),
        // });
        successToast({
          message: "Sucesso!",
          description: "Produto criado com sucesso!",
        });

        refetch();
      },
      onError(error) {
        onError(error);
      },
    });

  const handleCancelCreateNewOrder = () => {
    setOpenCreateNewOrder(false);
  };
    const handleOpenCreateNewOrder = () => {
    setOpenCreateNewOrder(true);
  };

  const confirmCreateNewOrder = async (data: INewOrderForm) => {
    try {
      console.log("fdfsdfdfdfsd");
      await createProduct(data);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    isLoadingRequestOrdersTable,
    dataRequestOrdersTable,
    openCreateNewOrder,
    handleCancelCreateNewOrder,
    handleOpenCreateNewOrder,
    confirmCreateNewOrder,
    isLoadingCreateRequestOrder,
  };
};

export default useRequestedOrdersTab;
