import { Notify, Report, Confirm, Loading, Block } from 'notiflix';
import { NotifyMethodEnum } from '../../annotations/enums/notify-method.enum';

const NotifyComponent = (method: NotifyMethodEnum, message: string) => {
  Notify.init({ width: `280px`, position: `right-top` });
  Notify[method](message);
};

export default NotifyComponent;
