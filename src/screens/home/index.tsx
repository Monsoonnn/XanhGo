import React from 'react';
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
        <View>
          <TouchableOpacity style={styles.promotionBanner}>
            <Image
              source={require('../../assets/images/promotion_banner.jpg')}
              style={styles.promotionImage}
            />
          </TouchableOpacity>
        </View>

        {/* Offers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Khuyến mãi</Text>
          <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offerGrid} style={styles.offerGrid}>
            <TouchableOpacity style={styles.offerCard}>
              <Image
                source={require('../../assets/images/vouncher_1.jpg')}
                style={styles.offerImage}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.offerCard}>
              <Image
                source={require('../../assets/images/vouncher_2.jpg')}
                style={styles.offerImage}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.offerCard}>
              <Image
                source={require('../../assets/images/vouncher_1.jpg')}
                style={styles.offerImage}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Nearby Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gần đây</Text>
          <TouchableOpacity style={styles.nearbyCard}>
            <View style={styles.nearbyImageContainer}>
              <Icon name="apartment" size={40} color="#FF9800" />
            </View>
            <View style={styles.nearbyInfo}>
              <Text style={styles.nearbyTitle}>Nhà thờ Lớn</Text>
              <Text style={styles.nearbyAddress}>Hoàn Kiếm, Hà Nội</Text>
              <View style={styles.nearbyTags}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Xe máy</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Ô tô</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="favorite-border" size={20} color="#999" />
            </TouchableOpacity>
          </TouchableOpacity>
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
      <BottomBar />
    </View>
  );
};



export default Home;