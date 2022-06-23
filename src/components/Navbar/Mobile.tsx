import { useStyles } from '../../styles/components/navbarMobile';
import TopBarDialogMobile from '../../components/Modal/TopBarDialogMobile';
import { Typography, Input, InputAdornment, Button } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineShop, AiFillHome } from 'react-icons/ai';
import { HiOutlineHome } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import LoginIcon from '@mui/icons-material/Login';
import { MdOutlineManageSearch } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Mobile = () => {
  const classes = useStyles();
  const router = useRouter();
  const [isUser, setisUser] = useState(false);

  useEffect(() => {
    if (typeof window === `object`) {
      const userId: any = localStorage.getItem(`userId`);

      if (userId && userId?.length !== 2) {
        setisUser(true);
      }
    }
  }, []);

  return (
    <>
      <div className={classes.topBar}>
        <TopBarDialogMobile />
      </div>
      <div className={classes.navMain}>
        <div className={classes.tags}>
          <Typography
            className={classes.headText}
            variant="subtitle2"
            component="div"
            onClick={() => router.push(`/categories`)}
          >
            <BiCategory /> Categories
          </Typography>
          <Typography
            className={classes.headText}
            variant="subtitle2"
            component="div"
            onClick={() => router.push(`/brands`)}
          >
            <AiOutlineShop /> Brands
          </Typography>
        </div>
        <div className={classes.bottomTab}>
          <HiOutlineHome onClick={() => router.push(`/`)} />
          <MdOutlineManageSearch onClick={() => router.push(`/categories`)} />
          {isUser ? (
            <CgProfile onClick={() => router.push(`/my-gift`)} />
          ) : (
            <LoginIcon onClick={() => router.push(`/login`)} />
          )}
        </div>
      </div>
    </>
  );
};

export default Mobile;
