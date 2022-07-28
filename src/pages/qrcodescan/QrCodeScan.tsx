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
  const mounted = REA.useSharedValue(true);
  const regionEnabledShared = REA.useSharedValue(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [barcodeResults, setBarcodeResults] = useState([] as TextResult[]);
  const [isActive, setIsActive] = useState(true);
  const useFrontShared = REA.useSharedValue(false);
  const devices = useCameraDevices();
  const backCam = devices.back;
  const netInfo = useNetInfo();
  const { batchCompleted, setBatchCompleted } = useQrCodeBatch();

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

  useEffect(() => {
    mounted.value = true;
    return () => {
      mounted.value = false;
    };
  });

  const hasInternet = useMemo(() => netInfo.isConnected, [netInfo]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleCameraStatus = () => {
    setIsActive(!isActive);
  };

  const onBarcodeScanned = (results: TextResult[]) => {
    if (mounted.value) {
      setBarcodeResults(results);
      if (results.length > 0) {
        setIsActive(false);
      }
    }
  };

  const format = useMemo(() => {
    const desiredWidth = 1280;
    const desiredHeight = 720;
    let selectedCam = backCam;
    if (selectedCam) {
      for (let index = 0; index < selectedCam.formats.length; index++) {
        const camFormat = selectedCam.formats[index];
        if (
          camFormat.videoWidth === desiredWidth &&
          camFormat.videoHeight === desiredHeight
        ) {
          return camFormat;
        }
      }
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const config: DBRConfig = {};
    config.template =
      '{"ImageParameter":{"BarcodeFormatIds":["BF_QR_CODE"],"Description":"","Name":"Settings"},"Version":"3.0"}';
    config.isFront = useFrontShared.value;
    if (regionEnabledShared.value) {
      let settings;
      if (config.template) {
        settings = JSON.parse(config.template);
      } else {
        const template = `{
          "ImageParameter": {
            "Name": "Settings"
          },
          "Version": "3.0"
        }`;
        settings = JSON.parse(template);
      }
      settings.ImageParameter.RegionDefinitionNameArray = ['Settings'];
      settings.RegionDefinition = {
        Left: 10,
        Right: 90,
        Top: 20,
        Bottom: 65,
        MeasuredByPercentage: 1,
        Name: 'Settings',
      };
      config.template = JSON.stringify(settings);
    }

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
    if (hasInternet && username) {
      setIsProcessing(true);
      await sendRecord({
        qrcode: barcodeResults[0]?.barcodeText,
        timestamp: new Date().getTime(),
        username: username,
      })
        .then(() => console.log('Success api request'))
        .catch(() => console.log('Error!'));
      toggleCameraStatus();
      setIsProcessing(false);
    }
    if (!hasInternet && username) {
      setIsProcessing(true);
      await saveRecord({
        qrcode: barcodeResults[0]?.barcodeText,
        timestamp: new Date().getTime(),
        username: username,
      });
      toggleCameraStatus();
      setIsProcessing(false);
    }
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
          format={format}
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

      <Snackbar
        visible={batchCompleted}
        duration={5000}
        onDismiss={() => setBatchCompleted(false)}>
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
          onPress: () => toggleCameraStatus(),
        }}>
        <Text style={styles.snackbarText}>
          {barcodeResults[0]?.barcodeText}
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default QrCodeScan;
