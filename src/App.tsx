import { useCallback, useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import Presentation from '@/components/Presentation';
import MockupPresentation from '@/components/MockupPresentation';
import BackToDashboardButton from '@/components/BackToDashboardButton';
import { CHAPTERS, findChapter } from '@/chapters/registry';

type View =
  | { kind: 'dashboard' }
  | { kind: 'chapter'; id: string };

const HOME = '#/';

function readView(): View {
  const hash = window.location.hash || HOME;
  const match = /^#\/(cap-\d+)$/.exec(hash);
  if (match && findChapter(match[1]!)) {
    return { kind: 'chapter', id: match[1]! };
  }
  return { kind: 'dashboard' };
}

export default function App() {
  const [view, setView] = useState<View>(() => readView());

  useEffect(() => {
    const onHash = () => setView(readView());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goChapter = useCallback((id: string) => {
    window.location.hash = `#/${id}`;
  }, []);

  const goDashboard = useCallback(() => {
    window.location.hash = HOME;
  }, []);

  if (view.kind === 'dashboard') {
    return <Dashboard onSelect={goChapter} />;
  }

  const chapter = findChapter(view.id) ?? CHAPTERS[0]!;
  const isMockup = chapter.status === 'mockup';

  return (
    <>
      <BackToDashboardButton onClick={goDashboard} />
      {!isMockup ? (
        <Presentation onExit={goDashboard} />
      ) : (
        <MockupView chapter={chapter} onExit={goDashboard} />
      )}
    </>
  );
}

function MockupView({
  chapter,
  onExit,
}: {
  chapter: ReturnType<typeof findChapter>;
  onExit: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onExit();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onExit]);

  if (!chapter) return null;
  return <MockupPresentation chapter={chapter} />;
}
