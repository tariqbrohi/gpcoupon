import AdminSidebar from '@/components/sidebar/AdminSidebar';
import React, { CSSProperties, ReactNode } from 'react';
import { Sidebar } from '@growth-ui/react';

export default function AdminLayout(props: Props) {
  return (
    <Sidebar.Pushable style={styles.pushable}>
      <AdminSidebar />
      <Sidebar.Pusher style={styles.pusher}>{props.children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

const styles: Record<string, CSSProperties> = {
  pushable: {
    minHeight: '100vh',
    height: '100%',
  },
  pusher: {
    padding: '80px 26px',
  },
};

type Props = {
  children: ReactNode;
};
