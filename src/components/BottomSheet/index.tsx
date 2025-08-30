import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
const { height: screenHeight } = Dimensions.get('window');

// Types
export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

interface BottomSheetProps {
  title?: string;
  height?: number | string;
  adjustToContentHeight?: boolean;
  showHandle?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

// Reusable BottomSheet Component
const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ 
    title, 
    height, 
    adjustToContentHeight = true, 
    showHandle = true,
    onClose,
    children 
  }, ref) => {
    const modalRef = useRef<Modalize>(null);

    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.open(),
      close: () => modalRef.current?.close(),
    }));

    const handleClose = () => {
      onClose?.();
    };

    return (
      <Modalize
        ref={modalRef}
        adjustToContentHeight={adjustToContentHeight}
        modalHeight={typeof height === 'number' ? height : undefined}
        onClose={handleClose}
        handleStyle={showHandle ? styles.handle : { backgroundColor: 'transparent' }}
        modalStyle={styles.modal}
        childrenStyle={styles.childrenContainer}
      >
        <View style={styles.container}>
          {showHandle && <View style={styles.handleBar} />}
          
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
          
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </Modalize>
    );
  }
);


// Generic Content Bottom Sheet (for other use cases)
interface ContentBottomSheetProps {
  title?: string;
  content: React.ReactNode;
  onClose?: () => void;
}

export const ContentBottomSheet = forwardRef<BottomSheetRef, ContentBottomSheetProps>(
  ({ title, content, onClose }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        title={title}
        adjustToContentHeight
        onClose={onClose}
      >
        {content}
      </BottomSheet>
    );
  }
);

// Example usage component
// export const BottomSheetExample = () => {
//   const addCardRef = useRef<BottomSheetRef>(null);
//   const contentRef = useRef<BottomSheetRef>(null);

//   const handleAddCard = () => {
//     addCardRef.current?.open();
//   };

//   const handleOpenContent = () => {
//     contentRef.current?.open();
//   };

//   const handlePhoneSubmit = (phoneNumber: string) => {
//     console.log('Phone submitted:', phoneNumber);
//     addCardRef.current?.close();
//   };

//   return (
//     <View style={styles.exampleContainer}>
//       <TouchableOpacity style={styles.exampleButton} onPress={handleAddCard}>
//         <Text style={styles.exampleButtonText}>Open Add Card Sheet</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.exampleButton} onPress={handleOpenContent}>
//         <Text style={styles.exampleButtonText}>Open Content Sheet</Text>
//       </TouchableOpacity>

//       <AddCardBottomSheet
//         ref={addCardRef}
//         onSubmit={handlePhoneSubmit}
//         onClose={() => console.log('Add card sheet closed')}
//       />

//       <ContentBottomSheet
//         ref={contentRef}
//         title="Custom Content"
//         content={
//           <View style={{ padding: 20 }}>
//             <Text>This is custom content!</Text>
//             <Text>You can put anything here.</Text>
//           </View>
//         }
//         onClose={() => console.log('Content sheet closed')}
//       />
//     </View>
//   );
// };

export default BottomSheet;

