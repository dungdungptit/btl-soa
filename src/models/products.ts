// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';
import { message } from 'antd';
import { getProducts, getProduct, add_to_cart } from '../services/products/products';

export default () => {
    const [name, setName] = useState<string>(DEFAULT_NAME);
    const [danhSach, setDanhSach] = useState<any[]>([]);
    const [product, setProduct] = useState<any>(null);

    const getData = (payload: any) => {
        try {
            getProducts(payload).then((res) => {
                setDanhSach(res.data?.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getProductById = (id: any) => {
        try {
            getProduct(id).then((res) => {
                setProduct(res.data?.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = (payload: any) => {
        try {
            add_to_cart(payload).then((res) => {
                if (res.status === 201) message.success('Thêm vào giỏ hàng thành công');
            });
        } catch (error) {
            console.log(error);
            message.error('Sản phẩm đã hết hoặc ngừng kinh doanh');
        }
    };

    return {
        name,
        setName,
        danhSach,
        setDanhSach,
        product,
        setProduct,

        getData,
        getProductById,
        addToCart,
    };
};

