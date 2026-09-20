import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { CATEGORIES } from '../data/categories';
import { useGameStore } from '../store/gameStore';

const { width: W, height: H } = Dimensions.get('window');
const CARD_W = 160;
const CARD_H = 120;
const SPACING = 160;

// Snake path points for categories
const getCardPosition = (index: number) => {
  const row = Math.floor(index / 1);
  const col = index % 3;
  // Zigzag: even rows left-to-right, odd rows right-to-left
  const zigzagRow = Math.floor(index / 3);
  const posInRow = index % 3;
  const x = zigzagRow % 2 === 0
    ? 60 + posInRow * (CARD_W + 80)
    : W - 60 - CARD_W - posInRow * (CARD_W + 80);
  const y = 40 + zigzagRow * (CARD_H + 60);
  return { x, y };
};

export default function CategorySelectScreen() {
  const navigation = useNavigation<any>();
  const state = useGameStore();

  // Build SVG snake path through card centers
  const buildSnakePath = () => {
    const points = CATEGORIES.map((_, i) => {
      const pos = getCardPosition(i);
      return { x: pos.x + CARD_W / 2, y: pos.y + CARD_H / 2 };
    });

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const mx = (prev.x + curr.x) / 2;
      d += ` C ${mx} ${prev.y}, ${mx} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  const totalHeight = Math.ceil(CATEGORIES.length / 3) * (CARD_H + 60) + 100;

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.infoBtn}>
          <Text style={styles.infoBtnText}>ℹ️</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Kategori Seç</Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ width: Math.max(W, CATEGORIES.length * 220), height: H - 80 }}>

        {/* Snake path */}
        <Svg
          width={Math.max(W, CATEGORIES.length * 220)}
          height={H - 80}
          style={StyleSheet.absoluteFillObject}>
          <Path
            d={buildSnakePath()}
            stroke="white"
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>

        {/* Category cards */}
        {CATEGORIES.map((cat, i) => {
          const pos = getCardPosition(i);
          const isUnlocked = state.unlockedCategories.includes(cat.id);
          const score = state.scores[cat.id] ?? 0;

          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.card,
                {
                  left: pos.x,
                  top: pos.y,
                  borderColor: isUnlocked ? cat.color : '#546e7a',
                  backgroundColor: isUnlocked ? '#1565C0' : '#263238',
                },
              ]}
              onPress={() => {
                if (isUnlocked) {
                  navigation.navigate('Quiz', { categoryId: cat.id });
                }
              }}
              disabled={!isUnlocked}>

              {/* Map thumbnail placeholder */}
              <View style={[styles.mapThumb, { backgroundColor: isUnlocked ? cat.color + '44' : '#37474f' }]}>
                <Text style={styles.mapEmoji}>{cat.icon}</Text>
              </View>

              <Text style={[styles.cardTitle, !isUnlocked && styles.lockedText]}>
                {cat.name}
              </Text>

              {/* Lock overlay */}
              {!isUnlocked && (
                <View style={styles.lockOverlay}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
              )}

              {/* Score badge */}
              {isUnlocked && score > 0 && (
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreText}>{score}✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bottom bar — coins and key */}
      <View style={styles.bottomBar}>
        <View style={styles.coinChip}>
          <Text style={styles.coinIcon}>➕</Text>
          <Text style={styles.coinText}>{state.coins}</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(state.unlockedCategories.length / CATEGORIES.length) * 100}%` },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.keyChip}>
          <Text style={styles.keyIcon}>🗝️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d47a1',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  infoBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBtnText: { fontSize: 18 },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#5c6bc0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  // Cards
  card: {
    position: 'absolute',
    width: CARD_W,
    height: CARD_H,
    borderRadius: 14,
    borderWidth: 2,
    padding: 8,
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  mapThumb: {
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapEmoji: { fontSize: 32 },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  lockedText: { color: '#90A4AE' },
  lockOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 14,
  },
  lockIcon: { fontSize: 32 },
  scoreBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  scoreText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  // Bottom
  bottomBar: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  coinChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1565C0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  coinIcon: { fontSize: 14 },
  coinText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  progressBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#1565C0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#42A5F5',
    borderRadius: 5,
  },
  keyChip: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6F00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyIcon: { fontSize: 18 },
});
