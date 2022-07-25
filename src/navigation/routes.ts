import { Pages } from '../enum/Pages';
import Home from '../pages/home';
import QRCodeScan from '../pages/qrcodescan';

export default {
  [Pages.HOME]: Home,
  [Pages.QRCODE_SCAN]: QRCodeScan,
};
