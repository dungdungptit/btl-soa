import React, { useState } from 'react';
import { PictureOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Form, Upload, Modal, Button } from 'antd';
import { useModel, history } from 'umi';
import { post_image } from '@/services/ai_search';

const { Search } = Input;

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productsModel = useModel('products');
  const [formSearch] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    // console.log(formSearch.getFieldsValue(), 'form.getFieldValue()');
    const { fileList } = formSearch.getFieldsValue();
    console.log(fileList, 'fileList');
    const formData = new FormData();
    formData.append('file', fileList?.fileList[0]?.originFileObj);

    const res = await post_image(formData);
    console.log(res, 'res');
    productsModel.setCondition({
      ...productsModel.condition,
      search: res.data,
    });

    productsModel.getData({
      ...productsModel.condition,
      search: res.data,
    });
    setIsModalOpen(false);

    history.push('/products');
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

  const onSearch = (value: string) => {
    productsModel.setCondition({
      ...productsModel.condition,
      search: value,
    });
    productsModel.getData({
      ...productsModel.condition,
      search: value,
    });

    history.push('/products');
  };

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
          form={formSearch}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 360, display: 'flex', justifyContent: 'center' }}
        >
          <Form.Item name="fileList" style={{ marginBottom: 0 }}>
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
