import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Fonts from '../../constants/font';
import { Microphone2 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';

const VoiceRecordingScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingText, setRecordingText] = useState('');

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingText('');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingText('Khương Định, Quận Thanh Xuân');
  };

  const handleClose = () => {
    setIsRecording(false);
    setRecordingText('');
  };

  const navigation = useNavigation<any>();

  const renderRecordingScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />


      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Bạn muốn đi đâu?</Text>
      </View>

      {/* Recording Button */}
      <View style={styles.recordingContainer}>
        <TouchableOpacity
          onPress={isRecording ? handleStopRecording : handleStartRecording}
          style={isRecording ? styles.outerCircle : ''}
        >
          <View style={styles.middleCircle}>
            <View style={[styles.innerCircle, isRecording && styles.recordingInner]}>
               <Microphone2 size="32" color={isRecording ? '#fff' : '#fff'} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Close Button */}
        <TouchableOpacity onPress={handleClose} style={[styles.closeButton, {top: isRecording ? 320 : 320, }]}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderResultScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      {/* Result Text */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{recordingText}</Text>
      </View>

      {/* Recording Button */}
      <View style={styles.recordingContainer}>
        <TouchableOpacity
          onPress={handleStartRecording}
          style={styles.outerCircleSmall}
        >
          <View style={styles.innerCircleSmall}>
            <Microphone2 size="24" color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>


      </View>
      {/* Close Button */}

    </SafeAreaView>
  );

  return recordingText ? renderResultScreen() : renderRecordingScreen();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    position: 'relative',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  questionContainer: {
    paddingTop: 80,
    paddingBottom: 60,
  },
  questionText: {
    fontSize: 24,
    color: '#9CA3AF',
    fontFamily: Fonts.DelaGothicOne
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,

  },
  resultText: {
    fontSize: 22,
    fontFamily: Fonts.DelaGothicOne,
    textAlign: 'center',
    lineHeight: 32,
  },
  recordingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircleSmall: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircleSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingInner: {
    backgroundColor: '#EF4444',
  },
  micIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  micIconSmall: {
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  recordingMic: {
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 200,
    right: 20,
    width: 30,
    bottom: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '300',
  },
});

export default VoiceRecordingScreen;