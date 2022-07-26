import React, { useEffect, useMemo, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Linking, View } from 'react-native';
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

const QrCodeScan = () => {
  const mounted = REA.useSharedValue(true);
  const regionEnabledShared = REA.useSharedValue(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [barcodeResults, setBarcodeResults] = useState([] as TextResult[]);
  const [isActive, setIsActive] = useState(true);
  const useFrontShared = REA.useSharedValue(false);
  const devices = useCameraDevices();
  const backCam = devices.back;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    mounted.value = true;
    return () => {
      mounted.value = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.msgTitle}>{'Camera Permission denied'}</Text>
        <Text style={styles.msgSubtitle}>
          {'You must grant camera permissions to use this app'}
        </Text>
        <Button
          icon="cellphone-settings"
          onPress={() => Linking.openSettings()}
          mode="contained">
          {'Open settings'}
        </Button>
        <Button
          icon="refresh"
          onPress={async () => {
            setIsLoading(true);
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
            setIsLoading(false);
          }}
          style={styles.tryAgainBtn}
          mode="text">
          {'Try Again'}
        </Button>
        <Text>{'(I just granted camera permission)'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {backCam && hasPermission && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={backCam}
            isActive={isActive}
            format={format}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
        </>
      )}

      {!isActive && (
        <View style={styles.control}>
          <Button mode="outlined" onPress={toggleCameraStatus}>
            {'Resume'}
          </Button>
          {!!barcodeResults[0]?.barcodeText && (
            <Button
              mode="contained"
              onPress={() => {
                toggleCameraStatus();
                console.log(
                  'SAVE IN ASYNCSTORAGE',
                  JSON.stringify(barcodeResults[0]?.barcodeText, null, 4),
                );
              }}>
              {'Save'}
            </Button>
          )}
        </View>
      )}

      <Snackbar
        visible={!!barcodeResults[0]?.barcodeText && !isActive}
        onDismiss={toggleCameraStatus}
        style={styles.snackbar}
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
