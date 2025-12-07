"use client";

import { useRef } from "react";

// 💡 @react-three/fiber からは、CanvasとuseFrameだけをインポートするよ！

import { Canvas, useFrame } from "@react-three/fiber";

import { OrbitControls, TorusKnot, Environment, Html } from "@react-three/drei";

import * as THREE from "three";

// 💡 【重要】TorusKnotが受け取るPropsの型を自分で定義するよ！

// 💡 Dreiのコンポーネントは、THREEのMeshが持つプロパティを継承しているんだ！

// 💡 これを「インターフェースの拡張」って言うんだ！大人っぽい話でしょ！

interface TorusKnotExtendedProps {
  // THREE.Meshのプロパティをすべて使えるようにするよ！

  // もっと正確には react-three/fiber から MeshProps のような型をインポートする必要があるけど、

  // それがエラーになったから、今回はシンプルにTorusKnot固有のPropsに絞って書くね！

  // TorusKnotの引数 (radius, tube, radialSegments, tubularSegments) の型だよ！

  args?: [number, number, number, number, number?];
}

// 🔄 回転アニメーションをする立体コンポーネントだよ！

// 💡 TorusKnotExtendedPropsを使うよ！これでエラーが出ないはず！

const RotatingTorus = (props: TorusKnotExtendedProps) => {
  // 🐫 変数名はcamelCase！メッシュ（立体）の参照を持つよ！

  // 💡 refの型はTHREE.Meshだよ！型ヒントバッチリ！

  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // 💡 短く、わかりやすいコードだよ！

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;

      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <TorusKnot ref={meshRef} args={[0.7, 0.2, 100, 16]} {...props}>
      <meshStandardMaterial
      color={"#00d9ffff"}
        metalness={1.0}
        roughness={0}
      />
    </TorusKnot>
  );
};

// 👑 R3Fのメインコンポーネントだよ！

const R3FLogo = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping, // これも色をリッチにする大人な設定だよ！// ✨ これを追加するよ！露出を調整して、色が飛びすぎないようにするんだ！
        toneMappingExposure: 1.0, // 1.0が標準だけど、必要なら0.8とかに下げてみよう！
      }}>
      <ambientLight intensity={0.5} />
      <pointLight
        intensity={7}
        // 💡 ,と=をそろえるよ！

        position={[
          2,
          2,
          3,
        ]}
      />

      <RotatingTorus />

      <OrbitControls />
      <Environment preset="night" background={false} />
    </Canvas>
  );
};

export default R3FLogo;