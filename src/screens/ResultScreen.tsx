import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CATEGORIES } from '../data/categories';

export default function ResultScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { score, total, categoryId } = route.params;

  const category = CATEGORIES.find(c => c.id === categoryId)!;
  const percent = Math.round((score / total) * 100);
  const passed = score >= Math.ceil(total / 2);

  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const getMessage = () => {
    if (percent === 100) return { text: 'Mükemmel! 🏆', color: '#FFD700' };
    if (percent >= 80) return { text: 'Harika! ⭐', color: '#4CAF50' };
    if (percent >= 60) return { text: 'İyi! 👍', color: '#2196F3' };
    if (percent >= 40) return { text: 'Geçti ✓', color: '#FF9800' };
    return { text: 'Tekrar Dene 💪', color: '#F44336' };
  };

  const msg = getMessage();

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        {/* Category */}
        <Text style={styles.categoryLabel}>
          {category.icon} {category.name}
        </Text>

        {/* Score circle */}
        <View style={[styles.scoreCircle, { borderColor: msg.color }]}>
          <Text style={[styles.scorePercent, { color: msg.color }]}>{percent}%</Text>
          <Text style={styles.scoreRaw}>{score}/{total}</Text>
        </View>

        {/* Message */}
        <Text style={[styles.message, { color: msg.color }]}>{msg.text}</Text>

        {/* Stars */}
        <View style={styles.stars}>
          {[1, 2, 3].map(s => (
            <Text
              key={s}
              style={[styles.star, { opacity: percent >= s * 33 ? 1 : 0.25 }]}>
              ⭐
            </Text>
          ))}
        </View>

        {passed && (
          <View style={styles.unlockedBanner}>
            <Text style={styles.unlockedText}>🔓 Yeni kategori açıldı!</Text>
          </View>
        )}

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => navigation.replace('Quiz', { categoryId })}>
            <Text style={styles.retryBtnText}>🔄 Tekrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.homeBtnText}>🏠 Ana Menü</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate('CategorySelect')}>
            <Text style={styles.categoryBtnText}>📋 Kategoriler</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#0d47a1',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '70%',
    maxWidth: 500,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  categoryLabel: {
    color: '#90CAF9',
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '600',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  scorePercent: { fontSize: 32, fontWeight: 'bold' },
  scoreRaw: { color: '#90CAF9', fontSize: 14 },
  message: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  stars: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  star: { fontSize: 32 },
  unlockedBanner: {
    backgroundColor: '#1B5E20',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  unlockedText: { color: '#A5D6A7', fontWeight: 'bold', fontSize: 14 },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  retryBtn: {
    backgroundColor: '#1565C0',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  retryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  homeBtn: {
    backgroundColor: '#2ECC40',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  homeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  categoryBtn: {
    backgroundColor: '#5c6bc0',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  categoryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
