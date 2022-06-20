import { useStyles } from '../../styles/components/navbarMobile';
import TopBarDialogMobile from '../../components/Modal/TopBarDialogMobile';
import { Typography, Input, InputAdornment, Button } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineShop, AiFillHome } from 'react-icons/ai';
import { HiOutlineHome } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineManageSearch } from 'react-icons/md';
import { useRouter } from 'next/router';

const Desktop = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <>
      <div className={classes.topBar}>
        <TopBarDialogMobile />
      </div>
      <div className={classes.navMain}>
        <Input
          className={classes.root}
          disabled
          onClick={() => {
            console.log(`hello`);
          }}
          placeholder="Search gifts or brands"
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
        />
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
          <HiOutlineHome />
          <MdOutlineManageSearch />
          <CgProfile />
        </div>
      </div>
    </>
  );
};

export default Desktop;
