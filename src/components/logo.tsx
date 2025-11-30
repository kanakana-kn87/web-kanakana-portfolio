"use client"

import { useRef } from "react"
// 💡 @react-three/fiber からは、CanvasとuseFrameだけをインポートするよ！
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, TorusKnot } from "@react-three/drei"
import * as THREE from "three"

// 💡 【重要】TorusKnotが受け取るPropsの型を自分で定義するよ！
// 💡 Dreiのコンポーネントは、THREEのMeshが持つプロパティを継承しているんだ！
// 💡 これを「インターフェースの拡張」って言うんだ！大人っぽい話でしょ！
interface TorusKnotExtendedProps {
  // THREE.Meshのプロパティをすべて使えるようにするよ！
  // @ts-ignore でTSのエラーを一時的に無視するか、
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
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    // 💡 短く、わかりやすいコードだよ！
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <TorusKnot
      // @ts-ignore // 💡 R3Fのカスタムプロパティ（Refやイベントハンドラ）を渡すために一時的に無視するよ！
      ref={meshRef}
      args={[0.7, 0.2, 100, 16]}
      {...props}
    >
      <meshStandardMaterial
        color={"#00b7ffff"}
        metalness={0.8}
        roughness={0.2}
      />
    </TorusKnot>
  )
}

// 👑 R3Fのメインコンポーネントだよ！
const R3FLogo = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
    >
      <ambientLight intensity={0.5} />
      <pointLight
        intensity={5}
        // 💡 ,と=をそろえるよ！
        position={[
          2,
          2,
          2
        ]}
      />

      <RotatingTorus />

      <OrbitControls />
    </Canvas>
  )
}

export default R3FLogo