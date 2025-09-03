import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

export const styles = StyleSheet.create({
    locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 13,

  },
  currentLocationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D4D4D4',
    marginRight: 16,
  },
  currentLocationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#D4D4D4',

  },
  currentLocationText: {
    fontSize: 14,
    fontFamily: Fonts.Montserrat.Regular,
    // color: '#4CAF50',
    fontWeight: '500',
    flex: 1,
  },
    searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingLeft: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#29B26B',
    marginRight: 16,
  },
  destinationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '92%',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    paddingLeft: 12,
    paddingRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: 'black',

  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  loadingIcon: {
    marginLeft: 8,
    marginVertical: 12,
  },
});