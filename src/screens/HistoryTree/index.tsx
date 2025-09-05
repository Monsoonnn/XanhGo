import React, { useMemo, useState, useRef } from "react";
import { FlatList, Text, View, TouchableOpacity, Pressable, UIManager, findNodeHandle } from "react-native";
import { styles } from "./styles";
import { getAugust2025Data } from "../../data/august2025Data";
import { PLANTS } from "../../data/plants";
import MonthView from '../../components/MonthView';
import Bar from '../../components/Bar';
import PlantRow from '../../components/PlantRow';

// derive planted list from PLANTS
// Assumption: use purchased plants (isBought === true) as "planted" items;
// add a simple placeholder `when` string and a default status of 'claim'.
const planted = PLANTS.filter(p => p.isBought).map(p => ({
    id: p.id,
    name: p.name,
    when: '1 tháng trước',
    status: 'claim',
    imageUrl: p.imageUrl,
}));

// Bar and PlantRow moved to components/HistoryTree

const HistoryTree = () => {
    const [mode, setMode] = useState<'week' | 'month'>('week');
    // helper to format local date -> YYYY-MM-DD
    const toLocalISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = toLocalISO(today); // local YYYY-MM-DD
    const [weekOffset, setWeekOffset] = useState(0); // 0 = current week, -1 = prev week, etc.
    const [monthOffset, setMonthOffset] = useState(0);
    const rootRef = useRef<any>(null);
    const isMounted = useRef(true);
    const chartRef = useRef<any>(null);
    const [tooltip, setTooltip] = useState<null | { x: number; y: number; date: string; value: number }>(null);

    const onBarPress = (nativeEvent: any, date: string, value: number) => {
        // measure root to compute position
        const rootHandle = findNodeHandle(rootRef.current);
        if (!rootHandle) {
            if (isMounted.current) setTooltip({ x: nativeEvent.pageX, y: nativeEvent.pageY, date, value });
            return;
        }
        UIManager.measure(rootHandle, (rx, ry, rw, rh, px, py) => {
            const x = nativeEvent.pageX - px;
            const y = nativeEvent.pageY - py - 40; // lift tooltip above touch
            if (isMounted.current) setTooltip({ x, y, date, value });
        });
    };

    const onDayPress = (nativeEvent: any, date: string, value: number) => {
        const rootHandle = findNodeHandle(rootRef.current);
        if (!rootHandle) {
            if (isMounted.current) setTooltip({ x: nativeEvent.pageX, y: nativeEvent.pageY, date, value });
            return;
        }
        UIManager.measure(rootHandle, (rx, ry, rw, rh, px, py) => {
            const x = nativeEvent.pageX - px;
            const y = nativeEvent.pageY - py - 40;
            if (isMounted.current) setTooltip({ x, y, date, value });
        });
    };

    // track mount/unmount to avoid setting state after unmount (which can cause native view errors)
    React.useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    // choose a goal to compute Đạt / Không đạt (can be replaced with real user goal)
    const GOAL = 50;

    // memoize data so we don't recreate the whole dataset on every render
    const data = useMemo(() => getAugust2025Data(GOAL), [GOAL]);

    const bars = useMemo(() => {

        // Tạo object reference cho tuần được chọn (apply weekOffset)
        const nowLocal = new Date();
        nowLocal.setHours(0, 0, 0, 0);
        // shift by weekOffset weeks
        const refDate = new Date(nowLocal);
        refDate.setDate(nowLocal.getDate() + weekOffset * 7);

        // use shared todayStr (local)
        const todayStrLocal = todayStr;

        // Tính thứ trong tuần (0=CN,1=T2,...6=T7) của refDate
        const jsDay = refDate.getDay();
        const dayOfWeek = (jsDay === 0 ? 6 : jsDay - 1); // 0=Monday

        // Tìm ngày thứ 2 của tuần được chọn
        const monday = new Date(refDate);
        monday.setDate(refDate.getDate() - dayOfWeek);

        // use shared toLocalISO helper



        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const weekDates = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            const iso = toLocalISO(d);
            return {
                date: iso,
                dayShort: weekdays[d.getDay()]  // lấy trực tiếp từ getDay()
            };
        });


        // gather values only for dates up to today
        const shownValues = weekDates
            .map(w => data.find(x => x.date === w.date))
            .filter(Boolean)
            .map((s: any) => s.value);
        const maxVal = Math.max(...shownValues, 1);

        return weekDates.map((w, i) => {
            const entry = data.find(x => x.date === w.date);
            const isPastOrToday = w.date <= todayStrLocal;
            const value = entry && isPastOrToday ? entry.value : 0;
            const color = entry && isPastOrToday ? (entry.status === 'Đạt' ? '#3CB371' : '#F7CFE3') : '#ECECEC';
            const valuePercent = value ? Math.round((value / maxVal) * 100) : 0;
            // isToday only when weekOffset === 0 and date matches local today
            const isToday = weekOffset === 0 && w.date === todayStrLocal;
            return { day: w.dayShort, valuePercent, color, isToday, value, date: w.date };
        });
    }, [weekOffset, todayStr]);

    const totalPoints = useMemo(() => {
        return bars.reduce((s, b) => s + (b.value || 0), 0);
    }, [bars]);

    // compute selected week's range for display
    const weekRangeText = useMemo(() => {
        const nowLocal = new Date();
        nowLocal.setHours(0, 0, 0, 0);
        const refDate = new Date(nowLocal);
        refDate.setDate(nowLocal.getDate() + weekOffset * 7);
        const jsDay = refDate.getDay();
        const dayOfWeek = (jsDay === 0 ? 6 : jsDay - 1);
        const monday = new Date(refDate);
        monday.setDate(refDate.getDate() - dayOfWeek);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        const fmt = (d: Date) => `${d.getDate()} tháng ${d.getMonth() + 1}`;
        return `${fmt(monday)} - ${fmt(sunday)}`;
    }, [weekOffset]);

    const prevWeek = () => setWeekOffset(o => o - 1);
    const nextWeek = () => setWeekOffset(o => Math.min(o + 1, 0));
    const prevMonth = () => setMonthOffset(o => o - 1);
    const nextMonth = () => setMonthOffset(o => Math.min(o + 1, 0));

    // memoize month calendar computations to avoid rebuilding arrays on each render
    const monthData = useMemo(() => {
        const ref = new Date();
        // avoid month overflow when current day > target month's max days
        ref.setDate(1);
        ref.setMonth(ref.getMonth() + monthOffset);
        const year = ref.getFullYear();
        const month = ref.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const cells: Array<{ dateStr?: string; dayNum?: number }> = [];
        const firstOfMonth = new Date(year, month, 1);
        const startWeekday = firstOfMonth.getDay(); // 0=Sun
        // add leading empty cells so day 1 appears on the correct weekday column
        for (let i = 0; i < startWeekday; i++) cells.push({});
        for (let d = 1; d <= lastDay; d++) {
            cells.push({ dateStr: toLocalISO(new Date(year, month, d)), dayNum: d });
        }
        const total = cells.reduce((s, c) => {
            if (!c.dateStr) return s;
            const entry = data.find(x => x.date === c.dateStr);
            if (!entry) return s;
            if (c.dateStr > todayStr) return s;
            return s + entry.value;
        }, 0);
        return { cells, total, year, month, lastDay };
    }, [monthOffset, data, todayStr]);

    // helper to render month calendar grid for selected monthOffset
    const renderMonth = () => {
        return (
            <MonthView
                monthData={monthData}
                data={data}
                onDayPress={onDayPress}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
                monthOffset={monthOffset}
                todayStr={todayStr}
            />
        );
    }

    // MonthView extracted to separate file

    const ListHeader = () => (
        <>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Gần đây</Text>
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={() => setMode('week')} style={[styles.tabButton, mode === 'week' ? styles.tabActive : null]}>
                        <Text style={styles.tabText}>Tuần</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMode('month')} style={[styles.tabButton, mode === 'month' ? styles.tabActive : null]}>
                        <Text style={styles.tabText}>Tháng</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.chartWrap}>
                {mode === 'week' ? (
                    <>
                        <View ref={chartRef} style={styles.barsRow}>
                            {bars.map((b, idx) => (
                                <Bar key={`${b.date}-${idx}`} valuePercent={b.valuePercent} color={b.color} day={b.day} isToday={b.isToday} onPressIn={(e) => onBarPress(e.nativeEvent, b.date, b.value)} />
                            ))}
                        </View>

                        {mode === 'week' ? (
                            <View style={styles.scoreNavRow}>
                                <TouchableOpacity onPress={prevWeek} style={styles.navBtn}>
                                    <Text>{'<'}</Text>
                                </TouchableOpacity>
                                <View style={styles.scoreCard}>
                                    <Text style={styles.scoreText}>{totalPoints} điểm Xanh</Text>
                                    <Text style={styles.scoreRange}>{weekRangeText}</Text>
                                </View>
                                <TouchableOpacity onPress={nextWeek} style={[styles.navBtn, weekOffset === 0 ? { opacity: 0.3 } : null]} disabled={weekOffset === 0}>
                                    <Text>{'>'}</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.scoreNavRow}>
                                <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
                                    <Text>{'<'}</Text>
                                </TouchableOpacity>
                                <View style={styles.scoreCard}>
                                    <Text style={styles.scoreText}>{/* compute month points below */}…</Text>
                                    <Text style={styles.scoreRange}>{/* month label */}</Text>
                                </View>
                                <TouchableOpacity onPress={nextMonth} style={[styles.navBtn, monthOffset === 0 ? { opacity: 0.3 } : null]} disabled={monthOffset === 0}>
                                    <Text>{'>'}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                ) : (
                    renderMonth()
                )}
            </View>

            <Text style={styles.sectionTitle}>Cây đã trồng</Text>
        </>
    );

    return (
        <View style={styles.container}>
            <View ref={rootRef} style={{ flex: 1 }}>
                <FlatList
                    data={planted}
                    keyExtractor={i => String(i.id)}
                    renderItem={({ item }) => <PlantRow item={item} />}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    ListHeaderComponent={<ListHeader key={mode} />}
                    contentContainerStyle={{ paddingBottom: 24 }}
                    scrollIndicatorInsets={{ right: 15 }}
                    removeClippedSubviews={false}
                />

                {tooltip ? (
                    <Pressable style={[styles.tooltip, { left: tooltip.x - 50, top: tooltip.y }]} onPress={() => setTooltip(null)}>
                        {/* show dd/mm/yyyy */}
                        {(() => {
                            const d = new Date(tooltip.date + 'T00:00:00');
                            const label = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
                            return <Text style={styles.tooltipDate}>{label}</Text>;
                        })()}
                        <Text style={[styles.tooltipValue, { color: tooltip.value >= GOAL ? '#028961' : '#F6B9D4' }]}>{tooltip.value}g CO2 ({tooltip.value >= GOAL ? 'Đạt' : 'Không đạt'})</Text>
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
};

export default HistoryTree;
