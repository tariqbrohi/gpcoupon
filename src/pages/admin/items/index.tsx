import AdminLayout from '@/layouts/AdminLayout';
import React, { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import stringSimilarity from 'string-similarity';
import {
  Button,
  Chip,
  DateInput,
  Dropdown,
  DropdownItemProps,
  DropdownProps,
  Heading,
  Input,
  Modal,
  Select,
  Spacer,
  Table,
  TextArea,
} from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetItemsQuery, useUpdateItemMutation } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';
import Provider from '@/components/admin/items/Provider';
import styled from 'styled-components';
import Link from 'next/link';
import { ApproveStatus, Prisma } from '@prisma/client';

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BtnCreateCpn = styled(Button)`
  min-width: 172px;
  max-width: 205px;
  font-weight: 600;
  font-size: 18px;
  padding: 10px 35px;
  border-radius: 30px;
  border 1px solid transparent;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  background-color: #FBD9D8;
  color: #BF7582;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #F6A5A5;
    color: #fff;
  }

  ${({ theme }) => theme.gui.media.custom(1920)} {
    font-size: 14px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    font-size: 12px;
  }
`;

const BtnCreateBrd = styled(Button)`
  min-width: 172px;
  max-width: 205px;
  font-weight: 600;
  font-size: 18px;
  padding: 10px 35px;
  border-radius: 30px;
  border: 1px solid #bf7582;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  background-color: #fff;
  color: #bf7582;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #f6a5a5;
    color: #fff;
  }

  ${({ theme }) => theme.gui.media.custom(1920)} {
    font-size: 14px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    font-size: 12px;
  }
`;

const GroupInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const TableHeadCell = styled(Table.HeadCell)`
  text-align: center;
`;

const TableCell = styled(Table.Cell)`
  text-align: center;
`;

const TableCellLink = styled(Table.Cell)`
  cursor: pointer;
  color: #4183c4;
  text-align: center;
  transition: all 0.4s ease-in-out;

  &:hover {
    color: #2d126d;
    text-decoration: underline;
  }
`;

const ChipCustom = styled(Chip)`
  margin: 0 auto;
  cursor: pointer;
`;

const DropdownCustom = styled(Dropdown)`
  width: auto;

  & > span {
    display: none;
  }
`;

const ModalHeader = styled(Modal.Header)`
  text-align: center;
`;

const ModalTextArea = styled(TextArea)`
  width: 50%;
  margin: 0 auto;
`;

const ModalBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default withPageAuthRequired(function Items(props: DropdownProps) {
  const { data: items } = useGetItemsQuery();
  const [searchCoupon, setSearchCoupon] = useState('');
  const [searchMerchant, setSearchMerchant] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [modalSwitch, setModalSwitch] = useState(false);

  const [message, setMessage] = useState('');
  const [rejectItem, setRejectItem] = useState<any>();

  const [update, { loading: itemUpdateLoading }] = useUpdateItemMutation();
  console.log('@pages/admin/items - items---------------------', items);

  const addDays = (date: any, days: any) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);

    return d.toLocaleDateString();
  };

  const statusOption = [
    {
      key: 'All',
      value: 'ALL',
      text: 'All',
    },
    {
      key: 'Available',
      value: 'AVAILABLE',
      text: 'Available',
    },
    {
      key: 'Unavailable',
      value: 'UNAVAILABLE',
      text: 'Unavailable',
    },
  ];

  const rqStatusOption = [
    {
      key: 'All',
      value: 'ALL',
      text: 'All',
    },
    {
      key: 'Approved',
      value: 'APPROVED',
      text: 'Approved',
    },
    {
      key: 'Rejected',
      value: 'REJECTED',
      text: 'Rejected',
    },
    {
      key: 'Requested',
      value: 'REQUESTED',
      text: 'Requested',
    },
  ];

  const handleSearchButton = () => {
    if (
      (startDate !== '' && endDate) === '' ||
      (startDate === '' && endDate !== '')
    ) {
      alert('Please submit From date and To date');
      return;
    }
  };

  const handleRejectUpdate = async () => {
    console.log('handleRejectUpdate: ', message);
    if (message === '' || message.length === 0) {
      alert('Please enter a message to reject the coupon request.');
      setModalSwitch(true);
      return;
    }

    console.log('rejecteItem: ', rejectItem);

    await update({
      data: {
        ...rejectItem,
        id: rejectItem.id,
        available: false,
        approvalStatus: {
          status: ApproveStatus.rejected,
          message,
        },
      },
    })
      .then(() => {
        setModalSwitch(false);
        setMessage('');
        alert('The coupon request status has been changed to Rejected.');
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
        setModalSwitch(false);
        setMessage('');
      });
  };

  const handleReject = async (_: any, data: DropdownItemProps) => {
    console.log('@handleReject----------', data.item);

    // Set Reject Item
    setRejectItem(data.item);
    // Open Modal
    setModalSwitch(true);
    // reset message
    setMessage('');
  };

  const handleClickDropdownItem = async (_: any, data: DropdownItemProps) => {
    console.log('@Action handler: ', data.item);

    if (data.text === 'Approve') {
      console.log('Approve Clicked => processing update');
      // Update status and change Request Status.
      await update({
        data: {
          ...data.item,
          id: data.item.id,
          available: true,
          approvalStatus: {
            status: ApproveStatus.approved,
          },
        },
      })
        .then(() => {
          alert('The coupon request status has been changed to Approved.');
          window.location.reload();
        })
        .catch((error) => {
          alert(error.message);
        });
    }

    if (data.text === 'Change Status') {
      console.log('Change Status------------------');
      console.log('Change Publishable Clicked => processing update');
      await update({
        data: {
          ...data.item,
          id: data.item.id,
          available: data.item.status === 'AVAILABLE' ? false : true,
          approvalStatus: {
            status: ApproveStatus.approved,
            message: 'Admin changed the status of the coupon.',
          },
        },
      })
        .then(() => {
          alert('The coupon status has been changed.');
          window.location.reload();
        })
        .catch((error) => {
          alert(error.message);
        });
    }

    if (data.text === 'Delete') {
      console.log('Delete Clicked => processing update');
      await update({
        data: {
          ...data.item,
          id: data.item.id,
          available: false,
          approvalStatus: {
            status: ApproveStatus.deleted,
            message: 'Admin deleted the coupon.',
          },
        },
      })
        .then(() => {
          alert('The coupon request status has been changed to Deleted.');
          window.location.reload();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <>
      <Head title="GPcoupon | List Request Coupon" />
      <AppMain>
        <AdminLayout>
          <section>
            <Heading style={{ color: '#2D126D' }}>List Request Coupon</Heading>
            <Spacer size={20} />

            <LabelContainer style={{ justifyContent: 'space-between' }}>
              <Input
                label="Coupon Name"
                icon="search outline"
                value={searchCoupon}
                onChange={(e) => setSearchCoupon(e.target.value)}
                style={{ width: '50%' }}
              />

              <Link href={ROUTES.admin.createItem}>
                <a>
                  <BtnCreateCpn>Create Coupon</BtnCreateCpn>
                </a>
              </Link>
            </LabelContainer>
            <Spacer size={20} />

            <LabelContainer style={{ justifyContent: 'space-between' }}>
              <Input
                label="Merchant Name"
                icon="people"
                value={searchMerchant}
                onChange={(e) => setSearchMerchant(e.target.value)}
                style={{ width: '50%' }}
              />
              <Link href={ROUTES.admin.createBrand}>
                <a>
                  <BtnCreateBrd>Create Brand</BtnCreateBrd>
                </a>
              </Link>
            </LabelContainer>
            <Spacer size={20} />

            {/* <LabelContainer>
              <GroupInputContainer>
                <Input label='Create Date' placeholder='From' icon="calendar" iconPosition='right' />
                <Input label='Create Date' placeholder='To' icon="calendar" iconPosition='right' />
              </GroupInputContainer>
            </LabelContainer>
            <Spacer size={20} /> */}

            <LabelContainer>
              <GroupInputContainer>
                <Select
                  label="Status"
                  value={statusOption[0].value}
                  options={statusOption}
                  style={{ minWidth: '13em' }}
                />
                <Select
                  label="Request Status"
                  value={rqStatusOption[0].value}
                  options={rqStatusOption}
                  style={{ minWidth: '13em' }}
                />
              </GroupInputContainer>
            </LabelContainer>
          </section>
          <Spacer size={20} />

          <GroupInputContainer>
            <LabelContainer style={{ justifyContent: 'space-between' }}>
              <DateInput
                mask="yyyy-mm-dd"
                renderInput={(params) => (
                  <Input
                    {...params}
                    placeholder="yyyy-mm-dd"
                    label="From"
                    style={{ width: '30%' }}
                  />
                )}
                onChange={(_, date) => setStartDate(date)}
              />

              <DateInput
                mask="yyyy-mm-dd"
                renderInput={(params) => (
                  <Input
                    {...params}
                    placeholder="yyyy-mm-dd"
                    label="To"
                    style={{ width: '30%' }}
                  />
                )}
                onChange={(_, date) => setEndDate(date)}
              />
              <Button rounded onClick={() => handleSearchButton()}>
                Search
              </Button>
            </LabelContainer>
          </GroupInputContainer>
          <Spacer size={30} />

          <div style={{ border: '2px solid #D9D9D9' }}></div>
          <Spacer size={30} />

          <Provider>
            <Table celled>
              <Table.Head>
                <Table.Row>
                  <TableHeadCell>Coupon Name</TableHeadCell>
                  <TableHeadCell>Merchant Name (username)</TableHeadCell>
                  <TableHeadCell>Create Date</TableHeadCell>
                  <TableHeadCell>Expiry</TableHeadCell>
                  <TableHeadCell>Original Price</TableHeadCell>
                  <TableHeadCell>Retail Price</TableHeadCell>
                  <TableHeadCell>Merchant Profit</TableHeadCell>
                  <TableHeadCell>Request Status</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Admin Approver</TableHeadCell>
                  <TableHeadCell>Action</TableHeadCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {items
                  ?.filter(({ name }) => {
                    if (!searchCoupon) return true;

                    const similarity = stringSimilarity.compareTwoStrings(
                      name,
                      searchCoupon,
                    );

                    if (similarity > 0.25) return true;

                    return false;
                  })
                  .map((item: any) => (
                    <Table.Row key={item.id}>
                      <TableCellLink
                        onClick={() =>
                          Router.push(`${ROUTES.admin.items}/${item.id}`)
                        }
                      >
                        {item.name}
                      </TableCellLink>

                      {item.brand.metadata.businessName !== undefined ? (
                        <TableCell>
                          {item.brand.metadata.businessName}
                          {` `}({item.brand.metadata.owner?.username})
                        </TableCell>
                      ) : (
                        <TableCell>-</TableCell>
                      )}

                      <TableCell>
                        {new Date(Number(item.createdAt)).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {/* {addDays(item.createdAt, item.expiresIn)} */}
                        {item.expiresIn}
                      </TableCell>
                      {/* {calculateAmount(order?.payment?.totalAmount, order?.payment?.price.amount, order?.item?.originalPrice, order?.item?.amount)} */}

                      <TableCell>${item.originalPrice}</TableCell>
                      <TableCell>${item?.price?.amount}</TableCell>
                      <TableCell>${item.amount}</TableCell>
                      <TableCell>
                        <ChipCustom
                          text={item.approvalStatus[
                            item.approvalStatus.length - 1
                          ].status.toUpperCase()}
                          color={
                            item.approvalStatus[
                              item.approvalStatus.length - 1
                            ].status.toUpperCase() === 'APPROVED'
                              ? 'primary'
                              : item.approvalStatus[
                                  item.approvalStatus.length - 1
                                ].status.toUpperCase() === 'REJECTED'
                              ? 'red-400'
                              : item.approvalStatus[
                                  item.approvalStatus.length - 1
                                ].status.toUpperCase() === 'REQUESTED'
                              ? 'green-400'
                              : 'yellow-400'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <ChipCustom
                          text={item.status}
                          outlined
                          color={
                            item.status === 'AVAILABLE' ? 'primary' : 'red-400'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {item.approvalStatus[item.approvalStatus.length - 1]
                          .approver !== null
                          ? item.approvalStatus[item.approvalStatus.length - 1]
                              .approver?.adminInfo?.nickname
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <DropdownCustom
                          space
                          direction="right"
                          icon={null}
                          trigger={
                            <ChipCustom
                              icon={{ name: 'dots horizontal rounded' }}
                              size="big"
                              outlined
                              onClick={() => setModalSwitch(false)}
                            />
                          }
                          {...props}
                        >
                          <Dropdown.Menu>
                            <Dropdown.Item
                              text="Approve"
                              item={item}
                              onClick={handleClickDropdownItem}
                            />
                            <Dropdown.Item
                              text="Reject"
                              item={item}
                              onClick={handleReject}
                            />
                            <Dropdown.Item
                              text="Change Status"
                              item={item}
                              onClick={handleClickDropdownItem}
                            />
                            <Dropdown.Item
                              text="Delete"
                              item={item}
                              onClick={handleClickDropdownItem}
                            />
                          </Dropdown.Menu>
                        </DropdownCustom>
                      </TableCell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
            <Modal open={modalSwitch}>
              <ModalHeader subheader="Please write the reason for rejection in the comment column">
                Reject
              </ModalHeader>
              <Modal.Content>
                <ModalTextArea
                  rows={10}
                  label="Request Denied Message"
                  id="message"
                  name="message"
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setMessage(e.target.value)}
                />
              </Modal.Content>
              <ModalBtnContainer>
                <Modal.Actions>
                  <Button
                    rounded
                    primary
                    onClick={() => {
                      setModalSwitch(false);
                      handleRejectUpdate();
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    rounded
                    onClick={() => {
                      setMessage('');
                      setModalSwitch(false);
                    }}
                  >
                    Close
                  </Button>
                </Modal.Actions>
                <Spacer size={20} />
              </ModalBtnContainer>
            </Modal>
          </Provider>
        </AdminLayout>
      </AppMain>
    </>
  );
});
