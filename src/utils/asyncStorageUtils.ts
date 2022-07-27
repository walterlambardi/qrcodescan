import AsyncStorage from '@react-native-async-storage/async-storage';
import { IRecord } from '../pages/qrcodescan/QrCodeScan';

export const saveInStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`saveInStorage: ${e}`);
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(`getFromStorage: ${e}`);
  }
};

export const deleteFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log(`deleteFromStorage: ${e}`);
  }
};

export const saveRecord = async (record: IRecord) => {
  try {
    let jsonValue = await AsyncStorage.getItem('records');
    //@ts-ignore
    let records: IRecord[] = JSON.parse(jsonValue);
    if (!records) {
      const arrNew = [{ record }];
      return await AsyncStorage.setItem('records', JSON.stringify(arrNew));
    }
    const newArry = [...records, record];
    return await AsyncStorage.setItem('records', JSON.stringify(newArry));
  } catch (e) {
    console.log(`saveRecord: ${e}`);
  }
};
