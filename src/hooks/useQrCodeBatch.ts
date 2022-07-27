import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useState, useMemo } from 'react';
import { IRecord } from '../pages/qrcodescan/QrCodeScan';
import { deleteFromStorage, getFromStorage } from '../utils/asyncStorageUtils';

export const useQrCodeBatch = () => {
  const [batchCompleted, setBatchCompleted] = useState(false);
  const netInfo = useNetInfo();

  const isConnected = useMemo(
    () => netInfo?.isConnected,
    [netInfo?.isConnected],
  );

  const handleBatchRecords = async (records: IRecord[]) => {
    const promises = records.map(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      });
    });
    const results = await Promise.all(promises);
    const allOk = results.every(v => v === true);
    if (allOk) {
      setBatchCompleted(true);
      await deleteFromStorage('records');
      setTimeout(() => {
        setBatchCompleted(false);
      }, 5000);
    } else {
      console.log('Error: handleBatchRecords');
    }
  };

  useEffect(() => {
    const getStoredRecords = async () => {
      return await getFromStorage('records');
    };
    if (isConnected) {
      getStoredRecords().then(
        async records => !!records && (await handleBatchRecords(records)),
      );
    }
  }, [isConnected]);

  return { batchCompleted, setBatchCompleted };
};
