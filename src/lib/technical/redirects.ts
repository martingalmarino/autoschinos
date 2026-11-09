export interface LegacyRedirect {
  source: string;
  destination: string;
  permanent: true;
}

/**
 * Rutas anteriores que deben seguir resolviendo si cambia marca o nombre.
 * El destino de ORA salta directo a la marca corregida.
 */
export const legacyRedirects: LegacyRedirect[] = [
  {
    source: '/marcas/haval/ora-3-\\(good-cat\\)',
    destination: '/marcas/ora/ora-3-good-cat',
    permanent: true,
  },
  {
    source: '/marcas/haval/ora-3-good-cat',
    destination: '/marcas/ora/ora-3-good-cat',
    permanent: true,
  },
  {
    source: '/marcas/changan/md201-cargo-van',
    destination: '/marcas/changan/m201-cargo-van',
    permanent: true,
  },
  {
    source: '/marcas/lifan/mamut',
    destination: '/marcas/kyc/mamut',
    permanent: true,
  },
  {
    source: '/test-catalog',
    destination: '/catalogo',
    permanent: true,
  },
  {
    source: '/guias',
    destination: '/blog',
    permanent: true,
  },
];
