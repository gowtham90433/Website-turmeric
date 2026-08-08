import { Suspense, lazy } from 'react';
import LazyMount from '../shared/LazyMount';

const InteractiveRootScene = lazy(() => import('./InteractiveRootScene'));

export default function InteractiveRoot({ reduceMotion = false }) {
  return (
    <div className="interactive-root">
      <LazyMount style={{ width: '100%', height: '100%' }} placeholder={<div className="interactive-root-fallback" />}>
        <Suspense fallback={<div className="interactive-root-fallback" />}>
          <InteractiveRootScene reduceMotion={reduceMotion} />
        </Suspense>
      </LazyMount>
      <span className="interactive-root-hint">Drag to rotate</span>
    </div>
  );
}
