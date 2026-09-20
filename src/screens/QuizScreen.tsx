import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CATEGORIES } from '../data/categories';
import { gameStore } from '../store/gameStore';

const { width: W } = Dimensions.get('window');
const QUESTION_TIME = 20; // seconds per question

const OPTION_COLORS = ['#1565C0', '#6A1B9A', '#1B5E20', '#BF360C'];
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { categoryId } = route.params;

  const category = CATEGORIES.find(c => c.id === categoryId)!;
  const questions = category.questions;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shake] = useState(new Animated.Value(0));

  const question = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;

  // Timer
  useEffect(() => {
    if (isAnswered) return;
    if (timeLeft <= 0) {
      handleAnswer(-1); // timeout = wrong
      return;
    }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, isAnswered]);

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(QUESTION_TIME);
    setSelected(null);
    setIsAnswered(false);
  }, [currentIdx]);

  const handleAnswer = useCallback((optionIdx: number) => {
    if (isAnswered) return;
    setSelected(optionIdx);
    setIsAnswered(true);

    const correct = optionIdx === question.correctIndex;
    if (correct) {
      setScore(s => s + 1);
    } else {
      gameStore.loseLife();
      // Shake animation
      Animated.sequence([
        Animated.timing(shake, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }

    setTimeout(() => {
      if (isLast) {
        const finalScore = correct ? score + 1 : score;
        gameStore.addScore(categoryId, finalScore);
        // Unlock next category if score >= 3
        if (finalScore >= 3) {
          const nextIdx = CATEGORIES.findIndex(c => c.id === categoryId) + 1;
          if (nextIdx < CATEGORIES.length) {
            gameStore.unlockCategory(CATEGORIES[nextIdx].id);
          }
        }
        navigation.navigate('Result', { score: finalScore, total: questions.length, categoryId });
      } else {
        setCurrentIdx(i => i + 1);
      }
    }, 1200);
  }, [isAnswered, question, isLast, score, categoryId]);

  const timerColor = timeLeft > 10 ? '#4CAF50' : timeLeft > 5 ? '#FF9800' : '#F44336';
  const timerWidth = `${(timeLeft / QUESTION_TIME) * 100}%`;

  const getOptionStyle = (idx: number) => {
    if (!isAnswered) return [styles.option, { backgroundColor: OPTION_COLORS[idx] }];
    if (idx === question.correctIndex) return [styles.option, styles.optionCorrect];
    if (idx === selected) return [styles.option, styles.optionWrong];
    return [styles.option, { backgroundColor: OPTION_COLORS[idx], opacity: 0.4 }];
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.exitBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.exitBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.categoryName}>{category.icon} {category.name}</Text>
        <View style={styles.scoreChip}>
          <Text style={styles.scoreChipText}>✅ {score}/{questions.length}</Text>
        </View>
      </View>

      {/* Timer bar */}
      <View style={styles.timerBg}>
        <Animated.View
          style={[
            styles.timerFill,
            { width: timerWidth as any, backgroundColor: timerColor },
          ]}
        />
        <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}s</Text>
      </View>

      {/* Question number */}
      <Text style={styles.questionCount}>
        Soru {currentIdx + 1} / {questions.length}
      </Text>

      {/* Question */}
      <Animated.View style={[styles.questionBox, { transform: [{ translateX: shake }] }]}>
        <Text style={styles.questionText}>{question.question}</Text>
      </Animated.View>

      {/* Options — 2x2 grid */}
      <View style={styles.optionsGrid}>
        {question.options.map((opt, idx) => (
          <TouchableOpacity
            key={idx}
            style={getOptionStyle(idx)}
            onPress={() => handleAnswer(idx)}
            disabled={isAnswered}>
            <View style={styles.optionLetter}>
              <Text style={styles.optionLetterText}>{OPTION_LETTERS[idx]}</Text>
            </View>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d47a1',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  exitBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#5c6bc0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  categoryName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  scoreChip: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  scoreChipText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // Timer
  timerBg: {
    height: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 9,
    overflow: 'hidden',
    marginBottom: 8,
    justifyContent: 'center',
  },
  timerFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 9,
  },
  timerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },

  questionCount: {
    color: '#90CAF9',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },

  // Question
  questionBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    minHeight: 80,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  questionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 26,
  },

  // Options 2x2
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  option: {
    width: (W - 52) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
    elevation: 4,
  },
  optionCorrect: {
    backgroundColor: '#2E7D32',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  optionWrong: {
    backgroundColor: '#B71C1C',
    borderWidth: 2,
    borderColor: '#F44336',
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLetterText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  optionText: { color: '#fff', fontSize: 14, fontWeight: '600', flex: 1 },
});
