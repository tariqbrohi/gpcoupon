import React, { FC } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import ArrowUp from '../arrowUp';
import GridRow from '@growth-ui/react/collections/Grid/GridRow';
import styled from 'styled-components';
import { Image, Spacer } from '@growth-ui/react';
import { useRouter } from 'next/router';

const FooterUrl = styled.footer`
    padding: 30px 0 40px 0;
    background: #f6f6f6;
    border-bottom: 0.2rem solid #f1f2f4;

    ${({ theme }) => theme.gui.media.mobile} {
        padding-bottom: 0;
    }
`;

const UrlContainer = styled.div`
    width: 80%;
    margin: 0 auto;

    ${({ theme }) => theme.gui.media.mobile} {
        width: 95%;
    }
`;

const ListAndIconContainer = styled.div`
    display: flex;

    ${({ theme }) => theme.gui.media.mobile} {
        flex-direction: column;
    }
`;

const UrlDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 0 0 100%;
    flex-basis: 80%;
`;

const EachUrlContainerLogo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 100%;
    align-items: center;
    margin-top: 0;
    // margin-right: 50px;
    flex-basis: 250px;
    position: relative;
    bottom: 10px;
`;

const ImageLogo = styled(Image)`
    max-width: 80%;
    // cursor: pointer;
`;

const LogoPara = styled.p`
    width: 80%;
    font-weight: bold;
`;

const EachUrlContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 100%;
    align-items: center;
    margin-top: 20px;
    flex-basis: 230px;
`;

const UrlListH2 = styled.h2`
    width: 80%;
    margin-bottom: 0.8rem;
    font-size: 24px;
`;

const UrlListUl = styled.ul`
    liststyle: none;
    margin: 0;
    padding: 0;
    width: 80%;
`;

const UrlListLi = styled.li`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    list-style: none;
`;

const LiAnchor = styled.a`
    color: #2f3033;
    line-height: 1.6rem;
    font-size: 15px;
    text-decoration: none;
    margin: 0 auto;
    margin-left: 0;
    
    &:hover {
        text-decoration: underline;
    }
`;

const BadgeContainer = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    flex-basis: 230px;
    margin-top: 20px;
    margin-left: 1rem;
`;

const BadgeIconDiv = styled.div`
    margin-bottom: 2rem;
    cursor: pointer;
`;

const BadgeIcon = styled.img`
    width: 140px !important;
    height: 50px !important;
`;

const FooterText = styled.footer`
    text-align: center;
    font-size: 16px;

    ${({ theme }) => theme.gui.media.mobile} {
        padding-bottom: 90px;
    }
`;

const FooterTextAnchor = styled.a`
    color: #4183c4;
    transition: all 0.4s ease-in-out;

    &: hover {
        color: #8a3594;
        text-decoration: underline;
    }
`;

const CrPara = styled.p`
    color: #717171;
`;

const Footer: FC = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const FooterLinkList = [
        {
            id: 1,
            title: 'Help',
            pageName: {
                a: 'How to Use',
                // b: 'Support',
            },
            pageLink: {
                a: '/how-to-use',
                // b: '/support',
            },
        },
        {
            id: 2,
            title: 'Legal',
            pageName: {
                a: 'Privacy Policy',
                b: 'Terms of Use',
            },
            pageLink: {
                a: '/privacy',
                b: '/legal',
            },
        },
        {
            id: 3,
            title: 'Follow Us',
            pageName: {
                a: 'Facebook',
                b: 'Instagram',
                c: 'YouTube',
            },
            pageLink: {
                a: 'https://www.facebook.com/gpointwallet/',
                b: 'https://www.instagram.com/gpointwallet_official/',
                c: 'https://www.youtube.com/c/Gpointbetterthancash/',
            },
        },
    ];

    return (
        <>
            <ArrowUp />
        
            <FooterUrl>
                <UrlContainer>
                    <ListAndIconContainer>
                        <UrlDiv>
                            <EachUrlContainerLogo>
                                {/* <Link href='/'> */}
                                <ImageLogo src='/images/logo_with_rich.png' alt='GPcoupon Logo' />
                                {/* </Link> */}
                                <LogoPara>Give the gift of earning and save on all your purchases worldwide.</LogoPara>
                            </EachUrlContainerLogo>

                            {FooterLinkList.map((li) => (
                                <EachUrlContainer key={li.id}>
                                    <UrlListH2>{li.title}</UrlListH2>
                                    <UrlListUl>
                                        <UrlListLi>
                                            {li.pageName.a ? (
                                                <LiAnchor href={li.pageLink.a!}>
                                                    {li.pageName.a}
                                                </LiAnchor>
                                            ) : (
                                                ''
                                            )}
                                            {li.pageName.b ? (
                                                <LiAnchor href={li.pageLink.b!}>
                                                    {li.pageName.b}
                                                </LiAnchor>
                                            ) : (
                                                ''
                                            )}
                                            {li.pageName.c ? (
                                                <LiAnchor href={li.pageLink.c!}>
                                                    {li.pageName.c}
                                                </LiAnchor>
                                            ) : (
                                                ''
                                            )}
                                        </UrlListLi>
                                    </UrlListUl>
                                </EachUrlContainer>
                            ))}
                        </UrlDiv>

                        <BadgeContainer>
                            <BadgeIconDiv
                                onClick={() =>
                                    window.open(
                                        'https://apps.apple.com/app/gpoint-wallet/id1587473700?l=en'
                                    )
                                }
                            >
                                <BadgeIcon
                                    src="/images/Apple.png"
                                    alt="App Store"
                                />
                            </BadgeIconDiv>
                            <BadgeIconDiv
                                onClick={() =>
                                    window.open(
                                        'https://play.google.com/store/apps/details?id=com.gpointwallet.app'
                                    )
                                }
                            >
                                <BadgeIcon
                                    src="/images/Google.png"
                                    alt="Google Play"
                                />
                            </BadgeIconDiv>
                        </BadgeContainer>
                    </ListAndIconContainer>
                </UrlContainer>
            </FooterUrl>
            <Spacer size={50} />
                  
            <FooterText>
                <p>
                    If you need any support, please contact support@gpointwallet.com
                </p>
                <Spacer size={10} />
                  
                <GridRow textAlign="center" horizontalAlign="center">
                    <Link href="/legal">
                        <FooterTextAnchor>Terms & Conditions</FooterTextAnchor>
                    </Link>
                    &nbsp;|&nbsp;
                    <Link href="/legal/privacy">
                        <FooterTextAnchor>Privacy Policy</FooterTextAnchor>
                    </Link>
                </GridRow>
                <Spacer size={10} />
                  
                <CrPara>&copy; 2022 GPoint. All Rights Reserved.</CrPara>
            </FooterText>
            <Spacer size={50} />
        </>
    );
};

export default Footer;
