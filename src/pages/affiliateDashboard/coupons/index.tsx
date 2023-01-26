/* eslint-disable jsx-a11y/alt-text */
import AppContext from '@/modules/components/AppContext';
import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import React, { useEffect, useState, useContext } from 'react';
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
  Icon,
  Input,
  Modal,
  Select,
  Spacer,
  Table,
  TextArea,
  Pagination,
} from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import {
  useGetCouponRequestLazyQuery,
  useChangeCouponStatusMutation,
  useDeleteCouponRequestMutation,
} from '@/services';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';
import styled from 'styled-components';
import Link from 'next/link';
import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';

const TAKE = 20;

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
  width: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default function MyCouponRequests(props: DropdownProps) {
  const { user } = useContext(AppContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('ALL');
  const [requestStatus, setRequestStatus] = useState('ALL');
  const [activePage, setActivePage] = useState(1);
  const [query, { data: items, loading }] = useGetCouponRequestLazyQuery();
  const [changeUpdate, { loading: changeLoading }] =
    useChangeCouponStatusMutation();
  const [deleteUpdate, { loading: deleteLoading }] =
    useDeleteCouponRequestMutation();
  const [searchCoupon, setSearchCoupon] = useState('');
  const [rqModalOpen, setRqModalOpen] = useState(false);
  const [render, setRender] = useState(false);
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
      value: 'approved',
      text: 'Approved',
    },
    {
      key: 'Rejected',
      value: 'rejected',
      text: 'Rejected',
    },
    {
      key: 'Requested',
      value: 'requested',
      text: 'Requested',
    },
    {
      key: 'Modify Requested',
      value: 'modifyRequested',
      text: 'Modify Requested',
    },
  ];

  const fetchData = async () => {
    await query({
      data: {
        take: TAKE,
        skip: (activePage - 1) * TAKE,
        startDate,
        endDate,
        status,
        requestStatus,
      },
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    // console.log('@pages/affiliateDashboard/coupons - useEffect - user: ', user);
    fetchData();
  }, [activePage, status, requestStatus, user]);

  const handlePageChange = (_: any, { activePage }: any) => {
    setActivePage(activePage);
  };

  const handleSearchButton = () => {
    if (
      (startDate !== '' && endDate === '') ||
      (startDate === '' && endDate !== '')
    ) {
      alert('Please submit From date and To date');
      return;
    }
    fetchData();
  };

  const handleClickDropdownItem = (_: any, data: DropdownItemProps) => {
    if (data.disabled === true) return;

    console.log('data.item: ', data.item);

    if (data.text === 'Change Status') {
      if (
        confirm('Click the OK button to change the current coupon status.') ===
        true
      ) {
        const changedStatus =
          data.item.status === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE';
        console.log('changedStatus: ', changedStatus);
        changeUpdate({
          data: {
            id: data.item.id,
            status: changedStatus,
          },
        })
          .then(() => {
            // alert('Successfully Updated');
            window.location.reload();
          })
          .catch((err) => {
            alert('Something went wrong, please try again');
          });
      } else {
        return;
      }
    }

    if (data.text === 'Delete') {
      if (
        confirm('Are you sure you want to delete this coupon request?') === true
      ) {
        deleteUpdate({
          data: {
            id: data.item.id,
          },
        })
          .then(() => {
            // alert('Successfully Deleted');
            window.location.reload();
          })
          .catch((err) => {
            alert('Something went wrong, please try again');
          });
      } else {
        return;
      }
    }
  };

  return (
    <>
      <Head title="GPcoupon | My Coupon Requests" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <AffiliateDashboardLayout>
            <section>
              <Heading style={{ color: '#2D126D' }}>
                List Request Coupon
              </Heading>
              <Spacer size={20} />

              <LabelContainer style={{ justifyContent: 'space-between' }}>
                <Input
                  label="Coupon Name"
                  icon="search outline"
                  value={searchCoupon}
                  onChange={(e) => setSearchCoupon(e.target.value)}
                  style={{ width: '50%' }}
                />

                <Link href={ROUTES.affiliateCouponRequest}>
                  <a>
                    <BtnCreateCpn>Create Coupon</BtnCreateCpn>
                  </a>
                </Link>
              </LabelContainer>
              <Spacer size={20} />
              <LabelContainer style={{ justifyContent: 'space-between' }}>
                <GroupInputContainer>
                  <Select
                    label="Status"
                    value={statusOption[0].value}
                    options={statusOption}
                    style={{ minWidth: '13em' }}
                    onChange={(_, data) => setStatus(data.newValues)}
                  />
                  <Select
                    label="Request Status"
                    value={rqStatusOption[0].value}
                    options={rqStatusOption}
                    style={{ minWidth: '13em' }}
                    onChange={(_, data) => setRequestStatus(data.newValues)}
                  />
                </GroupInputContainer>
                <Link href={ROUTES.affiliateCreateBrands}>
                  <a>
                    <BtnCreateBrd>Create Brand</BtnCreateBrd>
                  </a>
                </Link>
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
            <Table celled>
              <Table.Head>
                <Table.Row>
                  <TableHeadCell>Coupon Name</TableHeadCell>
                  <TableHeadCell>Create Date</TableHeadCell>
                  <TableHeadCell>Expiry</TableHeadCell>
                  <TableHeadCell>Original Price</TableHeadCell>
                  <TableHeadCell>Retail Price</TableHeadCell>
                  <TableHeadCell>My Profit</TableHeadCell>
                  <TableHeadCell>Request Status</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  {/* <TableHeadCell>Admin Approver</TableHeadCell> */}
                  <TableHeadCell>Action</TableHeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {items?.items
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
                          Router.push(
                            `${ROUTES.affiliateCouponRequestList}/${item.id}`,
                          )
                        }
                      >
                        {item.name}
                      </TableCellLink>
                      <TableCell>
                        {new Date(Number(item.createdAt)).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{item.expiresIn} days</TableCell>
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
                          onClick={() => {
                            if (item.approvalStatus.status === 'rejected') {
                              setRqModalOpen(true);
                            } else {
                              setRqModalOpen(false);
                            }
                          }}
                        />
                        <Modal
                          open={rqModalOpen}
                          onClose={() => setRqModalOpen(false)}
                        >
                          <ModalHeader subheader="Your coupon request has been rejected for the following reasons.">
                            Rejected
                          </ModalHeader>
                          <Modal.Content>
                            {item.approvalStatus.message || ''}
                          </Modal.Content>
                          <ModalBtnContainer>
                            <Button
                              rounded
                              onClick={() => setRqModalOpen(false)}
                            >
                              Close
                            </Button>
                          </ModalBtnContainer>
                          <Spacer size={20} />
                        </Modal>
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
                            />
                          }
                          {...props}
                        >
                          <Dropdown.Menu>
                            <Dropdown.Item
                              text="Change Status"
                              item={item}
                              onClick={handleClickDropdownItem}
                              disabled={
                                item.approvalStatus[
                                  item.approvalStatus.length - 1
                                ].status !== 'approved'
                              }
                            />
                            {/* <Dropdown.Item
                              text="Delete"
                              item={item}
                              onClick={handleClickDropdownItem}
                              disabled={
                                item.approvalStatus[
                                  item.approvalStatus.length - 1
                                ].status !== 'requested'
                              }
                            /> */}
                          </Dropdown.Menu>
                        </DropdownCustom>
                      </TableCell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
            <Spacer size={20} />
            <Pagination
              totalPages={Math.ceil((items?.totalCount || 1) / TAKE)}
              onPageChange={handlePageChange}
              activePage={activePage}
            />
          </AffiliateDashboardLayout>
        </AppContainer>
      </AppMain>
    </>
  );
}
