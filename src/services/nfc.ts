import NfcManager, { NfcTech } from 'react-native-nfc-manager';

export async function readTag() {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef, { alertMessage: 'Ready to scan NFC' });
    const tag = await NfcManager.getTag();
    return tag;
  } finally {
    NfcManager.cancelTechnologyRequest().catch(() => {});
  }
}
