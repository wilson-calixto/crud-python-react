import { notification, type NotificationArgsProps } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
 
type ToastType = 'success' | 'error' | 'warn';

export type ToastFactoryArgs = NotificationArgsProps & {
  toastType?: ToastType;
};

const getIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 20 }} />;
    case 'error':
      return <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />;
    case 'warn':
    default:
      return <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: 20 }} />;
  }
};

export const useToastFactory = ({ toastType = 'success', ...args }: ToastFactoryArgs) =>{
  return (args: NotificationArgsProps) => {
    notification.open({
      placement: 'topRight',
      icon: getIcon(toastType),
      ...args,
      message:''
    });
  };
};
