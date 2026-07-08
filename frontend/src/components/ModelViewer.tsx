import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  scale?: number;
}

function Model({ url, autoRotate = true, autoRotateSpeed = 0.3, scale = 1 }: ModelProps) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current && autoRotate) {
      ref.current.rotation.y += autoRotateSpeed * 0.01;
    }
  });

  return (
    <group ref={ref} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    // Subtle mouse parallax
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 0.3 + 2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface ModelViewerProps {
  url: string;
  width?: string | number;
  height?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  defaultZoom?: number;
  minZoomDistance?: number;
  maxZoomDistance?: number;
  environmentPreset?: 'city' | 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'park' | 'lobby' | 'none';
  enableMouseParallax?: boolean;
  fadeIn?: boolean;
  showScreenshotButton?: boolean;
  className?: string;
}

export default function ModelViewer({
  url,
  width = '100%',
  height = 400,
  autoRotate = true,
  autoRotateSpeed = 0.4,
  defaultZoom = 2,
  minZoomDistance = 1,
  maxZoomDistance = 5,
  environmentPreset = 'city',
  enableMouseParallax = false,
  className = '',
}: ModelViewerProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <Canvas
        shadows
        camera={{ position: [3, 2, defaultZoom * 2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1} castShadow color="#fff5e6" />
        <directionalLight position={[-3, 4, -5]} intensity={0.3} color="#88aaff" />

        <Suspense fallback={null}>
          <Model url={url} autoRotate={autoRotate} autoRotateSpeed={autoRotateSpeed} />
          {environmentPreset !== 'none' && <Environment preset={environmentPreset} />}
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} />
        </Suspense>

        {enableMouseParallax && <CameraRig />}

        <OrbitControls
          enablePan={false}
          minDistance={minZoomDistance}
          maxDistance={maxZoomDistance}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Loading fallback */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity">
        <div className="w-10 h-10 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
      </div>
    </div>
  );
}
