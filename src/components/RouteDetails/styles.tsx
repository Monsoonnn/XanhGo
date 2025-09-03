import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

const navigationBottomSheetStyles = StyleSheet.create({
  // Navigation BottomSheet Content
  navigationBottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -10,
    position: 'relative',
  },

  // Route Summary (when not navigating)
  routeSummary: {
  },

  routeSummaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  routeSummaryStats: {
    
  },

  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  summaryItemSub: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  summaryTextDesc: {
    fontSize: 14,
    fontFamily: Fonts.Montserrat.Medium,
  },
  summaryTextSub: {
    fontSize: 16,
    fontFamily: Fonts.Montserrat.SemiBold,
  },

  summaryText: {
    fontSize: 20,
    fontFamily: Fonts.DelaGothicOne,
  },

  // Navigation Progress (when navigating)
  navigationProgress: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 12,
    textAlign: 'center',
  },

  progressBar: {
    height: 6,
    backgroundColor: '#c8e6c9',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 3,
  },

  // Segments List
  segmentsList: {
    // maxHeight: 230,
  },

  segmentsScrollView: {
    flex: 1,
    marginTop: 8,
    
  },

  // Current segment highlighting (when navigating)
  currentSegmentItem: {
    // backgroundColor: '#fff3e0',
    // borderLeftWidth: 4,
    // borderLeftColor: '#ff9800',
    // borderRadius: 8,
    // marginBottom: 12,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 2,
  },

  currentSegmentIndex: {
    color: '#ff9800',
    fontWeight: 'bold',
  },

  currentSegmentInstruction: {
    color: '#e65100',
    fontWeight: '600',
  },

  currentSegmentIndicator: {
    backgroundColor: '#ff9800',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
    marginLeft: 16,
  },

  currentSegmentText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Navigation button updates
  navigationButtonActive: {
    backgroundColor: '#f44336',
  },
  navigationButtonDone: {
    backgroundColor: '#028961',
  },

  // Routes toggle button updates
  navigationToggleButton: {
    backgroundColor: '#ff9800',
  },


  routesToggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

// Make sure to merge these with your existing styles
export const styles = StyleSheet.create({
  segmentItem: {
    marginBottom: 16,
  },
    detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 0.5,
  },
  
  segmentIconContainer: {
    alignItems: 'center',
    marginRight: 12,

  },
  
  segmentIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  segmentIcon: {
    width: 24,
    height: 24,
  },
  
  segmentIndex: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  
  segmentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  
  segmentInstruction: {
    fontSize: 16,
    fontFamily: Fonts.Montserrat.Regular,
    marginBottom: 4,
    marginTop: 15,
  },
  
  segmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  segmentDuration: {
    fontSize: 12,
    color: '#666',
  },
  
  segmentDistance: {
    fontSize: 12,
    color: '#666',
  },
  
  segmentPrice: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  
  segmentLine: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  navigationButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navigationButton: {
    // position: 'absolute',
    // bottom: 30,
    // minWidth: 325,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 32,
    width: '60%',

  },
  
  navigationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  ...navigationBottomSheetStyles, 
});
