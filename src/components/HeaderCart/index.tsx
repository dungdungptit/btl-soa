import React, { useEffect } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { history, useModel } from '@umijs/max';

const onSearch = (value: string) => history.push('/cart');

const App: React.FC = () => {
  const cart = useModel('cart');
  useEffect(() => {
    cart.getData({});
  }, []);

  return (
    <div style={{ display: 'flex', cursor: 'pointer' }} onClick={onSearch}>
      <Badge count={cart.danhSach.length}>
        <ShoppingCartOutlined style={{ fontSize: 24 }} />
      </Badge>
    </div>
  );
};

export default App;
