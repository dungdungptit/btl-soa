import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
// import { getInfo, login } from '@/services/Auth/auth';
import { Link, useModel } from 'umi';
import styles from './index.less';
import Title from 'antd/lib/typography/Title';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { user_info } from '@/services/user/user';
// import data from '@/utils/data';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loading, setLoading, loginModel } = useModel('user');

  const onFinish = async (values: { username: string; password: string }) => {
    // console.log('Success:', values);
    console.log('Success:', values);
    const res = await loginModel({
      username: values.username,
      password: values.password,
    });
    console.log('res', res);
    if (res.status === 200 && res.data) {
      const info = await user_info();
      localStorage.setItem('token', res.data);
      localStorage.setItem('username', values.username);
      console.log('info', info);
      if (info.status === 200) {
        let systemRole = '';
        if (info.data?.is_superuser === true) {
          systemRole = 'Admin';
        } else if (info.data?.is_staff === true) {
          systemRole = 'Staff';
        } else {
          systemRole = 'User';
        }
        localStorage.setItem('vaiTro', systemRole);
        setInitialState({
          ...initialState,
          currentUser: {
            ...info.data,
            systemRole: systemRole,
          },
        });
        history.push('/home');
        return;
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <Link to="/" className={styles.header}>
            <img alt="logo" className={styles.logo} src="/logo.svg" />
            <Title level={1} className={styles.title}>
              Ecommerce
            </Title>
          </Link>
        </div>

        <div className={styles.main}>
          <Form
            name="normal_login"
            className={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Nhập tài khoản!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tài khoản"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Nhớ tài khoản</Checkbox>
              </Form.Item>

              <a className={styles.loginFormFogot} href="">
                Quên mật khẩu
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
              >
                Đăng nhập
              </Button>
              <a href="/user/register" className={styles.loginFormRegister}>
                Đăng ký
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
