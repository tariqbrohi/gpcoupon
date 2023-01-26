import React from 'react';
import Router from 'next/router';
import useUser from '@/auth/useUser';
import { useLogoutMutation } from '@/services';
import {
  Dropdown,
  DropdownItemProps,
  DropdownProps,
  Image,
} from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import styled from 'styled-components';

const AvatarImage = styled(Image)`
  transition: all 0.7s ease-in-out;

  &:hover {
    transform: scale(1.3);
  }
`;

export default function Avatar(props: DropdownProps) {
  const { user } = useUser();
  const [logout] = useLogoutMutation();

  const handleClickDropdownItem = (_: any, data: DropdownItemProps) => {
    if (data.text === 'Logout') {
      logout({})
        .then(() => {
          Router.reload();
        })
        .catch(() => {});
    }

    if (data.text === 'My Gifts') {
      Router.push(ROUTES.orders);
    }

    if (data.text === 'Payment Methods') {
      Router.push(ROUTES.paymentCards);
    }

    if (data.text === 'My Dashboard') {
      Router.push(ROUTES.affiliateDashboard);
    }
  };

  return (
    <Dropdown
      icon={null}
      space
      direction="right"
      trigger={
        <AvatarImage
          rounded
          alt="profile"
          size="mini"
          src={
            user?.picture ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
        />
      }
      {...props}
    >
      <Dropdown.Menu>
        <Dropdown.Item text="My Gifts" onClick={handleClickDropdownItem} />
        <Dropdown.Item
          text="Payment Methods"
          onClick={handleClickDropdownItem}
        />
        {user?.type === 'BUSINESS' && (
          <Dropdown.Item
            text="My Dashboard"
            onClick={handleClickDropdownItem}
          />
        )}
        <Dropdown.Item text="Logout" onClick={handleClickDropdownItem} />
      </Dropdown.Menu>
    </Dropdown>
  );
}
