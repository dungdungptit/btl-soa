import { DefaultFooter } from '@ant-design/pro-layout';
import { Button, notification } from 'antd';
import { useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { useModel, history } from 'umi';

export default () => {
  const { socket, initSocket } = useModel('socket');

  useEffect(() => {
    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log(data);

      if (data.type === 'service_message') {
        if (typeof data?.message === 'string') {
          if (data?.status === 'start') {
            notification.warning({
              placement: 'topRight',
              message: 'Bạn có thông báo mới',
              description: data?.message + '\n' + data?.method ?? '',
              // btn: (
              //   <Button
              //     type="primary"
              //     onClick={() => {
              //       history.push('/alert');
              //     }}
              //   >
              //     Xem thêm
              //   </Button>
              // ),
            });
          } else if (data?.status === 'finished') {
            notification.success({
              placement: 'topRight',
              message: 'Bạn có thông báo mới',
              description: data?.message + '\n' + data?.method ?? '',
            });
          }
        }
      }
    };
    return () => {
      socket?.close();
    };
  }, []);

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
