import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import Fonts from '../../constants/font';

import { Bus } from 'iconsax-react-native';
import { PersonSimpleRunIcon, TramIcon, CompassIcon } from 'phosphor-react-native';

// Type
type NearbyTag = {
  type: 'Walk' | 'Bus' | 'Train';
  value: string;
};

type Props = {
  image: ImageSourcePropType;
  title: string;
  nearbyAddress: string;
  nearbyTags: NearbyTag[];
};

const NearbyCard = ({ image, title, nearbyAddress, nearbyTags }: Props) => {
  return (
    <TouchableOpacity style={styles.nearbyCard}>
      {/* Image */}
      <View style={styles.nearbyImageContainer}>
        <Image source={image} style={styles.nearbyImage} resizeMode="cover" />
      </View>

      {/* Info */}
      <View style={styles.nearbyInfo}>
        <View 
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
            <Text style={styles.nearbyTitle}>{title}</Text>
            <CompassIcon size={28} />
        </View>
        <Text style={styles.nearbyAddress}>{nearbyAddress}</Text>

        {/* Tags */}
        <View style={styles.nearbyTags}>
          {nearbyTags.map((tag, idx) => {
            let IconComp = null;
            let bgColor = '#ffff';

            if (tag.type === 'Walk') {
              IconComp = <PersonSimpleRunIcon size={18}  />;
              bgColor = '#EFEAD6';
            } else if (tag.type === 'Bus') {
              IconComp = <Bus size={18} />;
              bgColor = '#29B26B';
            } else if (tag.type === 'Train') {
              IconComp = <TramIcon size={18} />;
              bgColor = '#F6B9D4';
            }

            return (
              <View style={styles.tag} key={idx}>
                <View style={{marginTop: 3}}>{IconComp}</View>
                <Text style={[styles.tagText, { backgroundColor: bgColor }]}>
                  {tag.value}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Favorite button */}
      <TouchableOpacity style={styles.favoriteButton}>
        {/* <Icon name="favorite-border" size={20} color="#999" /> */}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default NearbyCard;

const styles = StyleSheet.create({
  nearbyCard: {
    flexDirection: 'row',
    backgroundColor: '#F1F5EA',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    gap: 2,
  },
  nearbyImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  nearbyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  nearbyInfo: {
    flex: 1,
    marginRight: 0,
  },
  nearbyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
    fontFamily: Fonts.DelaGothicOne,
  },
  nearbyAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  nearbyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  tag: {
    // backgroundColor: '#E3F2FD',
    // paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 5
  },
  tagText: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  favoriteButton: {
    padding: 8,
  },
});
