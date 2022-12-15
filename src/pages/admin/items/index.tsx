/* eslint-disable jsx-a11y/alt-text */
import AdminLayout from '@/layouts/AdminLayout';
import React, { useContext, useState } from 'react';
import Router from 'next/router';
import stringSimilarity from 'string-similarity';
import { Button, Chip, DateInput, Dropdown, DropdownItemProps, DropdownProps, Heading, Icon, Input, Modal, Select, Spacer, Table, TextArea } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetItemsQuery } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';
import Provider from '@/components/admin/items/Provider';
import styled from 'styled-components';
import Link from 'next/link';
import Context from '@/components/admin/items/Context';

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
  border: 1px solid #BF7582;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  background-color: #fff;
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
      color: #2D126D;
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

export default withPageAuthRequired(function Items(props: DropdownProps) {
  const { item, setItem } = useContext(Context);
  const { data: items } = useGetItemsQuery();
  const [searchCoupon, setSearchCoupon] = useState('');
  const [searchMerchant, setSearchMerchant] = useState('');
  const [ startDate, setStartDate ] = useState('');
  const [ endDate, setEndDate ] = useState('');
  const [rqModalOpen, setRqModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const addDays = (date: any, days: any) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    
    return d.toLocaleDateString();
  }

  if (item?.price > 0) {
    const merchantProfitRate = item.price - (item.price * 0.2);

    item.amount = merchantProfitRate;
  }

  const statusOption = [
    {
      key: "All",
      value: "ALL",
      text: "All",
    },
    {
      key: "Available",
      value: "AVAILABLE",
      text: "Available",
    },
    {
      key: "Unavailable",
      value: "UNAVAILABLE",
      text: "Unavailable",
    },
  ];

  const rqStatusOption = [
    {
      key: "All",
      value: "ALL",
      text: "All",
    },
    {
      key: "Approved",
      value: "APPROVED",
      text: "Approved",
    },
    {
      key: "Rejected",
      value: "REJECTED",
      text: "Rejected",
    },
    {
      key: "Requested",
      value: "REQUESTED",
      text: "Requested",
    },
  ];

  const handleSearchButton = () => {
    if ((startDate !== '' && endDate) === '' || (startDate === '' && endDate !== '')) {
      alert('Please submit From date and To date');
      return;
    }
    // query({
    //   data: {
    //     take: TAKE,
    //     skip: (activePage - 1) * TAKE,
    //     startDate,
    //     endDate,
    //     status,
    //   }
    // });
  }

  const handleClickDropdownItem = (_: any, data: DropdownItemProps) => {
    if (data.text === 'Approve') {
      return (
        confirm('The coupon request status will change to Approved if you click the OK button.')
      );
    }

    // if (data.text === 'Reject') {
    //   // showModal();
    //   setModalOpen(!modalOpen);
      
    //   {modalOpen === true ? (
    //     <Modal>
    //       <ModalHeader subheader="Please write the reason for rejection in the comment column">
    //         Reject
    //       </ModalHeader>
    //       <Modal.Content>
    //         <ModalTextArea
    //           rows={10} 
    //           label="Comment"
    //           placeholder="Please leave a comment..."
    //           id="comment" 
    //           name="comment"
    //         />
    //       </Modal.Content>
    //       <ModalBtnContainer>
    //         <Button rounded primary>Reject</Button>
    //         <Button rounded onClick={() => setModalOpen(false)}>Close</Button>
    //       </ModalBtnContainer>
    //       <Spacer size={20} />
    //     </Modal>
    //   ) : (null)}

    //   // return (
    //   //   confirm('You clicked Reject')
    //   // );
    // }

    if (data.text === 'Change Publishable') {
      return (
        confirm('Click the OK button to change the current coupon status.')
      );
    }

    if (data.text === 'Delete') {
      return (
        confirm('Are you sure you want to delete this coupon request?')
      );
    }
  };

  return (
    <>
      <Head title='GPcoupon | List Request Coupon' />
      <AppMain>
        <AdminLayout>
          <section>
            <Heading style={{color: "#2D126D"}}>List Request Coupon</Heading>
            <Spacer size={20} />

            <LabelContainer style={{justifyContent: "space-between"}}>
              <Input
                label="Coupon Name"
                icon="search outline"
                value={searchCoupon}
                onChange={(e) => setSearchCoupon(e.target.value)}
                style={{width: "50%"}}
              />

              <Link href={ROUTES.admin.createItem}>
                <a>
                  <BtnCreateCpn>Create Coupon</BtnCreateCpn>
                </a>
              </Link>   
            </LabelContainer>
            <Spacer size={20} />

            <LabelContainer style={{justifyContent: "space-between"}}>
              <Input
                label="Merchant Name"
                icon="people"
                value={searchMerchant}
                onChange={(e) => setSearchMerchant(e.target.value)}
                style={{width: "50%"}}
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
                  label='Status'
                  value={statusOption[0].value}
                  options={statusOption}
                  style={{minWidth: "13em"}}
                />
                <Select 
                  label='Request Status'
                  value={rqStatusOption[0].value}
                  options={rqStatusOption}
                  style={{minWidth: "13em"}}
                />
              </GroupInputContainer>
            </LabelContainer>
          </section>
          <Spacer size={20} />

          <GroupInputContainer>
            <LabelContainer style={{justifyContent: "space-between"}}>
              <DateInput
                mask="yyyy-mm-dd"
                renderInput={(params) =>
                  <Input
                    {...params}
                    placeholder="yyyy-mm-dd"
                    label='From'
                    style={{width: "30%"}}
                  />
                }
                onChange={(_, date) => setStartDate(date)}
              />
              
              <DateInput
                mask="yyyy-mm-dd"
                renderInput={(params) =>
                  <Input
                    {...params}
                    placeholder="yyyy-mm-dd"
                    label='To'
                    style={{width: "30%"}}
                  />
                }
                onChange={(_, date) => setEndDate(date)}
              />
              <Button rounded onClick={() => handleSearchButton()}>
                Search
              </Button>
            </LabelContainer>
          </GroupInputContainer>
          <Spacer size={30} />

          <div style={{border: "2px solid #D9D9D9"}}></div>
          <Spacer size={30} />
          
          <Provider>
            <Table celled>
              <Table.Head>
                <Table.Row>
                  <TableHeadCell>Coupon Name</TableHeadCell>
                  <TableHeadCell>Merchant Name</TableHeadCell>
                  <TableHeadCell>Create Date</TableHeadCell>
                  <TableHeadCell>Expire Date</TableHeadCell>
                  <TableHeadCell>Original Price</TableHeadCell>
                  <TableHeadCell>Retail Price</TableHeadCell>
                  <TableHeadCell>Merchant Profit</TableHeadCell>
                  <TableHeadCell>Request Status</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Approver</TableHeadCell>
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
                  .map((item) => (
                    <Table.Row key={item.id}>
                      <TableCellLink 
                        onClick={() => Router.push(`${ROUTES.admin.items}/${item.id}`)}
                      >
                        {item.name}                      
                      </TableCellLink>
                      <TableCell>
                        Merchant Name
                      </TableCell>
                      <TableCell>
                        {new Date(Number(item.createdAt)).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {addDays(item.createdAt, item.expiresIn)}
                      </TableCell>
                      {/* {calculateAmount(order?.payment?.totalAmount, order?.payment?.price.amount, order?.item?.originalPrice, order?.item?.amount)} */}
                      
                      <TableCell>
                        ${item.originalPrice}
                      </TableCell>
                      <TableCell>
                        ${item?.price?.amount}
                        {/* ${item.price} */}
                        {/* $Retail Price */}
                      </TableCell>
                      <TableCell>
                        ${item.amount}
                        {/* $Merchant Profit */}
                      </TableCell>
                      <TableCell>
                        {/* Request Status */}
                        <Modal
                          trigger={
                            <ChipCustom text="REQUESTED" color={rqStatusOption[0].value === 'APPROVED' ? 'primary' : rqStatusOption[0].value === 'REJECTED' ? 'red-400' : 'green-400'} 
                              onClick={() => setRqModalOpen(true)}
                            />
                          }
                          open={rqModalOpen}
                        >
                          <ModalHeader subheader="Your coupon request has been rejected for the following reasons.">
                            Reject
                          </ModalHeader>
                          <Modal.Content>
                            <ModalTextArea 
                              rows={10} 
                              label="Comment"
                              placeholder="This should be filled in rejected comment data value..."
                              id="comment" 
                              name="comment"
                            />
                          </Modal.Content>
                          <ModalBtnContainer>
                            <Button rounded onClick={() => setRqModalOpen(false)}>Close</Button>
                          </ModalBtnContainer>
                          <Spacer size={20} />
                        </Modal>

                        {/* <ChipCustom text="REQUESTED" color={rqStatusOption[0].value === 'APPROVED' ? 'primary' : rqStatusOption[0].value === 'REJECTED' ? 'red-400' : 'green-400'} /> */}
                      </TableCell>
                      <TableCell>
                        <ChipCustom text={item.status} outlined color={item.status === 'AVAILABLE' ? 'primary' : 'red-400'} />
                      </TableCell>
                      <TableCell>
                        Approver
                      </TableCell>
                      <TableCell>
                        <DropdownCustom space direction='right' icon={null}
                          trigger={
                            <ChipCustom icon={{name: 'edit'}} size="big" outlined />
                          }
                          {...props}
                        >
                          <Dropdown.Menu>
                            <Dropdown.Item text="Approve" onClick={handleClickDropdownItem} />
                            {/* <Dropdown.Item text="Reject" onClick={handleClickDropdownItem} /> */}
                            <Modal
                              trigger={
                                <Dropdown.Item text="Reject" onClick={() => setModalOpen(true)} />
                              }
                              open={modalOpen}
                            >
                              <ModalHeader subheader="Please write the reason for rejection in the comment column">
                                Reject
                              </ModalHeader>
                              <Modal.Content>
                                <ModalTextArea 
                                  rows={10} 
                                  label="Comment"
                                  placeholder="Please leave a comment..."
                                  id="comment" 
                                  name="comment"
                                />
                              </Modal.Content>
                              <ModalBtnContainer>
                                <Button rounded primary>Reject</Button>
                                <Button rounded onClick={() => setModalOpen(false)}>Close</Button>
                              </ModalBtnContainer>
                              <Spacer size={20} />
                            </Modal>
                            <Dropdown.Item text="Change Publishable" onClick={handleClickDropdownItem} />
                            <Dropdown.Item text="Delete" onClick={handleClickDropdownItem} />
                          </Dropdown.Menu>
                        </DropdownCustom>
                      </TableCell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          </Provider>
        </AdminLayout>
      </AppMain>
    </>
  );
});