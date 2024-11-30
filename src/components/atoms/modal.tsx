import React, {ReactNode} from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet} from 'react-native';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  animationIn?: string;
  animationOut?: string;
}

export const CustomModal = ({isVisible, onClose, children}: ModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropTransitionOutTiming={0}
      useNativeDriver={true}
      style={styles.modal}>
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 200,
  },
});
