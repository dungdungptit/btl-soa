import React, { useEffect, useState } from 'react';
import { useModel, history } from 'umi';
import styles from './index.less';
import { user_info } from '@/services/user/user';
import { Breadcrumb, Button, InputNumber, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ip } from '@/utils/ip';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const HomePage: React.FC = () => {
  const orders = useModel('orders');
  const [total, setTotal] = useState(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const asyncFunc = async () => {
        const userId = await user_info();
        console.log(userId.data?.id, 'userId');
        const condition = {
          user_id: userId.data?.id,
        };
        orders.getData({ ...condition });
      };
      asyncFunc();
    }
  }, []);

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
      render: (value: any, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}></div>
      ),
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
    {
      title: 'Thao tác',
      dataIndex: 'action',
      render: (value: any, record: any) => {
        return <div></div>;
      },
    },
  ];

  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Giỏ hàng</Breadcrumb.Item>
      </Breadcrumb>

      <Table
        columns={columns}
        dataSource={(orders.danhSach || []).map((item: any, index: number) => {
          return {
            ...item,
            key: index + 1,
          };
        })}
      />

      <div className={styles.total}>
        <div className={styles.total__title}>Tổng tiền</div>
        <div className={styles.total__price}>
          {total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
