import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ModalService } from '../helpers/modalSubject';
import { MaterialIcons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native'; 
import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications'
import { Permissions } from 'expo';
import Toast, {DURATION} from 'react-native-easy-toast'

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

const ExportModal = ({ companyId, summaryType, date }) => {

  const [ visibility, setVisibility ] = useState(false);
  const [ exportType, setExportType ] = useState(null);
  const [ filePreviewText, setFilePreviewText ] = useState(''); 
  const [ error, setError ] = useState('');

  useEffect(()=> {
    const subscription = ModalService.getIsOpen().subscribe(data => {
      if(data) {
        setVisibility(true);
        getiOSNotificationPermission();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  istenForNotifications = () => {
    const _this = this;

    Notifications.addListener(notification => {
      if (notification.origin === 'received') {
        // We could also make our own design for the toast
        // _this.refs.toast.show(<View><Text>hello world!</Text></View>);

        const toastDOM = 
          <TouchableWithoutFeedback 
            onPress={() => {openFile(notification.data.fileUri)}}
            style={{padding: '10', backgroundColor: 'green'}}>
            <Text style={styles.toastText}>{notification.data.body}</Text>
          </TouchableWithoutFeedback>;

        toast.show(toastDOM, DURATION.FOREVER);
      } else if (notification.origin === 'selected') {
        openFile(notification.data.fileUri);
      }
        // Expo.Notifications.setBadgeNumberAsync(number);
        // Notifications.setBadgeNumberAsync(10);
        // Notifications.presentLocalNotificationAsync(notification);
        // Alert.alert(notification.title, notification.body);
    });
  };

  openFile = (fileUri) => {
    toast.close(40);
    console.log('Opening file ' + fileUri);
    FileSystem.readAsStringAsync(fileUri)
    .then((fileContents) => {
      // Get file contents in binary and convert to text
      // let fileTextContent = parseInt(fileContents, 2);
      setFilePreviewText({filePreviewText: fileContents});
    });
  }

  const resolveExport = async () => {
    const token = await AsyncStorage.getItem('token');

    // Downloading the file
    const fileName = summaryType === "PayIn" ? "ulazne.xlsx" : "izlazne.xlsx" + format(new Date(), 'dd_MM_yyyy').toString();
    const  fileLocation = FileSystem.documentDirectory + fileName;
    const url = 'https://mv-dev.fleksbit.org/api/getExportedData?firmId=1&date=2021-01-19T10:40:00.874Z&creditDebit=1&exportDateType=EXCEL';
    FileSystem.downloadAsync(url, fileLocation, { headers: { Authorization: 'Bearer ' + token }})
    .then(({uri}) => {
      console.log(uri)
      const localnotification = {
        title: 'Download has finished',
        body: fileName + " has been downloaded. Tap to open file.",
        android: {
          sound: true,
        },
        ios: {
          sound: true,
        },
        data: {
          fileUri: uri
        },
      };
      localnotification.data.title = localnotification.title;
      localnotification.data.body = localnotification.body;
      let sendAfterFiveSeconds = Date.now();
      sendAfterFiveSeconds += 3000;

      const schedulingOptions = { time: sendAfterFiveSeconds };
      Notifications.scheduleLocalNotificationAsync(
        localnotification,
        schedulingOptions
      );
    })
    .catch(error => {
    })
}

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibility}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Export</Text>
          <TouchableOpacity style={styles.exportRows} onPress={() => setExportType('PDF')}>
            <Text>PDF</Text>
            { exportType === 'PDF' ? <MaterialIcons name="radio-button-on" size={20} color="#56d091" /> : <MaterialIcons name="radio-button-off" size={20} color="#56d091" />}
          </TouchableOpacity>
          <TouchableOpacity  style={styles.exportRows} onPress={() => setExportType('EXCEL')}>
            <Text>EXCEL</Text>
            { exportType === 'EXCEL' ? <MaterialIcons name="radio-button-on" size={20} color="#56d091" /> : <MaterialIcons name="radio-button-off" size={20} color="#56d091" />}
          </TouchableOpacity>
          <View style={{ flexDirection:'row',justifyContent: 'space-between', marginVertical: 15}}>
            <TouchableOpacity
              onPress={() => {
                setVisibility(false);
                ModalService.openModal(false);
              }}>
              <Text>OTKAŽI</Text>
            </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resolveExport()
                }}>
                <Text style={{ color: '#56d091',fontWeight:'600' }}>POTVRDI</Text>
            </TouchableOpacity>
          </View>
        </View> 
      </View>
      <Toast ref={ (ref) => toast=ref }/>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(100,100,100, 0.5)',
  },
  modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 50,
      paddingVertical: 20,
      elevation: 5,
      width: '75%'
  },
  textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
  },
  modalText: {
      marginBottom: 40,
      fontSize: 18,
  },
  exportRows: {
    flexDirection:'row',
    justifyContent: 'space-between', 
    marginBottom: 25
  }
});

export default ExportModal;