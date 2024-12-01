import React, {forwardRef, useCallback, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface BottomSheetModalProps {
  children: React.ReactNode;
  snapPoints?: string[];
  onChange?: (index: number) => void;
  initialSnapIndex?: number;
  containerStyle?: object;
  contentContainerStyle?: object;
  ref?: any;
}

const Modal = (
  {
    children,
    snapPoints = ['25%', '50%', '90%'],
    onChange,
    initialSnapIndex = 0,
  }: BottomSheetModalProps,
  ref: any,
) => {
  const handleSheetChanges = useCallback(
    (index: number) => {
      onChange?.(index);
    },
    [onChange],
  );

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  // renders
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={ref}
        children={children}
        snapPoints={['50%', '90%', '100%']}
        onChange={handleSheetChanges}
        index={initialSnapIndex}
      />
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default forwardRef(Modal);
