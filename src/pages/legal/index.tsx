import React from 'react';
import Head from '@/modules/components/Head';
import AppHeader from '@/layouts/AppHeader';
import { Paragraph, Spacer } from '@growth-ui/react';
import { Box, Divider, Typography } from '@mui/material';
import styled from 'styled-components';

const Texts = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-inline: 50px;
    font-size: 14px;

    ${({ theme }) => theme.gui.media.mobile} {
        flex-direction: column;
        padding-inline: 0;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.87);
        text-align: center;
        line-height: 1.5;
    }
`;

export default function Legal() {
    return (
        <>
            <Head title="Terms of Use | GPcoupon" />
            <AppHeader />
            <Box
                sx={{
                    padding: `2rem 0`,
                    paddingBottom: `2rem`,
                    margin: `10%`,
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="green" gutterBottom>
                    Terms of Use
                </Typography>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Effective on: May 27, 2022
                </Typography>
                <Spacer size={30} />

                <Typography gutterBottom>
                    This GPoint GPcoupon Agreement ("Agreement") is between you, the user, and Master & S. Inc / GPoint ("we" or "us") 
                    and describes the terms and conditions that apply to your GPoint Gpcoupon. 
                    By buying, loading, or using your GPoint GPcoupon, you agree to these terms.
                </Typography>
                <Spacer size={10} />

                <Typography gutterBottom>
                    This Agreement includes an arbitration provision that governs any disputes between you and us. This provision will:
                </Typography>
                <Spacer size={5} />
                <Texts>
                    <Paragraph>
                        • Eliminate your right to a trial by jury: and
                    </Paragraph>
                    <Paragraph>
                        • Substantially affect your rights, including preventing you from bringing, joining or participating in class or consolidated proceedings
                    </Paragraph>
                </Texts>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Eligibility
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        This Site is not targeted towards, nor intended for use by, anyone under the age of 13. A USER MUST BE AT LEAST AGE 13 TO ACCESS AND USE THE SITE. 
                        If the User is between the ages of 13 and 18, he or she may only use the Sites under the supervision of a parent or legal guardian 
                        who agrees to be bound by these Terms. You must register for a GPoint Wallet account (Account) to use the Service.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Changes to Terms
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        Master & S INC / GPoint reserver the right, at our discretion, to change or modify these Terms at any time. 
                        Although it is your responsibility to review these Terms from time to time for any changes, 
                        we will notify you of any revisions to these Terms by posting them at this location. 
                        If you do not agree to the revised Terms, you must stop using our Service. 
                        Your continued use of our Service following any revision to these Terms signifies your assent to and acceptance of the revised Terms.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        These Terms may not otherwise be amended except in a writing hand signed by you and Master & S INC / GPoint For purposes of this provision, 
                        "writing" does not include an e-mail message and a signature does not include an electronic signature.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        You agree that Master & S INC / GPoint retain the unfettered right to modify any aspect of the Service. 
                        You acknowledge that Master & S INC / GPoint have been, are, and will be constantly making changes to the Service. 
                        These changes include modifications to features, functions, or abilities of any element of the Service.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        All descriptions, images, references, features, content, specifications, services, and prices of services described or depicted in the Service, 
                        are subject to change (including availability) at any time without notice.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Proprietary Rights
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        The Service and its content, features, and functionality are owned by Master & S INC / GPoint, its licensors, 
                        or other providers of such material and is protected by copyright and other laws and international treaty provisions. 
                        Except for the rights explicitly granted in these Terms, these Terms do not grant you any rights to patents, copyrights, trade secrets, 
                        trademarks, source code, or any other right, title, or interest in the Service, ownership of which is retained by 
                        Master & S INC / GPoint and its suppliers, as applicable.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        GPoint Wallet Account
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        You will need to provide information such as your name and email address to register for an Account and/or use the Service. 
                        You represent and warrant that the information you register with and all information entered or collected in the course of creating your Account 
                        and any information you add or update from your settings (Account Information) is true and accurate.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        If you access the Service through a social networking service (SNS) as part of the functionality of the Service, you represent that 
                        you are entitled to disclose your SNS Account login information to Master & S INC / GPoint and/or grant Master & S INC / 
                        GPoint access to your SNS account (including, but not limited to, for use for the purposes described herein). 
                        PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE SNS SERVICE PROVIDERS ASSOCIATED WITH YOUR SNS ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) 
                        WITH SUCH SNS SERVICE PROVIDERS, AND GPOINT DISCLAIMS ANY LIABILITY FOR PERSONALLY IDENTIFIABLE INFORMATION THAT MAY BE PROVIDED TO IT BY 
                        SUCH SNS SERVICE PROVIDERS IN VIOLATION OF THE PRIVACY SETTINGS THAT YOU HAVE SET IN SUCH SNS ACCOUNTS.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        If you provide us with a mobile number, you consent to receive text (SMS) messages from us. 
                        Standard text messaging rates may apply based on your plan with your mobile carrier.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Fees
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        Fees for using the Service are displayed in your order. We reserve the right to adjust fees in our sole discretion, 
                        at any time and without notice to you. Your completion of purchase constitutes your acceptance of all fees. 
                        Product prices and fees are shown in US dollars and/or local currencies. Displayed foreign currency fees and prices are converted 
                        into U.S. dollars for checkout. Prices do not include applicable taxes and other fees or charges, which will be included at checkout.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        From time to time, we may offer incentives for inviting others to use the Service (Referral Program). 
                        Any incentives under such Referral Program will be subject to the then-current Referral Program terms, if applicable, and otherwise at our sole discretion.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Payment
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        You agree to pay for all GPoint GPcoupons you purchase on <span style={{fontWeight: "bold"}}>Coupon. GPointWallet.com</span> 
                        in accordance with the prices and payment terms in effect at the time the purchase is made. You also agree to pay all applicable taxes. 
                        To purchase a GPoint G-Coupon, you must provide required and valid payment information 
                        (e.g. credit card, debit card, and/or bank account information) through the Service. 
                        By placing an order for a GPoint g-coupon, you also agree and authorize (i) the payment method(s) you provide to be immediately charged for 
                        all fees and taxes applicable to your order, (ii) Master & S INC/ GPoint to automatically charge alternative payment methods associated 
                        with your account if a primary payment method is declined or no longer available, (iii) Master & S INC/  GPoint to share payment information 
                        and instructions required to complete the payment transactions between  Master & S INC/ GPoint, our payment processors, 
                        and their third-party payment service providers (e.g., credit card transaction processing, merchant settlement, and related services), 
                        and (iv) no additional notice or consent is required for the foregoing authorizations. 
                        You agree to immediately update your Account in the event of any change in your payment information. 
                        If a payment method cannot be verified, is invalid, or is otherwise not acceptable, your purchase may be suspended or canceled. 
                        We may also cancel a GPoint g-coupon (defined below) if we discover after issuance that the GPoint GPcoupon and/or payment for 
                        it was fraudulent or incomplete.  Master & S INC/ GPoint reserves the right to collect any outstanding payment due 
                        and may transfer the collection of your outstanding balance to a third-party collection agency.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Termination of Account
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        We can terminate or refuse your access to the Service at any time, for any reason. We can also terminate, close, or 
                        suspend your Account at any time for any reason. Termination for any reason does not relieve you of any of your obligations to us 
                        under these Terms and any amounts owed to us as provided in these Terms or any other agreement you have with us. 
                        We will not be responsible for any loss, damage, harm, or consequences, including any delay or inconvenience you may suffer 
                        as a result of the exercise of our rights under this section.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom fontWeight="bold">
                        Any pending transactions at the time of termination, closure, or suspension of your Account will be settled. 
                        If an investigation is pending at the time of closure, we may hold your funds until the resolution of the investigation.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Electronic Communications
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        When you use the Service or send emails to us, you are communicating with us electronically. 
                        You consent to receive communications from us electronically. We may communicate with you by email (if provided by you) or 
                        by posting notices through the Service. You agree that all agreements, notices, disclosures, and other communications that 
                        we provide you electronically satisfy any legal requirement that such communications be in writing.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        DISCLAIMERS
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        NEITHER MASTER & S INC, GPOINT, ITS PARTNERS, LICENSORS, AND THIRD-PARTY PROVIDERS, NOR ANY OF THEIR RESPECTIVE DIRECTORS, 
                        OFFICERS, EMPLOYEES OR AGENTS (COLLECTIVELY, THE “MASTER & S” / "GPOINT PARTIES"), MAKE ANY WARRANTY WHATSOEVER, 
                        INCLUDING, WITHOUT LIMITATION, THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE; NOR DO THEY MAKE ANY WARRANTY 
                        AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE SERVICE,
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        OR AS TO THE ACCURACY, RELIABILITY, QUALITY OR CONTENT OF ANY INFORMATION, SERVICE OR MERCHANDISE PROVIDED ON OR THROUGH THE SERVICE.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        YOU EXPRESSLY AGREE THAT YOUR USE OF, OR INABILITY TO USE, THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE AND ANY CONTENT APPEARING 
                        ON THE SERVICE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WITHOUT LIMITING THE FOREGOING, 
                        TO THE FULLEST EXTENT PERMITTED BY LAW, GPOINT MAKES NO REPRESENTATIONS, WARRANTIES, CONDITIONS OR OTHER TERMS OF ANY KIND, 
                        EITHER EXPRESS OR IMPLIED, ABOUT THE SERVICE. MASTER & S INC/ GPOINT DISCLAIMS ANY WARRANTIES OF TITLE OR IMPLIED WARRANTIES, 
                        CONDITIONS OR OTHER TERMS OF NON-INFRINGEMENT, MERCHANTABILITY, QUIET ENJOYMENT OR FITNESS FOR A PARTICULAR PURPOSE, 
                        OTHER THAN THOSE WARRANTIES WHICH ARE INCAPABLE OF EXCLUSION, RESTRICTION OR MODIFICATION UNDER THE LAWS APPLICABLE TO THESE TERMS.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        LIMITATION OF LIABILITY
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        IN NO EVENT WILL ANY OF THE MASTER & S INC / GPOINT PARTIES BE LIABLE FOR ANY INDIRECT, SPECIAL, PUNITIVE, INCIDENTAL, OR 
                        CONSEQUENTIAL DAMAGES HOWEVER CAUSED, AND UNDER ANY THEORY OF LIABILITY EVEN IF GPOINT WAS PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        IN THE EVENT ANY CLAIM RELATING TO THE PERFORMANCE OR NONPERFORMANCE BY MASTER & S INC / GPOINT PURSUANT TO THESE TERMS, OR 
                        IN ANY OTHER WAY CONCERNING THE SERVICE IS MADE BY YOU, THE ACTUAL DAMAGES TO WHICH YOU MAY BE ENTITLED SHALL BE LIMITED 
                        TO A REFUND OF THE FEES, IF ANY, PAID BY YOU AND RECEIVED BY MASTER & S INC / GPOINT FOR USE OF THE SERVICE 
                        IN THE 3 MONTH PERIOD PRECEDING YOUR CLAIM AND IF YOU HAVE NOT PAID ANY AMOUNTS DURING THAT TIME PERIOD, 
                        YOU ACKNOWLEDGE THAT YOUR SOLE REMEDY SHALL BE TO CEASE USING THE SERVICE.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF STATUTORY OR IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF LIABILITY FOR 
                        CERTAIN TYPES OF DAMAGES. IN SUCH JURISDICTIONS THE LIMITATIONS AND EXCLUSIONS SET FORTH HEREIN MAY NOT APPLY TO YOU. CONSEQUENTLY, 
                        IN SUCH JURISDICTIONS, THE LIABILITY OF THE MASTER & S INC / GPOINT PARTIES IS LIMITED TO THE EXTENT PERMITTED BY LAW, 
                        THEREBY MINIMIZING THE LIABILITY OF SUCH MASTER & S INC / GPOINT PARTIES TO YOU TO THE LOWEST AMOUNT PERMITTED BY APPLICABLE LAW. 
                        THIS LIMITATION IS INDEPENDENT OF ANY OTHER LIMITATION SET FORTH IN THESE TERMS.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        IF YOU ARE A CALIFORNIA RESIDENT, YOU WAIVE CALIFORNIA CIVIL CODE §1542, WHICH SAYS: A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS 
                        WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM 
                        MUST HAVE MATERIALLY AFFECTED HIS SETTLEMENT WITH THE DEBTOR.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        THE MASTER & S INC / GPOINT PARTIES DO NOT ENDORSE AND ARE NOT RESPONSIBLE FOR THE ACCURACY OR RELIABILITY OF ANY OPINION, 
                        ADVICE OR STATEMENT, NOR FOR ANY OFFENSIVE, DEFAMATORY, OBSCENE OR ILLEGAL POSTING OR CONDUCT, ON THE SERVICE, INCLUDING, 
                        WITHOUT LIMITATION, BY ANYONE OTHER THAN AUTHORIZED MASTER & S INC / GPOINT EMPLOYEES WHILE ACTING IN THEIR OFFICIAL CAPACITIES.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Indemnification
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        You agree to indemnify, defend and hold harmless Master & S INC / GPoint, and its subsidiaries and other affiliates, and 
                        its and their directors, officers, owners, agents, co-branders or other partners, employees, information providers, 
                        licensors, licensees, consultants, contractors and other applicable third parties (collectively "Indemnified Parties") from 
                        and against any and all claims, demands, causes of action, debt or liability, including reasonable attorneys’ fees, 
                        including without limitation attorneys’ fees and costs incurred by the Indemnified Parties arising out of, related to, 
                        or which may arise from (a) your use of the Service; (b) any breach or non-compliance by you of any term of these Terms or 
                        our partner’s policies; (c) any dispute or litigation caused by your actions or omissions; or (d) your negligence or violation or 
                        alleged violation of any applicable law or rights of a third party.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Equitable Remedies
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        You acknowledge that the rights granted and obligations made under these Terms to Master & S INC / GPoint are of a unique and 
                        irreplaceable nature, the loss of which shall irreparably harm Master & S INC /  GPoint and which cannot be replaced by monetary damages alone. 
                        Accordingly, Master & S INC / GPoint shall be entitled to injunctive or other equitable relief 
                        (without the obligations of posting any bond or surety or proof of damages) in the event of any breach or anticipatory breach by you.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        You irrevocably waive all rights to seek injunctive or other equitable relief, or to enjoin or restrain the operation of the Service, 
                        exploitation of any advertising or other materials issued in connection therewith, or exploitation of the Service or 
                        any content or other material used or displayed through the Service and agree to limit your claims to monetary damages 
                        (but only to the extent permissible under these Terms).
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Disputes
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        The laws of the State of California, USA govern the interpretation of these Terms and apply to claims for breach of these Terms, 
                        regardless of conflict of laws principles. The parties specifically exclude from application to these Terms 
                        the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transactions Act. 
                        All other claims, including claims regarding consumer protection laws, unfair competition laws, and in tort, will, 
                        only to the extent required by applicable law, be subject to the laws of your state of residence in the United States, or, 
                        if you live outside the United States, the laws of the country in which you reside. 
                        You and we irrevocably consent to the exclusive jurisdiction and venue of the state or federal courts for Los Angeles County, 
                        California, USA, for all disputes arising out of or relating to these Terms.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        Any claim or cause of action arising out of or related to the use of the Service or these Terms must be filed within 1 year after 
                        such claim or cause of action arose regardless of any statutes or law to the contrary. In the event any such claim or 
                        cause of action is not filed within such 1 year period, such claim or cause of action is forever barred.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        For any claim (excluding claims for injunctive or other equitable relief) where the total amount of the award sought is less than $10,000, 
                        the party requesting relief shall resolve the dispute in a cost-effective manner through binding non-appearance-based arbitration. 
                        The party requesting relief shall initiate such arbitration through an established alternative dispute resolution (ADR) provider 
                        mutually agreed upon by the parties. The ADR provider and the parties must comply with the following rules: 
                        (a) the arbitration shall be conducted by telephone, online, and/or be solely based on written submissions, 
                        and the specific manner shall be chosen by the party initiating the arbitration; (b) all aspects of the arbitration shall be conducted 
                        in the English language; (c) the arbitration shall not involve any personal appearance by the parties or 
                        witnesses unless otherwise mutually agreed by the parties; and (d) any judgment on the award rendered by the arbitrator shall be final and 
                        may be entered in any court of competent jurisdiction.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        All claims you bring against Master & S INC / GPoint must be resolved in accordance with this Section. 
                        All claims filed or brought contrary to this Section shall be considered improperly filed. 
                        Should you file a claim contrary to this Section, Master & S INC / GPoint shall be entitled to recover attorneys' fees and 
                        costs up to $2,000, provided that Master & S INC / GPoint has notified you in writing of the improperly filed claim, and 
                        you have failed to promptly withdraw the claim.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Severability
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        The provisions of these Terms are intended to be severable. If for any reason any provision of these Terms shall be held invalid or 
                        unenforceable in whole or in part in any jurisdiction, such provision shall, as to such jurisdiction, 
                        be ineffective to the extent of such invalidity or unenforceability without in any manner affecting the validity or 
                        enforceability thereof in any other jurisdiction or the remaining provisions hereof in any jurisdiction.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Enforceability, Entire Agreement & Non-Waiver
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        These Terms are deemed accepted upon any use of the Service. These Terms and any additional terms referenced herein constitute 
                        the entire agreement between you and Master & S INC / GPoint regarding the use of the Service. Our failure to exercise or 
                        enforce any right or provision of these Terms shall not operate as a waiver of such right or provision. 
                        The section titles in these Terms are for convenience only and have no legal or contractual effect.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Force Majeure
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        We are not liable for any changes or problems out of our control, for example, changes or problems caused by like natural disasters, 
                        war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, network infrastructure failures, 
                        strikes, or shortages of transportation facilities, fuel, energy, labor or materials.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Technical & Customer Support
                    </Typography>
                    <Spacer size={5} />
                    <Typography>
                        Subject to the other provisions of these Terms, we will attempt to help you with any queries or problems that you may have with 
                        the Service and any questions about these Terms generally. To reach our support team, please e-mail us at support@gpointWallet.com.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        Notices
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        We may notify you by posting(s) made in-Service, sending you an e-mail, or using other ways of communicating with you 
                        based on the contact information you provide to us. Any notice to Master S INC / GPoint required according to these 
                        Terms must be in writing and addressed to 1555 Venice Blvd Los Angeles, California, 
                        90006 USA unless we have provided a more specific method of notifying us.
                    </Typography>
                </section>
                <Spacer size={50} />

                <Divider />
            </Box>
        </>
    );
}
