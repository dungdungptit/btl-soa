import React, { useState } from 'react';
import { PictureOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Form, Upload, Modal, Button } from 'antd';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const suffix = (
    <PictureOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
      onClick={() => showModal()}
    />
  );

  return (
    <div style={{ display: 'flex' }}>
      <Search
        placeholder="Tìm kiếm"
        size="middle"
        allowClear
        suffix={suffix}
        onSearch={onSearch}
      />
      <Modal
        title="Tìm kiếm ảnh"
        open={isModalOpen}
        width={400}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="link" type="primary" onClick={handleOk}>
            Tìm kiếm
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 360, display: 'flex', justifyContent: 'center' }}
        >
          <Form.Item valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>
                  Kéo hình ảnh vào đây hoặc tải tệp lên
                </div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
