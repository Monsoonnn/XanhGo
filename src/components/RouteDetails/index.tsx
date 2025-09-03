import React, { forwardRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft2, CloseCircle, Save2, Send2 } from 'iconsax-react-native';
import {
  Route,
  Segment,
  getTransportStyle,
  formatDuration,
  formatPrice,
  getTimeRangeString,
  getNavigationIcon,
  formatDistance
} from '../../utils/Mapbox';
import { styles } from './styles';
import BottomSheet, { BottomSheetRef } from '../BottomSheet';
import { DotIcon } from 'phosphor-react-native';

interface NavigationBottomSheetProps {
  selectedRoute: Route | null;
  passedRoute?: Route;
  navigationStatus?: 'idle' | 'navigating' | 'done';
  currentSegmentIndex?: number;
  onStartNavigation: () => void;
  onClose?: () => void;
  onCloseModel?: () => void;
}

const NavigationBottomSheet = forwardRef<BottomSheetRef, NavigationBottomSheetProps>(
  (
    {
      selectedRoute,
      passedRoute,
      navigationStatus = 'idle',
      currentSegmentIndex = 0,
      onStartNavigation,
      onClose,
      onCloseModel,
    },
    ref
  ) => {
    const isNavigating = navigationStatus === 'navigating';
    const isDone = navigationStatus === 'done';

    const renderSegmentDetails = (segment: Segment, index: number, isCurrent: boolean = false) => {
      return (
        <View
          key={segment.id}
          style={[
            styles.segmentItem,
            isCurrent && styles.currentSegmentItem
          ]}
        >
          <View style={styles.segmentHeader}>
            <View style={styles.segmentIconContainer}>
              <View style={[styles.segmentIconBg]}>
                <Image
                  source={getNavigationIcon(segment.type)}
                  style={styles.segmentIcon}
                />
              </View>
              <Text
                style={[
                  styles.segmentIndex,
                  isCurrent && styles.currentSegmentIndex
                ]}
              >
                {formatDistance(segment.distance)}
              </Text>
            </View>
            <View style={styles.segmentInfo}>
              <Text
                style={[
                  styles.segmentInstruction,
                  isCurrent && styles.currentSegmentInstruction
                ]}
              >
                {segment.instruction}
              </Text>
            </View>
          </View>
        </View>
      );
    };

    const renderContent = () => {
      if (!selectedRoute) return null;

      return (
        <View style={styles.navigationBottomSheetContent}>
          {/* Route Summary */}
          {navigationStatus === 'idle' && (
            <View style={styles.routeSummary}>
              <View style={styles.routeSummaryStats}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryText}>
                    {formatDuration(selectedRoute.totalDuration)}
                  </Text>
                  <Text style={styles.summaryTextSub}>
                    ({selectedRoute.totalDistance} km)
                  </Text>
                </View>
                <View style={styles.summaryItemSub}>
                  <Text style={styles.summaryTextDesc}>
                    {getTimeRangeString(selectedRoute.totalDuration)}
                  </Text>
                  <DotIcon size={28} color="#666" />
                  <Text style={styles.summaryTextDesc}>
                    {formatPrice(selectedRoute.totalPrice)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Segments List */}
          <View style={styles.segmentsList}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.segmentsScrollView}
              nestedScrollEnabled
              scrollEnabled
            >
              {isNavigating ? (
                <View style={styles.routeSummary}>
                  <View style={styles.routeSummaryStats}>
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryText}>
                        {selectedRoute.segments[0].instruction}
                      </Text>
                      <Text style={styles.summaryTextSub}>
                        ({selectedRoute.totalDistance} km)
                      </Text>
                    </View>
                    <View style={styles.summaryItemSub}>
                      <Text style={styles.summaryTextDesc}>
                        {getTimeRangeString(selectedRoute.totalDuration)}
                      </Text>
                      <DotIcon size={28} color="#666" />
                      <Text style={styles.summaryTextDesc}>
                        {formatPrice(selectedRoute.totalPrice)}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : isDone ? (
                <View style={styles.routeSummary}>
                  <Text style={[styles.summaryText, {}]}>
                    Hoàn thành !
                  </Text>
                  <Text style={styles.summaryTextDesc}>
                    Chúc mừng bạn đã hoàn thành chuyến đi và nhận{" "}
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      50 điểm Xanh
                    </Text>
                  </Text>
                </View>
              ) : (
                selectedRoute.segments.map((segment, index) =>
                  renderSegmentDetails(segment, index)
                )
              )}
            </ScrollView>
          </View>

          {/* Action Buttons */}
          <View style={styles.navigationButtonContainer}>
            <TouchableOpacity style={[styles.navigationButton, { backgroundColor: '#BEDEAB', width: (isNavigating || isDone) ? '45%' : '40%' }]}>
              <Save2 size={24} />
              <Text style={[styles.navigationText, { color: 'black' }]}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navigationButton,
                (isNavigating) && styles.navigationButtonActive,
                (isDone) && styles.navigationButtonDone,
                {width: (isNavigating || isDone) ? '50%' : '60%' },
              ]}
              onPress={isDone ? onCloseModel : onStartNavigation}
            >
              {isNavigating || isDone ? (
                <CloseCircle size={24} color="#fff" />
              ) : (
                <Send2 size={24} color="#fff" />
              )}
              <Text style={styles.navigationText}>
                {isNavigating ? 'Thoát' : isDone ? 'Đóng' : 'Bắt đầu'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <BottomSheet
        ref={ref}
        height={getHeight(selectedRoute, navigationStatus)}
        adjustToContentHeight={false}
        onClose={onClose}
        showHandle
        overlayTransparent
        disableScroll
      >
        {renderContent()}
      </BottomSheet>
    );
  }
);

const getHeight = (
  selectedRoute: Route | null,
  status: 'idle' | 'navigating' | 'done'
): number => {
  if (status === 'navigating') return 200;
  if (status === 'done') return 200;
  if (!selectedRoute) return 300;

  const estimatedHeight = selectedRoute.segments.length * 80 + 165;
  return Math.min(Math.max(estimatedHeight, 300), 550);
};

export default NavigationBottomSheet;
