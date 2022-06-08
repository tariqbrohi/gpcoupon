import Footer from '../Footer/index';
import Navbar from '../Navbar/index';

const DesktopLayout = ({ child }: any) => {
  return (
    <div>
      <Navbar />
      {child}
      <Footer />
    </div>
  );
};

export default DesktopLayout;
