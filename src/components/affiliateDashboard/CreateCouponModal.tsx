import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Spacer, TextArea } from "@growth-ui/react";
import { useCouponRequestMutation } from "@/services";
import parseErrorMessage from "@/lib/parse-error-message";
import isEmail from 'validator/lib/isEmail';
import styled from "styled-components";

const ModalContainer = styled(Modal)`
  top: 56%;
  
  ${({ theme }) => theme.gui.media.mobile} {
    top: 45%;
  }
`;

export default function CreateCouponRequest() {
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gwalletBusinessUsername, setGwalletBusinessUsername ] = useState("");
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [couponInfo, setCouponInfo] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [create, { loading }] = useCouponRequestMutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>('');

  const resetStates = () => {
    setBusinessName("");
    setPhoneNumber("");
    setGwalletBusinessUsername("");
    setBrandName("");
    setEmail("");
    setCouponInfo("");
  }

  const handleSubmit= async (action: string) => {
    if (action === 'cancel') {
      resetStates();
      setOpenModal(false);
      return;
    }

    if (
      businessName === "" || 
      phoneNumber === "" || 
      gwalletBusinessUsername === "" || 
      brandName === "" || 
      couponInfo === "" ||
      email === "" ||
      !isEmail(email)
    ) return;

    await create({
      data: {
        businessName,
        phoneNumber,
        gwalletBusinessUsername,
        brandName,
        email,
        couponInfo
      }
    })
      .then(() => {
        setSuccess(true);
        alert('Coupon request was submitted!');
      })
      .catch((err) => {
        setError(parseErrorMessage(err));
        alert('Something went wrong! Please try again!');
      });

    resetStates();
    setOpenModal(false);
  } 

  return(
    <ModalContainer 
      trigger={
        <Button 
          onClick={() => setOpenModal(true)}
          style={{
            marginLeft: "auto",
          }}
        >
          Create Coupon Request
        </Button>
      }
      open={openModal}
      onClose={() => resetStates()}
    >
      <Modal.Header
        subheader="Fill out the form to create a GPoint Affiliated Coupon. Any business owners can create a coupon if you are registered with GPoint Wallet Business account!"
      >
         Create Coupon Request
      </Modal.Header>
      <Modal.Content>
          <Input 
            fluid 
            label="Business Name" 
            onChange={(e, _) => setBusinessName(e.target.value)}
            value={businessName}
          />
          <Spacer size={30}/>
          <Input 
            fluid 
            label="Business Phone Number" 
            onChange={(e, _) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
          <Spacer size={30} />
          <Input 
            fluid 
            label="Gpoint Wallet Business Username" 
            onChange={(e, _) => setGwalletBusinessUsername(e.target.value)}
            value={gwalletBusinessUsername}
          />
          <Spacer size={30} />
          <Input 
            fluid 
            label="Brand Name" 
            onChange={(e, _) => setBrandName(e.target.value)}
            value={brandName}
          />
          <Spacer size={30} />
          <Input 
            fluid 
            label="Email" 
            onChange={(e, _) => setEmail(e.target.value)}
            value={email}
          />
          <Spacer size={30} />
          <div
            style={{
              fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif", 
              fontSize: "80%",
              color: "#6b7280",
            }}>
              * Coupon Information (Please include: coupon name, target country, category, original price, retail price, Expiry)
          </div>
          <textarea 
            id="description" 
            cols={30} 
            rows={10} 
            placeholder="coupon name, target country, category, original price, retail price, Expiry"
            name="userDescription"
            style={{
              display: "flex", 
              alignItems: "center", 
              width: "100%", 
              padding: "0.67857143em 1em", 
              border: "1px solid", 
              color: "rgba(0,0,0,0.87)", 
              fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif", 
              fontSize: "80%", 
              borderColor: "rgba(34,36,38,0.15)", 
              borderRadius: "0.28571429rem",
            }}
            value={couponInfo}
            onChange={(e) => setCouponInfo(e.target.value)}
          />
      </Modal.Content>
      <Modal.Actions>
        <Button
          primary
          rounded
          onClick={() =>handleSubmit('submit')}
        >
          Submit Request
        </Button>
        <Button
          secondary
          rounded
          onClick={() => handleSubmit('cancel')}
        >
          Cancel
        </Button>
      </Modal.Actions>
    </ModalContainer>
  );
}