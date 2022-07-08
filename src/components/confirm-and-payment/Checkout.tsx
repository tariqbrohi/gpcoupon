import React from 'react';
import ThemeButton from '@/modules/components/ThemeButton';
import { Modal, ModalProps } from '@growth-ui/react';

export default function Checkout(props: ModalProps) {
  return (
    <Modal {...props}>
      <Modal.Content>
        <ThemeButton fluid>Checkout</ThemeButton>
      </Modal.Content>
    </Modal>
  );
}
