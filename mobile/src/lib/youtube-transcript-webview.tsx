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
        const VIDEO_ID = ${JSON.stringify(videoId)};
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
          const ytcfgData = window.ytcfg && window.ytcfg.data_ ? window.ytcfg.data_ : null;
          const embedded = ytcfgData && ytcfgData.PLAYER_VARS ? ytcfgData.PLAYER_VARS.embedded_player_response : null;
          if (embedded) {
            try { return typeof embedded === 'string' ? JSON.parse(embedded) : embedded; } catch (_) {}
          }
          const raw = window.ytplayer && window.ytplayer.config && window.ytplayer.config.args
            ? window.ytplayer.config.args.player_response
            : null;
          if (raw) {
            try { return typeof raw === 'string' ? JSON.parse(raw) : raw; } catch (_) {}
          }
          const scripts = Array.from(document.scripts || []).map((s) => s.textContent || '').join('\\n');
          const marker = 'ytInitialPlayerResponse';
          const markerIndex = scripts.indexOf(marker);
          if (markerIndex < 0) return null;
          const firstBrace = scripts.indexOf('{', markerIndex);
          if (firstBrace < 0) return null;
          let depth = 0;
          let inString = false;
          let escaped = false;
          for (let i = firstBrace; i < scripts.length; i++) {
            const ch = scripts[i];
            if (escaped) {
              escaped = false;
              continue;
            }
            if (ch === '\\\\') {
              escaped = true;
              continue;
            }
            if (ch === '"') inString = !inString;
            if (inString) continue;
            if (ch === '{') depth++;
            if (ch === '}') depth--;
            if (depth === 0) {
              try { return JSON.parse(scripts.slice(firstBrace, i + 1)); } catch (_) { return null; }
            }
          }
          return null;
        };
        const tracklistOf = (player) => player &&
          player.captions &&
          player.captions.playerCaptionsTracklistRenderer &&
          player.captions.playerCaptionsTracklistRenderer.captionTracks;
        const pickTrack = (tracks) => {
          const enManual = tracks.find((t) => String(t.languageCode || '').toLowerCase().startsWith('en') && t.kind !== 'asr');
          const enAny = tracks.find((t) => String(t.languageCode || '').toLowerCase().startsWith('en'));
          return enManual || enAny || tracks[0];
        };
        const timedTextUrls = (baseUrl) => {
          const source = new URL(decode(baseUrl), 'https://www.youtube.com');
          return ['json3', 'srv3', 'vtt', ''].map((fmt) => {
            const u = new URL(source.toString());
            if (fmt) u.searchParams.set('fmt', fmt);
            return { fmt: fmt || 'raw', url: u.toString() };
          });
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
        const parseTimedTextXml = (xmlText) => {
          const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
          const legacy = Array.from(doc.getElementsByTagName('text')).map((node) => {
            const start = Math.round(Number(node.getAttribute('start') || 0) * 1000);
            const duration = Math.round(Number(node.getAttribute('dur') || 0) * 1000);
            const text = decode(node.textContent || '').replace(/\\s+/g, ' ').trim();
            return { startMs: start, endMs: start + duration, text };
          }).filter((seg) => seg.text && seg.endMs > seg.startMs);
          if (legacy.length) return legacy;
          return Array.from(doc.getElementsByTagName('p')).map((node) => {
            const start = Number(node.getAttribute('t'));
            const duration = Number(node.getAttribute('d'));
            const text = decode(node.textContent || '').replace(/\\s+/g, ' ').trim();
            return { startMs: start, endMs: start + duration, text };
          }).filter((seg) => Number.isFinite(seg.startMs) && seg.text && seg.endMs > seg.startMs);
        };
        const parseVttTime = (value) => {
          const parts = String(value || '').trim().split(':');
          if (parts.length < 2) return NaN;
          const seconds = Number(parts.pop().replace(',', '.'));
          const minutes = Number(parts.pop());
          const hours = parts.length ? Number(parts.pop()) : 0;
          return Math.round(((hours * 60 * 60) + (minutes * 60) + seconds) * 1000);
        };
        const parseVtt = (vttText) => {
          const blocks = String(vttText || '').split(/\\n\\s*\\n/g);
          const out = [];
          for (const block of blocks) {
            const lines = block.split(/\\r?\\n/).map((line) => line.trim()).filter(Boolean);
            const cue = lines.findIndex((line) => line.includes('-->'));
            if (cue < 0) continue;
            const [startRaw, endRaw] = lines[cue].split('-->').map((part) => part.trim().split(/\\s+/)[0]);
            const start = parseVttTime(startRaw);
            const end = parseVttTime(endRaw);
            const text = lines.slice(cue + 1).join(' ').replace(/<[^>]+>/g, '').replace(/\\s+/g, ' ').trim();
            if (Number.isFinite(start) && Number.isFinite(end) && end > start && text) {
              out.push({ startMs: start, endMs: end, text: decode(text) });
            }
          }
          return out;
        };
        const parseCaptionBody = (body) => {
          const trimmed = body.trim();
          if (!trimmed) return [];
          if (trimmed.startsWith('{')) return parseJson3(JSON.parse(trimmed));
          if (/^WEBVTT/i.test(trimmed)) return parseVtt(trimmed);
          return parseTimedTextXml(trimmed);
        };
        const tryTracks = async (tracks) => {
          const track = pickTrack(tracks);
          const attempts = [];
          for (const attempt of timedTextUrls(track.baseUrl)) {
            const response = await fetch(attempt.url, { credentials: 'include', cache: 'no-store' });
            const body = await response.text();
            attempts.push(attempt.fmt + ':' + response.status + ':' + body.length);
            const segments = parseCaptionBody(body);
            if (segments.length) return { segments, attempts };
          }
          return { segments: [], attempts };
        };
        const cfg = (key) => {
          try {
            if (window.ytcfg && typeof window.ytcfg.get === 'function') return window.ytcfg.get(key);
            return window.ytcfg && window.ytcfg.data_ ? window.ytcfg.data_[key] : undefined;
          } catch (_) {
            return undefined;
          }
        };
        const innertubePlayers = async () => {
          const apiKey = cfg('INNERTUBE_API_KEY');
          if (!apiKey) return [];
          const visitorData = cfg('VISITOR_DATA');
          const url = 'https://www.youtube.com/youtubei/v1/player?key=' + encodeURIComponent(apiKey);
          const clients = [
            {
              clientName: 'ANDROID_VR',
              clientVersion: '1.65.10',
              deviceMake: 'Oculus',
              deviceModel: 'Quest 3',
              androidSdkVersion: 32,
              userAgent: 'com.google.android.apps.youtube.vr.oculus/1.65.10 (Linux; U; Android 12L; eureka-user Build/SQ3A.220605.009.A1) gzip',
              osName: 'Android',
              osVersion: '12L',
            },
            {
              clientName: 'ANDROID',
              clientVersion: '21.02.35',
              androidSdkVersion: 30,
              userAgent: 'com.google.android.youtube/21.02.35 (Linux; U; Android 11) gzip',
              osName: 'Android',
              osVersion: '11',
            },
            {
              clientName: 'IOS',
              clientVersion: '21.02.3',
              deviceMake: 'Apple',
              deviceModel: 'iPhone16,2',
              userAgent: 'com.google.ios.youtube/21.02.3 (iPhone16,2; U; CPU iOS 18_3_2 like Mac OS X;)',
              osName: 'iPhone',
              osVersion: '18.3.2.22D82',
            },
            {
              clientName: 'MWEB',
              clientVersion: '2.20260115.01.00',
              userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_7_10 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1,gzip(gfe)',
            },
            { clientName: 'WEB', clientVersion: cfg('INNERTUBE_CONTEXT_CLIENT_VERSION') || '2.20260114.08.00' },
          ];
          const out = [];
          for (const client of clients) {
            try {
              const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                  context: { client: { ...client, hl: 'en', gl: 'US', visitorData } },
                  videoId: VIDEO_ID,
                  contentCheckOk: true,
                  racyCheckOk: true,
                }),
              });
              const json = await response.json();
              json.__clientName = client.clientName;
              json.__status = response.status;
              out.push(json);
            } catch (error) {
              out.push({
                __clientName: client.clientName,
                __error: error && error.message ? error.message : String(error),
              });
            }
          }
          return out;
        };
        const run = async () => {
          try {
            let lastAttempts = [];
            let title = '';
            for (let i = 0; i < 80; i++) {
              const player = asPlayerResponse();
              const tracks = tracklistOf(player);
              if (Array.isArray(tracks) && tracks.length > 0) {
                title = (player.videoDetails && player.videoDetails.title) || document.title.replace(/ - YouTube$/, '');
                const result = await tryTracks(tracks);
                lastAttempts = result.attempts.map((item) => 'page/' + item);
                if (result.segments.length) {
                  post({ type: 'success', title, segments: result.segments });
                  return;
                }
                break;
              }
              await wait(250);
            }
            const apiPlayers = await innertubePlayers();
            for (const apiPlayer of apiPlayers) {
              const tracks = tracklistOf(apiPlayer);
              if (!Array.isArray(tracks) || tracks.length === 0) {
                const reason = apiPlayer.__error ||
                  (apiPlayer.playabilityStatus && apiPlayer.playabilityStatus.status) ||
                  ('tracks:' + (Array.isArray(tracks) ? tracks.length : 0));
                lastAttempts.push((apiPlayer.__clientName || 'api') + '/player:' + (apiPlayer.__status || 'x') + ':' + reason);
                continue;
              }
              title = (apiPlayer.videoDetails && apiPlayer.videoDetails.title) || title || document.title.replace(/ - YouTube$/, '');
              const result = await tryTracks(tracks);
              lastAttempts = lastAttempts.concat(result.attempts.map((item) => (apiPlayer.__clientName || 'api') + '/' + item));
              if (result.segments.length) {
                post({ type: 'success', title, segments: result.segments });
                return;
              }
            }
            const text = document.body ? document.body.innerText || '' : '';
            if (/sign in to confirm|not a bot|unusual traffic/i.test(text)) {
              post({ type: 'error', error: 'youtube bot/sign-in gate in device webview' });
              return;
            }
            if (lastAttempts.length) {
              post({ type: 'error', error: 'empty caption response (' + lastAttempts.join(', ') + ')' });
              return;
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
    [videoId],
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
