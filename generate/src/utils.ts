import path from 'path';

export const padLeft0 = (n: number) => n.toString().padStart(2, '0');

export const formatDate = (d: Date) =>
  `${d.getFullYear()}-${padLeft0(d.getMonth() + 1)}-${padLeft0(d.getDate())}`;

export const fromRoot = (...paths: string[]) =>
  path.join(__dirname, '..', '..', ...paths);
