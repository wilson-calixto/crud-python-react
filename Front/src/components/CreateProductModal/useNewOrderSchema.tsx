import * as yup from 'yup';

const useNewOrderSchema = () => {
 
  return yup.object({
    name: yup.string().required("campo obrigatório"),
    description: yup.string().required("campo obrigatório"),
    qty: yup
      .number()
      .min(1, 'valor mínino do campo')
      .required("campo obrigatório"),
    amount: yup
      .number()
      .min(0.01, 'valor mínino do campo')
      .required("campo obrigatório"),
  });
};


export default useNewOrderSchema;
