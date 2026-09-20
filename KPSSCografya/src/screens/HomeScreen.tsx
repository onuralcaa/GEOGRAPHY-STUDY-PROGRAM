import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGameStore } from '../store/gameStore';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const state = useGameStore();

  const xpPercent = Math.min((state.xp / state.xpToNext) * 100, 100);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* TOP LEFT — Player Info */}
      <View style={styles.topLeft}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>🗺️</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{state.level}</Text>
          </View>
        </View>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{state.playerName}</Text>
          <View style={styles.xpBarBg}>
            <View style={[styles.xpBarFill, { width: `${xpPercent}%` }]} />
          </View>
          <Text style={styles.xpLabel}>{state.xp}/{state.xpToNext}</Text>
        </View>
      </View>

      {/* TOP RIGHT — Stats */}
      <View style={styles.topRight}>
        <View style={styles.statChip}>
          <Text style={styles.statIcon}>➕</Text>
          <Text style={styles.statValue}>{state.coins}</Text>
        </View>
        <View style={styles.statChip}>
          <Text style={styles.statIcon}>🪙</Text>
        </View>
        <View style={styles.statChip}>
          <Text style={styles.statIcon}>➕</Text>
          <Text style={styles.statValue}>12:50</Text>
        </View>
        <View style={styles.statChip}>
          <Text style={styles.statIcon}>❤️</Text>
          <Text style={styles.statValue}>{state.lives}/{state.maxLives}</Text>
        </View>
      </View>

      {/* CENTER — Main Buttons */}
      <View style={styles.centerButtons}>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnIcon}>▶️</Text>
          <Text style={styles.secondaryBtnText}>Videolar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => navigation.navigate('CategorySelect')}>
          <Text style={styles.playBtnIcon}>📖</Text>
          <Text style={styles.playBtnText}>OYNA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnIcon}>📚</Text>
          <Text style={styles.secondaryBtnText}>Kitaplar</Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM LEFT toolbar */}
      <View style={styles.bottomLeft}>
        <TouchableOpacity style={styles.toolbarBtn}>
          <Text style={styles.toolbarIcon}>🏪</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarBtn}>
          <Text style={styles.toolbarIcon}>⚙️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarBtn}>
          <Text style={styles.toolbarIcon}>📰</Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM RIGHT toolbar */}
      <View style={styles.bottomRight}>
        <TouchableOpacity style={styles.toolbarBtn}>
          <Text style={styles.toolbarIcon}>⭐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarBtn}>
          <Text style={styles.toolbarIcon}>🏆</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarBtn}>
          <Text style={styles.toolbarIcon}>📸</Text>
        </TouchableOpacity>
      </View>

      {/* Version */}
      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    // star background simulation
  },
  // Top Left
  topLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1565C0',
    borderWidth: 3,
    borderColor: '#42A5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: { fontSize: 26 },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FF6F00',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#fff',
  },
  levelText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  playerInfo: { justifyContent: 'center' },
  playerName: { color: '#fff', fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  xpBarBg: {
    width: 120,
    height: 8,
    backgroundColor: '#1565C0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpBarFill: { height: '100%', backgroundColor: '#42A5F5', borderRadius: 4 },
  xpLabel: { color: '#90CAF9', fontSize: 11, marginTop: 2 },

  // Top Right
  topRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  statIcon: { fontSize: 14 },
  statValue: { color: '#fff', fontWeight: 'bold', fontSize: 13 },

  // Center
  centerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ECC40',
    borderRadius: 14,
    paddingHorizontal: 36,
    paddingVertical: 18,
    gap: 10,
    elevation: 6,
    shadowColor: '#2ECC40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  playBtnIcon: { fontSize: 28 },
  playBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 22, letterSpacing: 2 },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
    elevation: 3,
  },
  secondaryBtnIcon: { fontSize: 20 },
  secondaryBtnText: { color: '#1a1a2e', fontWeight: '600', fontSize: 16 },

  // Bottom toolbars
  bottomLeft: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    gap: 8,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  toolbarBtn: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  toolbarIcon: { fontSize: 22 },

  version: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
  },
});
