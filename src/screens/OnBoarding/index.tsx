import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useState } from 'react';
import { Dimensions } from "react-native";
import Storage from '../../utils/storage';
import { useNavigation } from '@react-navigation/native';
import Home from '../home';
import Fonts from '../../constants/font';

type OnboardProps = {
  onFinish: () => void;
  isFirstTime: any;
};

const { width } = Dimensions.get("window");

const steps = [
  {
    image: require('../../assets/onboard/rabbit_1.png'),
    title: 'Giảm Carbon!',
    description: 'Sử dụng phương tiện công cộng giúp \n giảm ô nhiễm, bảo vệ môi trường.',

  },
  {
    image: require('../../assets/onboard/human_1.png'),
    title: 'Chạm là đi',
    description: 'Dùng thẻ XanhGo hoặc ví điện tử để quét mã, lên xe ngay!',

  },
  {
    image: require('../../assets/onboard/human_2.png'),
    title: 'Xanh càng lớn!',
    description: 'Sử dụng giao thông công cộng, giảm khí thải CO₂ và nhận thưởng hấp dẫn!',
    // imageStyle: {width: 180, height: 180},
  },
  {
    image: require('../../assets/onboard/rabbit_2.png'),
    title: 'Sẵn sàng ?',
    description: 'Thuận tiện – Bảo vệ môi trường!\nBắt đầu hành trình xanh ngay hôm nay!',
    imageStyle: { marginLeft: width * 0.3 },
  },
];



export default function Onboard({ onFinish, isFirstTime }: OnboardProps): React.JSX.Element {
  const [step, setStep] = useState(0);
  const navigation = useNavigation<any>();

  const handleFinishOnboard = async () => {
    console.log("Onboard" + isFirstTime)
    if (!isFirstTime) navigation.navigate('Auth');
    else navigation.navigate('Home');
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleFinishOnboard();
    }
  };



  return (
    <View style={styles.container}>
      <Image source={steps[step].image} style={steps[step].imageStyle || {}} />

      <Text style={styles.title}>{steps[step].title}</Text>

      <Text style={styles.description}>{steps[step].description}</Text>

      <TouchableOpacity style={styles.roundButton} onPress={nextStep}>
        <Icon name="chevron-right" style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  //   image: {
  //     width: 200,
  //     height: 200,
  //     resizeMode: 'contain',
  //     marginBottom: 20,
  //   },
  title: {
    fontFamily: Fonts.DelaGothicOne,
    fontSize: 36,
    marginBottom: 10,
    marginTop: 2,
  },
  description: {
    fontFamily: Fonts.Montserrat.Regular,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  roundButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
