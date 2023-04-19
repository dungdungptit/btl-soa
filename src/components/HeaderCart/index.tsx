import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { history } from '@umijs/max';

const onSearch = (value: string) => history.push('/cart');

const App: React.FC = () => (
  <div style={{ display: 'flex', cursor: 'pointer' }} onClick={onSearch}>
    <Badge count={5}>
      <ShoppingCartOutlined style={{ fontSize: 24 }} />
    </Badge>
  </div>
);

export default App;
