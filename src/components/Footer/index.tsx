import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  return (
    <DefaultFooter
      style={{ backgroundColor: '#fff' }}
      copyright={`2023`}
      links={[
        {
          key: 'github',
          title: 'Học viện Công nghệ Bưu chính Viễn thông',
          href: 'https://portal.ptit.edu.vn/',
          blankTarget: true,
        },
      ]}
    />
  );
};
