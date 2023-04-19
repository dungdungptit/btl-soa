// import { Setting } from '@/utils/constants';
import { useMediaQuery } from 'react-responsive';
import RightContent from '@/components/RightContent';
import HeaderSearch from '@/components/HeaderSearch';
import HeaderWishList from '@/components/HeaderWishList';
import HeaderCart from '@/components/HeaderCart';
import { useState } from 'react';
import MenuItem from './MenuItem';
import { history } from '@umijs/max';

const Header = () => {
  const isMediumScreen = useMediaQuery({
    query: '(min-width: 950px)',
  });

  const [visible, setVisible] = useState(false);

  const onVisibleChange = (b: boolean) => {
    setVisible(!b);
  };

  return (
    <div
      style={{
        padding: '0px 60px',
        height: 48,
        maxHeight: 48,
        backgroundColor: '#ffffff',
        color: '#4d5164',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => history.push('/home')}
        >
          <img style={{ width: 32, height: 32 }} src={'/logo.svg'} />{' '}
          <div
            style={{
              display: 'inline-block',
              marginLeft: 12,
              fontSize: 16,
              verticalAlign: 'top',
            }}
          >
            {'Ecommerce'}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <MenuItem title={'Trang chủ'} path={'/home'} name={'Trang chủ'} />
          <MenuItem title={'Sản phẩm'} path={'/products'} name={'Sản phẩm'} />
          <MenuItem title={'Giới thiệu'} path={'/about'} name={'Giới thiệu'} />
          <MenuItem title={'Liên hệ'} path={'/contact'} name={'Liên hệ'} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <HeaderSearch />
        </div>

        <div>
          <HeaderWishList />
        </div>

        <div>
          <HeaderCart />
        </div>

        <div>
          <RightContent />
        </div>
      </div>
    </div>
  );
};

export default Header;
