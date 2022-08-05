import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

import {
  DBRConfig,
  decode,
  TextResult,
} from 'vision-camera-dynamsoft-barcode-reader';

import { Button, Snackbar, ActivityIndicator } from 'react-native-paper';
import * as REA from 'react-native-reanimated';

import styles from './QrCodeScan.style';
import { useNetInfo } from '@react-native-community/netinfo';
import { AuthContext } from '../../context/AuthContext';
import { saveRecord } from '../../utils/asyncStorageUtils';
import CameraPermission from './components/CameraPermission';
import { useQrCodeBatch } from '../../hooks/useQrCodeBatch';

export interface IRecord {
  qrcode: string;
  username: string;
  timestamp: number;
}

const QrCodeScan: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [barcodeResults, setBarcodeResults] = useState([] as TextResult[]);
  const [isActive, setIsActive] = useState(true);
  const useFrontShared = REA.useSharedValue(false);
  const devices = useCameraDevices();
  const backCam = devices.back;
  const netInfo = useNetInfo();
  const { batchCompleted } = useQrCodeBatch();
  const {
    state: { username },
  } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasCameraPermission(status === 'authorized');
      setIsLoading(false);
    })();
  }, []);

  const hasInternet = useMemo(() => netInfo.isConnected, [netInfo]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleCameraStatus = () => {
    setIsActive(!isActive);
  };

  const onBarcodeScanned = (results: TextResult[]) => {
    if (results.length > 0) {
      setBarcodeResults(results);
      setIsActive(false);
    }
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const config: DBRConfig = {};
    config.template =
      '{"ImageParameter":{"BarcodeFormatIds":["BF_QR_CODE"],"Description":"","Name":"Settings"},"Version":"3.0"}';
    config.isFront = useFrontShared.value;
    const results: TextResult[] = decode(frame, config);
    REA.runOnJS(onBarcodeScanned)(results);
  }, []);

  const sendRecord = (data: IRecord) => {
    console.log('Sending qrcode ...', data);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  };

  const handleQrCode = useCallback(async () => {
    if (!username) {
      return null;
    }
    setIsProcessing(true);
    if (hasInternet) {
      await sendRecord({
        qrcode: barcodeResults[0]?.barcodeText,
        timestamp: new Date().getTime(),
        username: username,
      })
        .then(() => console.log('Success api request'))
        .catch(() => console.log('Error!'));
    }
    if (!hasInternet) {
      await saveRecord({
        qrcode: barcodeResults[0]?.barcodeText,
        timestamp: new Date().getTime(),
        username: username,
      });
    }
    toggleCameraStatus();
    return setIsProcessing(false);
  }, [hasInternet, barcodeResults, username, toggleCameraStatus]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!hasCameraPermission) {
    return (
      <CameraPermission
        setHasCameraPermission={setHasCameraPermission}
        setIsLoading={setIsLoading}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {backCam && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={backCam}
          isActive={isActive}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
      )}

      {!isActive && (
        <View style={styles.control}>
          {!isProcessing && (
            <Button mode="outlined" onPress={toggleCameraStatus}>
              {'Resume'}
            </Button>
          )}
          {!!barcodeResults[0]?.barcodeText && !isProcessing && (
            <Button mode="contained" onPress={handleQrCode}>
              {'Save'}
            </Button>
          )}
          {isProcessing && (
            <Text style={styles.processingQrCode}>{'Saving QR Code ...'}</Text>
          )}
        </View>
      )}

      <Snackbar visible={batchCompleted} duration={5000} onDismiss={() => null}>
        <Text>{'QR codes were successfully sent in batch mode'}</Text>
      </Snackbar>

      <Snackbar
        visible={!!barcodeResults[0]?.barcodeText && !isActive && !isProcessing}
        onDismiss={toggleCameraStatus}
        style={styles.snackbar}
        duration={10000}
        wrapperStyle={styles.snackbarWrapper}
        action={{
          label: 'close',
          color: '#000',
          onPress: toggleCameraStatus,
        }}>
        <Text style={styles.snackbarText}>
          {barcodeResults[0]?.barcodeText}
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default QrCodeScan;
