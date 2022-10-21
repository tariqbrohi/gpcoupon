/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Head from '@/modules/components/Head';
import AppHeader from '@/layouts/AppHeader';
import { Box, Divider, Typography } from '@mui/material';
import { Paragraph, Spacer } from '@growth-ui/react';
import styled from 'styled-components';

const SectionContainer = styled.div`
    margin: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    margin-bottom: 0.35em;
`;

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

const SpanBold = styled.span`
    font-weight: bold;
`;

const SpanBoldItalic = styled.span`
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
`;

export default function Privacy () {
    return (
        <>
            <Head title="Privacy Policy | GPcoupon" />
            <AppHeader />
            <Box
                sx={{
                    padding: `2rem 0`,
                    paddingBottom: `2rem`,
                    margin: `10%`,
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="green" gutterBottom>
                    Privacy Policy
                </Typography>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Effective on: May 27, 2022
                </Typography>
                <Spacer size={30} />

                <Typography gutterBottom>
                    Master S INC / GPoint  (us, we) respects the privacy rights of its users and protects the personal information collected, stored, and 
                    used in connection with our services (our Services). To further this commitment, we have adopted this Privacy Policy (Privacy Policy) 
                    to guide how we collect, store, and use the information you provide us.
                </Typography>
                <Spacer size={10} />

                <Typography gutterBottom>
                    By clicking using our websites and services, you are accepting the practices described in this Privacy Policy. <br />
                    <SpanBold>
                        If you do not agree with our Terms of Use or this Privacy Statement, please discontinue the use of our websites and mobile applications immediately.
                    </SpanBold>
                    {/* <Typography gutterBottom fontWeight="bold">
                        If you do not agree with our Terms of Use or this Privacy Statement, please discontinue the use of our websites and mobile applications immediately.
                    </Typography> */}
                </Typography>
                <Spacer size={10} />

                <Typography gutterBottom>
                    We will notify you of any substantive revisions to this Privacy Policy in accordance with our Terms of Use. 
                    You will be deemed to have agreed to any such modifications by your continued use of our Services after any such modification is posted. 
                    It is important that you review this Privacy Policy regularly to ensure you are updated as to any changes. 
                    If you do not agree with the modifications, please discontinue the use of our Services immediately.
                </Typography>
                <Spacer size={10} />

                <Typography gutterBottom>
                    We do not knowingly collect personal information from children under the
                    age of 13. If you are a parent or guardian and believe your minor child
                    has provided us with personal information without your consent, please
                    contact us as described in the “Inquiries” section below and we will
                    take steps to delete such personal information from our systems.
                </Typography>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        1. SCOPE OF PRIVACY POLICY
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        This Privacy Policy describes Master & S INC GPoint’s collection and use
                        of personal information submitted and collected through our Services.
                        Personal information includes any individually identifiable information
                        about you, such as your name, address, telephone number, or e-mail
                        address, and information concerning you collected and/or maintained in a
                        personally identifiable form.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        2. INFORMATION WE COLLECT
                    </Typography>
                    <Spacer size={5} />
                    <SectionContainer>
                        <SpanBoldItalic>
                            Information you provide us.
                        </SpanBoldItalic>
                        <Spacer size={5} />
                        <Texts>
                            <Paragraph>
                                • Contact information (such as name, address, and email address)
                            </Paragraph>
                            <Paragraph>
                                • Information you provide us to complete a purchase.
                            </Paragraph>
                            <Paragraph>
                                • Your inquiries and interactions with us in respect of support requests and customer service (such as emails, chats, and support tickets)
                            </Paragraph>
                            <Paragraph>
                                • Your messages within our Services (such as user feedback, chat, and email logs)
                                </Paragraph>
                            <Paragraph>
                                • Other data you choose to give us (such as information from your social network or data to identify a lost account)
                            </Paragraph>
                            <Spacer size={5} />
                        </Texts>
                        <SpanBoldItalic>
                            Information we collect automatically.
                        </SpanBoldItalic>
                        <Spacer size={5} />
                        <Texts>
                            <Paragraph>
                                • Information about your use of our Services and your interactions with other users of our Services
                            </Paragraph>
                            <Paragraph>
                                • Information we collect with cookies and similar technologies (see more below)
                            </Paragraph>
                            <Paragraph>
                                • Your IP address and mobile device identifiers (such as your MAC address, device ID, advertising ID, IMEI)
                            </Paragraph>
                            <Paragraph>
                                • General location data and geo-location data
                                </Paragraph>
                            <Paragraph>
                                • Information about your device, such as device name and operating system, browser type, and language
                            </Paragraph>
                            <Spacer size={5} />
                        </Texts>
                        <SpanBoldItalic>
                            Data we collect from our partners.
                        </SpanBoldItalic>
                        <Spacer size={5} />
                        <Texts>
                            <Paragraph>
                                • Data we receive if you link a third-party tool with our Services
                            </Paragraph>
                            <Paragraph>
                                • Demographic data (such as to determine the coarse location of your IP address)
                            </Paragraph>
                            <Paragraph>
                                • Data to fight fraud
                            </Paragraph>
                            <Paragraph>
                                • Data for analytics purposes, so we can improve our Services
                            </Paragraph>
                            <Spacer size={5} />
                        </Texts>
                        <Typography gutterBottom>
                            Please keep in mind that when you voluntarily disclose personal information which is publicly viewable, 
                            that information will be publicly available and can be collected and used by others. 
                            For example, if you post your email address, you may receive unsolicited messages. 
                            We cannot control who views information (and what they do with information) you voluntarily post publicly.
                        </Typography>
                    </SectionContainer>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        3. USE AND SHARING OF INFORMATION WE COLLECTED
                    </Typography>
                    <Spacer size={5} />

                    <SectionContainer>
                        We use the data we collect from you:
                        <Spacer size={5} />
                        <SpanBoldItalic>
                            To operate our Services.
                        </SpanBoldItalic>
                        <Typography>
                            To perform our agreement with you and provide our Services, we process data necessary to:
                        </Typography>
                        <Spacer size={5} />
                        <Texts>
                            <Paragraph>
                                • Create accounts and use our Services
                            </Paragraph>
                            <Paragraph>
                                • To complete purchases or requests you make
                            </Paragraph>
                            <Paragraph>
                                • To help us manage, operate and deliver our Services to you
                            </Paragraph>
                            <Paragraph>
                                • To provide you with customer support
                            </Paragraph>
                            <Paragraph>
                                • To communicate with you about our Services (unless you have not consented to allow us to use your data for these purposes)
                            </Paragraph>
                            <Paragraph>
                                • To develop new products or services, or make informed business decisions
                            </Paragraph>
                            <Spacer size={5} />
                        </Texts>

                        <SpanBoldItalic>
                            To provide a great experience to our users.
                        </SpanBoldItalic>
                        <Typography>
                            To provide our Services to our users, we have a legitimate interest to collect and process necessary data to:
                        </Typography>
                        <Spacer size={5} />
                        <Texts>
                            <Paragraph>
                                • Update and develop user profiles
                            </Paragraph>
                            <Paragraph>
                                • To complete purchases or requests you make
                            </Paragraph>
                            <Paragraph>
                                • Provide you with GPoint offers within our Services as well as on other websites and services, and by email
                            </Paragraph>
                            <Paragraph>
                                • Customize your experience
                            </Paragraph>
                            <Paragraph>
                                • Develop and improve our Services and user experience
                            </Paragraph>
                            <Paragraph>
                                • Manage our relationship with you
                            </Paragraph>
                            <Paragraph>
                                • Enable you to communicate with other users
                            </Paragraph>
                            <Paragraph>
                                • Provide social features as part of the Services
                            </Paragraph>
                            <Paragraph>
                                • Send you related information, such as updates, security alerts, and support messages
                            </Paragraph>
                            <Spacer size={5} />
                        </Texts>

                        <SpanBoldItalic>
                            To keep our Services safe.
                        </SpanBoldItalic>
                        <Typography>
                            In order to keep our Service and its interactive features safe, we have a legitimate interest to process necessary data to:
                        </Typography>
                        <Spacer size={5} />
                        <Texts>
                            <Paragraph>
                                • Verify accounts and activity, combat harmful conduct, detect and prevent spam, and maintain the integrity of our Services
                            </Paragraph>
                            <Paragraph>
                                • Analyze and monitor the use of our Services and its features
                            </Paragraph>
                            <Paragraph>
                                • Take action against fraudulent or abusive users
                            </Paragraph>
                            <Spacer size={5} />
                        </Texts>
                        <Typography gutterBottom>
                            For all the foregoing purposes, we may use individual data or aggregate your individual data with 
                            other data to analyze, profile and segment all collected data.
                        </Typography>
                        <Typography gutterBottom>
                            With your consent, we may process your data for additional purposes.
                        </Typography>
                        <Spacer size={5} />

                        <SpanBoldItalic>
                            Sharing.
                        </SpanBoldItalic>
                        <Typography>
                            Other than Master & S INC / GPoint, your personal information may be seen by third parties in the following situations:
                        </Typography>
                        <Spacer size={5} />
                        <Texts>
                            <Paragraph>
                            • Other users of our Services that are consistent with the functionality of our Services.
                            </Paragraph>
                            <Paragraph>
                            • Partners, vendors, and service providers who support our business, such as by providing technical infrastructure services, 
                            analyzing how our Services are used, providing customer service, facilitating payments, or conducting surveys.
                            </Paragraph>
                            <Paragraph>
                            • If the ownership or control of all or part of our Services or their assets changes, we may transfer your data to the new owner.
                            </Paragraph>
                            <Paragraph>
                            • To comply with applicable law or respond to valid legal processes, or help our affiliates, partners or vendors comply, 
                            we may access, transfer, disclose, and preserve your personal information. That includes, for example, your private content.
                            </Paragraph>
                            <Paragraph>
                            • Our Services may include features from our partners, such as social media interaction tools. 
                            These partners may access your data and operate under their own privacy policies. 
                            We encourage you to check their privacy policies to learn more about their data processing practices.
                            </Paragraph>
                            <Paragraph>
                            • For other legitimate purposes.
                            </Paragraph>
                            <Spacer size={5} />
                        </Texts>
                        <Typography gutterBottom>
                            Master & S INC. /GPoint  will not sell personal information to advertisers or other third parties without your consent.
                        </Typography>
                    </SectionContainer>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        4. HOW WE COLLECT
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        Master & S INC / GPoint collects data from you when you provide it to us directly, such as via an online form or 
                        when you communicate with our customer support team. Master & S INC / GPoint and third parties also
                        use certain technologies described below to collect data to deliver excellent experiences.
                    </Typography>
                    <Spacer size={5} />
                    <SpanBoldItalic>
                        Cookies.
                    </SpanBoldItalic>
                    <Typography>
                        Cookies are small text files placed on your device that can be recalled by a web server in the domain that placed the cookies. 
                        We use cookies for various purposes including to help recognize and remember you when you are logged into our Services 
                        so we can maintain your settings and preferences, analyze the performance of our Services, 
                        maintain the integrity of our Services, and for other legitimate purposes.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        These cookies do not track your browsing activity on non-GPoint websites.
                    </Typography>
                    <Spacer size={5} />
                    <SpanBoldItalic>
                        Web Beacons.
                    </SpanBoldItalic>
                    <Typography>
                        We also use “web beacons” to help deliver cookies and gather usage and performance data. 
                        Our website may include web beacons, cookies, or similar technologies from third-party service providers. 
                        By providing us with information about how you interact with our Services, these tools help us analyze and 
                        learn how to make our Services better and customize our communications with you.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        The following analytics technologies are in use: Google Analytics, Facebook Analytics.
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        You have access to tools to control the data collected by cookies, web beacons, and similar technologies. 
                        For example, you can use controls in your Internet browser to limit how the websites you visit are able to use cookies and 
                        to withdraw your consent by clearing or blocking cookies. 
                        However, if you disable cookies, your ability to use some features or areas of our Services may be affected.
                    </Typography>    
                </section>
                <Spacer size={30} />


                <section>
                    <Typography variant="h6" fontWeight="bold">
                        5. SAFEGUARD
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        Master & S INC. / GPoint maintains appropriate safeguards that ensure the security, integrity, and 
                        privacy of the personal information we collect and store about our account holders. Personal information collected by 
                        Master & S INC / GPoint is stored in secure operating environments that are not available to the public and 
                        that are only accessible by authorized employees. We also have security measures in place to protect the loss, misuse, 
                        and alteration of the information under our control (i.e., maintain data quality). Before we allow web users to access 
                        their personal information, for example, we verify their identity by requesting that they submit information such as their username and password.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        However, unfortunately, no data transmission over the internet or any wireless network can be guaranteed to be secure. 
                        As a result, while we strive to protect your personal information, you acknowledge that: (a) the security, integrity, 
                        and privacy of any and all information and data exchanged between you and us through our Services cannot be guaranteed, 
                        and (b) any such information and data may be viewed or tampered with in transit by a third party.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        6. LINKS TO THIRD PARTY SITES OR SERVICES
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        You should be aware that our Services may from time to time contain links to third-party sites, products, or services. 
                        Master & S INC / GPoint is not responsible for the privacy practices or the content of such sites or services. 
                        If you are concerned about the privacy policy of a certain third party, we recommend that 
                        you read the privacy policy of the site or service to which you link before you submit any personal information.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        7. YOUR RIGHTS RELATED TO PERSONAL INFORMATION
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        You have certain rights regarding your personal information, subject to local data protection laws. These may include the following rights:
                    </Typography>
                    <Spacer size={5} />
                    <Texts>
                        <Paragraph>
                            • to access your personal information held by us (right to access);
                        </Paragraph>
                        <Paragraph>
                            • to rectify inaccurate personal information and ensure it is complete (right to rectification);
                        </Paragraph>
                        <Paragraph>
                            • to erase/delete your personal information to the extent permitted by other legal obligations (right to erasure; right to be forgotten);
                        </Paragraph>
                        <Paragraph>
                            • to restrict our processing of your personal information (right to restriction of processing);
                        </Paragraph>
                        <Paragraph>
                            • to transfer your personal information to another controller to the extent possible (right to data portability);
                        </Paragraph>
                        <Paragraph>
                            • to object to any processing of your personal information carried out on the basis of our legitimate interests (right to object). 
                            Where we process your personal information for direct marketing purposes or share it with third parties 
                            for their own direct marketing purposes, you can exercise your right to object at any time to such processing 
                            without having to provide any specific reason for such objection;
                        </Paragraph>
                        <Paragraph>
                            • not to be subject to a decision based solely on automated processing, including profiling, 
                            which produces legal effects ("Automated Decision-Making"). Automated Decision-Making currently does not take place on our websites; and
                        </Paragraph>
                        <Paragraph>
                            • to the extent we base the collection, processing, and sharing of your personal information on your consent, 
                            to withdraw your consent at any time, without affecting the lawfulness of the processing based on such consent before its withdrawal.
                        </Paragraph>
                        <Spacer size={5} />
                    </Texts>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        To exercise your rights, please contact us in accordance with the “Inquiries” section below. We try to respond to 
                        all legitimate requests within 30 days and will contact you if we need additional information from you in order to honor your request. 
                        Occasionally it may take us longer than a month, taking into account the complexity and number of requests we receive.
                    </Typography>
                    <Spacer size={10} />
                    <Typography gutterBottom>
                        Master & S INC / GPoint enables you to review, update or correct your personal information in our possession. 
                        In order to do so, please log into your account or contact our Privacy Policy Administrator at support@gpointwallet.com. 
                        If you contact us, we will need sufficient information from you to establish your identity and verify your access request, 
                        and also to assist us in handling your request.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        8. RETENTION; Deactivated or Terminated Accounts
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        When you sign up for an account with GPoint, Master & S INC / GPoint retains personal information you store on our Services for 
                        as long as your account is in existence or as long as we need it to provide you, our Services. If you delete your account, 
                        we will initiate deletion of this information after 30 days, but please note: 
                        (1) there might be some latency in deleting this information from our servers and backup storage, 
                        (2) a request to delete and/or terminate your account will not result in the removal of information collected and already put in aggregate form, 
                        (3) we are not able nor are we obligated to remove any of your information from a third-party provider or platform, and 
                        (4) we may retain your information if necessary to comply with our legal obligations, resolve disputes, or enforce our agreements.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        9. OPTING OUT - DIRECT MARKETING COMMUNICATIONS PREFERENCES
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        If we process your personal information for the purpose of sending you marketing communications, you can manage your receipt of marketing 
                        and non-transactional communications from us by clicking on the “unsubscribe” link located at the bottom of our marketing emails, 
                        by replying or texting ‘STOP’ if you receive SMS communications, or by turning off push notifications on our apps on your device. 
                        Additionally, you may contact us at support@GPointWallet.com or contact us using the information in the “Inquiries" or “help” section. 
                        Note that opting out of marketing communications does not opt you out of receiving important business communication related 
                        to your current relationship with us, such as information about your subscriptions, service announcements, or security information.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        10. INTERNATIONAL
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        Personal information we collect may be stored and processed for the purposes set out in this Privacy Policy in the United States or 
                        any other country in which Master & S INC / GPoint, its parents, subsidiaries, or third-party agents operate. 
                        By using or accessing our Services, residents and citizens of countries and jurisdictions outside of the United States agree and 
                        consent to the transfer, storage, and processing of your information on servers located in the United States and other countries that 
                        may not offer the same level of privacy protection as the laws in your country of residence or citizenship. 
                        In this event, we will ensure that such recipient offers an adequate level of protection, for instance 
                        by entering into standard contractual clauses for the transfer of data as approved by the European Commission (Art. 46 GDPR), 
                        or we will ask you for your prior consent to such international data transfers.
                    </Typography>
                </section>
                <Spacer size={30} />

                <section>
                    <Typography variant="h6" fontWeight="bold">
                        11. INQUIRIES
                    </Typography>
                    <Spacer size={5} />
                    <Typography gutterBottom>
                        If you have any questions regarding the data GPoint collects or how we use it, please feel free to e-mail us at support@PointWallet.com, 
                        or in writing to 1555 Venice Blvd Los Angeles, California, 90006 USA
                    </Typography>
                </section>
                <Spacer size={50} />

                <Divider />
            </Box>
        </>
    );
};