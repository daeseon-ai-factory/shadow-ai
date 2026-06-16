import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SpokenCheck } from '@/components/spoken-check';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

// 60-second explanation topics — the bridge from short drilled sentences to sustained speech.
// Speak for ~a minute, chaining the drilled chunks with connectors; the AI check judges only
// whether the core is understandable and logically connected (lenient, no nitpicking).
const TOPICS: { en: string; ko: string }[] = [
  { en: 'Explain idempotency and why it matters for payment APIs', ko: '멱등성과 결제 API에서 중요한 이유' },
  { en: 'Explain optimistic vs pessimistic locking and when you pick each', ko: '낙관적 vs 비관적 락, 각각 언제 쓰나' },
  { en: 'Explain the N+1 query problem and how you fix it', ko: 'N+1 쿼리 문제와 해결법' },
  { en: 'Explain cache-aside and what can go stale', ko: '캐시 어사이드 패턴과 신선도 문제' },
  { en: 'Explain a circuit breaker and what failure it prevents', ko: '서킷 브레이커가 막아주는 장애' },
  { en: 'Explain debounce vs throttle with a UI example', ko: '디바운스 vs 스로틀 (UI 예시로)' },
  { en: 'Explain how a HashMap works under the hood', ko: 'HashMap 내부 동작' },
  { en: 'Explain retries with exponential backoff and why jitter helps', ko: '지수 백오프 재시도와 지터' },
  { en: 'Explain a dead-letter queue and what you do with it', ko: '데드레터 큐와 그 처리' },
  { en: 'Explain database transactions and ACID in plain words', ko: '트랜잭션과 ACID를 쉬운 말로' },
  { en: 'Explain why an index speeds up reads but slows down writes', ko: '인덱스가 읽기를 빠르게, 쓰기를 느리게 하는 이유' },
  { en: 'Explain an LRU cache and where you would use one', ko: 'LRU 캐시와 사용처' },
  { en: 'Explain BFS vs DFS and when you pick each', ko: 'BFS vs DFS, 언제 뭘 쓰나' },
  { en: 'Explain eventual consistency with a real example', ko: '최종 일관성 (실제 예시로)' },
  { en: 'Explain sharding and how you pick a shard key', ko: '샤딩과 샤드 키 선택' },
  { en: 'Explain what a load balancer does and one routing strategy', ko: '로드밸런서 역할과 라우팅 전략 하나' },
  { en: 'Explain optimistic UI updates and the rollback case', ko: '낙관적 UI 업데이트와 롤백' },
  { en: 'Explain event bubbling and when you stop propagation', ko: '이벤트 버블링과 전파 중단 시점' },
  { en: 'Explain cursor pagination and why offset breaks at scale', ko: '커서 페이지네이션, 오프셋이 깨지는 이유' },
  { en: 'Explain rate limiting and the token bucket idea', ko: '레이트 리밋과 토큰 버킷' },
  { en: 'Walk through how you would debug a sudden latency spike', ko: '갑작스런 지연 급증 디버깅 순서' },
  { en: 'Explain the tradeoffs of microservices vs a monolith', ko: '마이크로서비스 vs 모놀리스 트레이드오프' },
];

const SECONDS = 60;

export default function SpeechRunScreen() {
  const token = useAuthStore((s) => s.token);
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * TOPICS.length));
  const [timeLeft, setTimeLeft] = useState(SECONDS);

  const topic = TOPICS[idx];
  const question = useMemo(
    () =>
      `The learner was asked to explain, speaking for about 60 seconds: "${topic.en}". ` +
      'Judge ONLY whether the core explanation is understandable and logically connected. ' +
      'Ignore transcription noise and minor grammar. Praise good use of connectors.',
    [topic],
  );

  useEffect(() => {
    setTimeLeft(SECONDS);
    const id = setInterval(() => setTimeLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, [idx]);

  if (!token) return <Redirect href="/login" />;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.header}>
          <Pressable hitSlop={12} onPress={() => router.back()}>
            <ThemedText style={styles.exit}>‹ {t('iv.exit')}</ThemedText>
          </Pressable>
          <ThemedText type="small" style={timeLeft <= 10 ? styles.timerHot : styles.timer}>
            ⏱ {timeLeft}s
          </ThemedText>
        </View>
        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          <ThemedText type="small" style={styles.tag}>{t('speech.topic')}</ThemedText>
          <View style={styles.topicBox}>
            <ThemedText style={styles.topicEn}>{topic.en}</ThemedText>
            <ThemedText type="small" style={styles.topicKo}>{topic.ko}</ThemedText>
          </View>
          <ThemedText type="small" style={styles.hint}>{t('speech.hint')}</ThemedText>
          <SpokenCheck question={question} />
          <Pressable
            style={styles.nextBtn}
            onPress={() => setIdx((i) => (i + 1 + Math.floor(Math.random() * (TOPICS.length - 1))) % TOPICS.length)}
          >
            <ThemedText style={styles.nextText}>{t('speech.next')}</ThemedText>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#9ca3af55',
  },
  exit: { color: '#208AEF', fontWeight: '700', fontSize: 16 },
  timer: { color: '#208AEF', fontWeight: '700' },
  timerHot: { color: '#dc2626', fontWeight: '700' },
  body: { padding: 20, gap: 14, paddingBottom: 40 },
  tag: { textTransform: 'uppercase', letterSpacing: 1, opacity: 0.6 },
  topicBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 18,
    gap: 6,
  },
  topicEn: { fontSize: 19, lineHeight: 27, fontWeight: '600' },
  topicKo: { color: '#6b7280' },
  hint: { textAlign: 'center', opacity: 0.7 },
  nextBtn: { borderWidth: 1, borderColor: '#9ca3af', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  nextText: { fontWeight: '600' },
});
