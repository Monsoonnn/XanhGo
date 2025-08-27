import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginTop: 45,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.DelaGothicOne,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
    paddingTop: 80
  },
  podium: {
    alignItems: 'center',
    borderRadius: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginHorizontal: 5,
    minWidth: 100,
    position: 'relative',
  },
  profileWinner: {
    position: 'absolute',
    top: -90,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  winnerPodium: {
    position: 'relative',
    paddingVertical: 20,
    marginTop: 10,
  },
  crown: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFEAD6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  winnerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  podiumNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  podiumName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  podiumPoints: {
    fontSize: 8,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    backgroundColor: '#FFF1DB',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 12,
  },
  rankingList: {
    paddingHorizontal: 20,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 2,
    borderRadius: 12,
  },
  rankingPosition: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    width: 30,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFEAD6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  rankingInfo: {
    flex: 1,
    marginLeft: 15,
  },
  rankingName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#333',
  },
  rankingPoints: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Montserrat-Regular',
    marginLeft: 5,
  },
  changeContainer: {
    marginRight: 10,
  },
  changeUp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeDown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeNeutral: {
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    marginRight: 2,
    color: '#666',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    padding: 10,
  },
});
 
