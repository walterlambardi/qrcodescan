import { Pages } from '../enum/Pages';
import Home from '../pages/home';
import QRCodeScan from '../pages/qrcodescan';
import SignIn from '../pages/signin/SignIn';

export default {
  [Pages.HOME]: Home,
  [Pages.QRCODE_SCAN]: QRCodeScan,
  [Pages.SIGNIN]: SignIn,
};
