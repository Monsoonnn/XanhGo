import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Gallery, Profile, Cloud, Scanner, NotificationBing } from 'iconsax-react-native';
import Microphone from "../../assets/iconsax/microphone.svg";

import { styles } from './styles';
import BottomBar from '../../components/BottomBar';
import OfferCard from '../../components/OfferCard';
import NearbyCard from '../../components/NearbyCard';
const { width } = Dimensions.get("window");
const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerBackground}>
            <Image
              source={require('../../assets/images/headerhome.png')}
              style={styles.backgroundImage}
            />
          </View>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.avatar}>
                <Profile size="28" color="#028961" variant="Bold" />
              </View>
              <Text style={styles.avatarText}>Erik</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconButton}>
                <Scanner width={25} height={25} variant="Outline" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <NotificationBing width={25} height={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Xin chào! Bạn muốn đi đâu?</Text>
          </View>
        </View>




        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchPlaceholder}>Nhập nơi đến</Text>
          </View>
          <TouchableOpacity style={styles.locationButton}>
            <Microphone width={25} height={25} />
          </TouchableOpacity>
        </View>

        {/* Balance Cards */}
        <View style={styles.balanceContainer}>
          <TouchableOpacity style={[styles.balanceCard, styles.balanceCardPrimary]}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
              <Gallery size="24" color="#ffff" />
              <Text style={styles.balanceLabel}>Tổng số Km</Text>
            </View>
            <Text style={styles.balanceAmount}>120.000 km</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.balanceCard, styles.balanceCardSecondary]}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
              <Cloud size="24" color="#ffff" variant="Outline" />
              <Text style={styles.balanceLabel}>Tổng CO2</Text>
            </View>

            <Text style={styles.balanceAmount}>120.000 g</Text>
          </TouchableOpacity>
        </View>

        {/* Promotion Banner */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offerGrid}
        >
          <TouchableOpacity style={styles.promotionBanner}>
            <Image
              source={require('../../assets/images/promotion_banner.jpg')}
              style={styles.promotionImage}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.promotionBanner}>
            <Image
              source={require('../../assets/images/promotion_banner.jpg')}
              style={styles.promotionImage}
            />
          </TouchableOpacity> */}
        </ScrollView>

        {/* Offers Section */}
        <OfferCard />

        {/* Nearby Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gần đây</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offerGrid}
          >
            <NearbyCard
              image={require('../../assets/images/nhatholon.png')}
              title="Nhà thờ Lớn"
              nearbyAddress="Hoàn Kiếm, Hà Nội"
              nearbyTags={[
                { type: 'Walk', value: '10P' },
                { type: 'Bus', value: '32' },
                { type: 'Train', value: 'A2' },
              ]}
            />
            <NearbyCard
              image={require('../../assets/images/hoguom.png')}
              title='Hồ Gươm'
              nearbyAddress='Hà Nội'
              nearbyTags={[
                { type: 'Walk', value: '10P' },
                { type: 'Bus', value: '32' },
                { type: 'Train', value: 'A2' },
              ]}
            />
          </ScrollView>

        </View>

        {/* Challenge Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thử thách</Text>
          <View style={styles.challengeCard}>
            <View style={styles.challengeContent}>
              <Text style={styles.challengeTitle}>Thử thách tuần</Text>
              <Text style={styles.challengeSubtitle}>Di chuyển 1200km</Text>
              <TouchableOpacity style={styles.challengeButton}>
                <Text style={styles.challengeButtonText}>Xem chi tiết</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.challengeImageContainer}>
              <Image
                source={require('../../assets/onboard/human_3.png')}
                style={styles.challengeImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Spacer */}
        <View style={{
          height: 100
        }}>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <BottomBar home={true} />
    </View>
  );
};



export default Home;