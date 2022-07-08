import React from 'react';
import Router from 'next/router';
import { Dropdown, DropdownItemProps, Image } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useUser } from '@auth0/nextjs-auth0';

export default function Avatar() {
  const { user } = useUser();

  const handleClickDropdownItem = (_: any, data: DropdownItemProps) => {
    if (data.text === 'Logout') {
      return Router.push(ROUTES.logout);
    }
  };

  return (
    <Dropdown
      icon={null}
      space
      direction="right"
      trigger={
        <Image
          rounded
          alt="profile"
          size="mini"
          src={
            user?.picture ||
            'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
          }
        />
      }
    >
      <Dropdown.Menu>
        <Dropdown.Item text="Logout" onClick={handleClickDropdownItem} />
      </Dropdown.Menu>
    </Dropdown>
  );
}
