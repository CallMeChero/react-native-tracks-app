import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ModalService } from '../helpers/modalSubject';
import { MaterialIcons } from '@expo/vector-icons'; 

const ExportModal = ({ }) => {

  const [ visibility, setVisibility ] = useState(false);
  const [ exportType, setExportType ] = useState(null)

  useEffect(()=> {
    ModalService.getIsOpen().subscribe(data => {
      if(data) {
        setVisibility(true);
      }
    })
  }, [])

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
                  setVisibility(false);
                  ModalService.openModal(false);
                }}>
                <Text style={{ color: '#56d091',fontWeight:'600' }}>POTVRDI</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
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