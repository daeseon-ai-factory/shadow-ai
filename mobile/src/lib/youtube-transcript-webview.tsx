import { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import { extractYoutubeId, type TranscriptSegment } from '@shadow-ai/core';

export type DeviceTranscriptResult =
  | { ok: true; title?: string; segments: TranscriptSegment[] }
  | { ok: false; error: string };

interface Props {
  url: string;
  timeoutMs?: number;
  onResult: (result: DeviceTranscriptResult) => void;
}

export function YoutubeTranscriptWebView({ url, timeoutMs = 18000, onResult }: Props) {
  const finished = useRef(false);
  const onResultRef = useRef(onResult);
  const videoId = extractYoutubeId(url);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  const watchUrl = useMemo(() => {
    if (!videoId) return null;
    return `https://www.youtube.com/watch?v=${videoId}&bpctr=9999999999&has_verified=1`;
  }, [videoId]);

  const finish = useCallback((result: DeviceTranscriptResult) => {
    if (finished.current) return;
    finished.current = true;
    if (__DEV__) {
      console.info(
        result.ok
          ? `[youtube transcript] device success: ${result.segments.length} segments`
          : `[youtube transcript] device failed: ${result.error}`,
      );
    }
    onResultRef.current(result);
  }, []);

  useEffect(() => {
    finished.current = false;
    if (!videoId) {
      finish({ ok: false, error: 'invalid youtube url' });
      return;
    }
    const timer = setTimeout(() => {
      finish({ ok: false, error: 'device transcript timeout' });
    }, timeoutMs);
    return () => clearTimeout(timer);
  }, [finish, videoId, timeoutMs]);

  const injectedJavaScript = useMemo(
    () => `
      (function () {
        const post = (payload) => {
          window.ReactNativeWebView.postMessage(JSON.stringify(payload));
        };
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const decode = (value) => String(value || '')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
        const asPlayerResponse = () => {
          if (window.ytInitialPlayerResponse) return window.ytInitialPlayerResponse;
          const raw = window.ytplayer && window.ytplayer.config && window.ytplayer.config.args
            ? window.ytplayer.config.args.player_response
            : null;
          if (!raw) return null;
          try { return JSON.parse(raw); } catch (_) { return null; }
        };
        const pickTrack = (tracks) => {
          const enManual = tracks.find((t) => String(t.languageCode || '').toLowerCase().startsWith('en') && t.kind !== 'asr');
          const enAny = tracks.find((t) => String(t.languageCode || '').toLowerCase().startsWith('en'));
          return enManual || enAny || tracks[0];
        };
        const withJson3 = (baseUrl) => {
          const u = new URL(decode(baseUrl));
          u.searchParams.set('fmt', 'json3');
          return u.toString();
        };
        const parseJson3 = (root) => {
          const events = Array.isArray(root && root.events) ? root.events : [];
          const out = [];
          for (const event of events) {
            if (event && event.aAppend === 1) continue;
            const start = Number(event && event.tStartMs);
            const duration = Number(event && event.dDurationMs);
            if (!Number.isFinite(start) || !Number.isFinite(duration) || duration <= 0) continue;
            const segs = Array.isArray(event.segs) ? event.segs : [];
            const text = segs.map((s) => s && s.utf8 ? s.utf8 : '').join('').replace(/\\s+/g, ' ').trim();
            if (text) out.push({ startMs: start, endMs: start + duration, text });
          }
          return out;
        };
        const run = async () => {
          try {
            for (let i = 0; i < 80; i++) {
              const player = asPlayerResponse();
              const tracks = player &&
                player.captions &&
                player.captions.playerCaptionsTracklistRenderer &&
                player.captions.playerCaptionsTracklistRenderer.captionTracks;
              if (Array.isArray(tracks) && tracks.length > 0) {
                const track = pickTrack(tracks);
                const response = await fetch(withJson3(track.baseUrl), { credentials: 'include' });
                const body = await response.text();
                if (!body.trim()) throw new Error('empty caption response');
                const segments = parseJson3(JSON.parse(body));
                if (!segments.length) throw new Error('no caption segments');
                post({
                  type: 'success',
                  title: (player.videoDetails && player.videoDetails.title) || document.title.replace(/ - YouTube$/, ''),
                  segments
                });
                return;
              }
              await wait(250);
            }
            post({ type: 'error', error: 'caption tracks not found' });
          } catch (error) {
            post({ type: 'error', error: error && error.message ? error.message : String(error) });
          }
        };
        setTimeout(run, 500);
      })();
      true;
    `,
    [],
  );

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const payload = JSON.parse(event.nativeEvent.data);
      if (payload.type === 'success' && Array.isArray(payload.segments)) {
        finish({ ok: true, title: payload.title, segments: payload.segments });
        return;
      }
      finish({ ok: false, error: payload.error || 'device transcript failed' });
    } catch (error) {
      finish({ ok: false, error: error instanceof Error ? error.message : 'device transcript failed' });
    }
  };

  if (!watchUrl) return null;

  return (
    <View pointerEvents="none" style={styles.hidden}>
      <WebView
        source={{ uri: watchUrl }}
        originWhitelist={['https://*']}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        onMessage={handleMessage}
        onError={(event) => finish({ ok: false, error: event.nativeEvent.description })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0.01,
    overflow: 'hidden',
    left: -10,
    top: -10,
  },
});
