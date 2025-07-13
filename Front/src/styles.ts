import { Typography, Select, Row, Space, Modal, Col } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styled from 'styled-components';
const { Text } = Typography;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const TitleTable = styled(Text)`
  font-size: 1rem;
  font-weight: 600;
`;

export const CustomSelect = styled(Select)`
  max-width: 200;
  min-width: 130;
  width: 100%;
`;

export const RowTitle = styled(Row)`
  padding: 1.5rem 0 1rem 8px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ColButton = styled(Col)`
  justify-content: flex-end;
  display: flex;
  width: 100%;
`;
export const HeaderContent = styled(Content)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1rem;
`;
export const IconContent = styled(Content)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
`;

export const HeaderTitle = styled(Typography.Text)`
  font-size: 1rem;
`;
export const BodySpace = styled(Space)`
  font-size: 1rem;
`;

export const ModalHeader = styled(Content)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
  font-size: 1rem;
`;
export const FillModal = styled(Modal)`
  max-width: 26rem;
  padding: 1.5rem 2rem 1.5rem 2rem !important;
`;
