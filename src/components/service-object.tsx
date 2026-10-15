import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js';

/** Clone cached GLBs before styling; normalize their complete bounds, not an arbitrary axis. */
export function ServiceObject({ url, color, light, shadow, natural = false }: { url: string; color: string; light: string; shadow: string; natural?: boolean }) {
  const { scene } = useGLTF(url, false);
  const object = useMemo(() => {
    const clone = cloneSkeleton(scene);
    clone.traverse(node => {
      if (!(node instanceof THREE.Mesh)) return;
      const restyle = (original: THREE.Material) => {
        if (natural) {
          const material = original.clone();
          if (material instanceof THREE.MeshStandardMaterial) { material.metalness = 0; material.roughness = .75; material.envMapIntensity = .55; }
          return material;
        }
        const source = original instanceof THREE.MeshStandardMaterial ? original : null;
        const luminance = source ? (source.color.r + source.color.g + source.color.b) / 3 : .5;
        const material = new THREE.MeshPhysicalMaterial({
          color: original.name === 'metalDark' ? shadow : luminance < .12 ? shadow : luminance > .8 ? light : color,
          metalness: luminance < .12 ? .35 : .58,
          roughness: .29, clearcoat: 1, clearcoatRoughness: .2,
          envMapIntensity: 1.1, side: THREE.DoubleSide,
          map: source?.map ?? null,
        });
        if (source?.map) material.color.set(light);
        return material;
      };
      node.material = Array.isArray(node.material) ? node.material.map(restyle) : restyle(node.material);
    });
    clone.updateWorldMatrix(true, true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const dimensions = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 3 / Math.max(dimensions.x, dimensions.y, dimensions.z, .001);
    const wrapper = new THREE.Group();
    clone.position.sub(center);
    wrapper.add(clone); wrapper.scale.setScalar(scale);
    return wrapper;
  }, [scene, color, light, shadow, natural]);
  useEffect(() => () => object.traverse(node => {
    if (node instanceof THREE.Mesh) {
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach(material => material.dispose());
    }
  }), [object]);
  return <primitive object={object} />;
}