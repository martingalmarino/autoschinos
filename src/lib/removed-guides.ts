/** Las notas de /guias se retiraron. La sección /guias redirige a /blog; el detalle no. */
export function isRemovedGuidePath(pathname: string): boolean {
  return pathname.startsWith('/guias/') && pathname.length > '/guias/'.length;
}
