import Footer from '../Footer/index';
import Navbar from '../Navbar/index';
import Download from '../Views/Download';

const DesktopLayout = ({ child }: any) => {
  return (
    <div>
      <Navbar />
      {child}
      {/* <Download /> */}
      <Footer />
    </div>
  );
};

export default DesktopLayout;
