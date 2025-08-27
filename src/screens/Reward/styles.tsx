import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29B26B',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  time: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  signalBar: {
    width: 3,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  battery: {
    width: 24,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
    marginTop: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 50,
    paddingBottom: 65,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  logoXanh: {
    color: '#10B981',
  },
  logoCo: {
    color: '#EC4899',
  },
  trophyContainer: {
    position: 'relative',
    marginBottom: 32,
    height: 100,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confetti: {
    position: 'absolute',
  },
  confettiDot: {
    fontSize: 16,
    color: '#EC4899',
  },
  confettiStar: {
    fontSize: 20,
    color: '#FBBF24',
  },
  confettiWave: {
    fontSize: 12,
    color: '#10B981',
  },
  trophy: {
    alignItems: 'center',
  },
  trophyCup: {
    width: 80,
    height: 64,
    backgroundColor: '#FCD34D',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyHandle: {
    position: 'absolute',
    width: 24,
    height: 32,
    borderWidth: 4,
    borderColor: '#FBBF24',
    borderRadius: 12,
    top: 8,
  },
  leftHandle: {
    left: -12,
    borderRightWidth: 0,
  },
  rightHandle: {
    right: -12,
    borderLeftWidth: 0,
  },
  trophyCenter: {
    width: 32,
    height: 32,
    backgroundColor: '#FBBF24',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyInnerCircle: {
    width: 16,
    height: 16,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
  },
  trophyBase1: {
    width: 96,
    height: 12,
    backgroundColor: '#D97706',
  },
  trophyBase2: {
    width: 64,
    height: 16,
    backgroundColor: '#1E3A8A',
  },
  laurel: {
    position: 'absolute',
    bottom: -5,
  },
  leftLaurel: {
    left: -20,
    transform: [{ rotate: '20deg' }],
  },
  rightLaurel: {
    right: -20,
    transform: [{ rotate: '-20deg' }],
  },
  laurelText: {
    fontSize: 24,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 24,
    marginTop: 24,
  },
  progressContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSvg: {
    position: 'absolute',
  },
  checkmarkContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.DelaGothicOne,
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 32,
  },
  actionButton: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default styles;