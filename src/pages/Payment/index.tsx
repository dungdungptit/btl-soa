import React, { useEffect, useState } from 'react';
import { useModel, history } from '@umijs/max';
import styles from './index.less';
import { user_info } from '@/services/user/user';
import { Breadcrumb, Button, Card, InputNumber, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ip } from '@/utils/ip';
import AddressPanel from './components/AddressPanel';

const HomePage: React.FC = () => {
  console.log(history.location.state, 'history.location.query');
  const paymentState = history.location.state;
  const [payment, setPayment] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      render: (value: any, record: any) => {
        // console.log(record, 'record');
        return <div>{String(record?.product?.title).slice(0, 10)}</div>;
      },
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      render: (value: any, record: any) => {
        const replaceString = 'http://product-service:9000';
        const newString = `${ip}:9116`;
        const newImage = String(record?.product?.images[0]?.image).replace(
          replaceString,
          newString,
        );

        // console.log(newImage, 'newImage');

        return (
          <img
            src={newImage}
            style={{ width: 80, height: 80, objectFit: 'cover' }}
          />
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (value: any, record: any) => {
        const config = {
          style: 'currency',
          currency: 'VND',
          maximumFractionDigits: 9,
        };
        const formatter = new Intl.NumberFormat('vi-VN', config);
        return <div>{formatter.format(Number(record?.product?.price))}</div>;
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      render: (value: any, record: any) => {
        const config = {
          style: 'currency',
          currency: 'VND',
          maximumFractionDigits: 9,
        };
        const formatter = new Intl.NumberFormat('vi-VN', config);
        return (
          <div>
            {formatter.format(
              Number(record?.product?.price) * Number(record?.quantity),
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Thanh toán</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Địa chỉ giao hàng" style={{ width: '100%' }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <AddressPanel payment={payment} setPayment={setPayment} />
      </Card>
      <Table
        columns={columns}
        dataSource={(paymentState?.selectedRows || []).map(
          (item: any, index: number) => {
            return {
              ...item,
              key: index + 1,
            };
          },
        )}
      />

      <div className={styles.total}>
        <div className={styles.total__title}>Tổng tiền</div>
        <div className={styles.total__price}>
          {paymentState?.total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          })}
          <Button type="primary">Đặt hàng</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
