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

export default function Avatar(props: DropdownProps) {
  const user = useUser();
  const [logout] = useLogoutMutation();

  const handleClickDropdownItem = (_: any, data: DropdownItemProps) => {
    if (data.text === 'Logout') {
      logout({})
        .then(() => {
          Router.reload();
        })
        .catch(() => {});
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
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
        />
      }
      {...props}
    >
      <Dropdown.Menu>
        <Dropdown.Item text="Logout" onClick={handleClickDropdownItem} />
      </Dropdown.Menu>
    </Dropdown>
  );
}
