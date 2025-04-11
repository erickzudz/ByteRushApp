// components/PreloadAssets.tsx
import React from 'react';
import { Image } from 'react-native';

export default function PreloadAssets() {
  const assets = [
    require('../assets/imagenes/fondo.png'),
    require('../assets/imagenes/logo.png'),
  ];

  return (
    <>
      {assets.map((asset, i) => (
        <Image key={i} source={asset} style={{ display: 'none' }} />
      ))}
    </>
  );
}
