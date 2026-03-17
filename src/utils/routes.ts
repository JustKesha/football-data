import { matchPath } from 'react-router-dom';

export enum PageType {
  COMPETITIONS = 'competitions',
  TEAMS = 'teams',
}

export const routes = [
  { path: '/', type: PageType.COMPETITIONS },
  { path: '/competitions', type: PageType.COMPETITIONS },
  { path: '/competition/:id', type: PageType.COMPETITIONS },
  { path: '/teams', type: PageType.TEAMS },
  { path: '/team/:id', type: PageType.TEAMS }
] as const;

export function getPageType(pathname: string): PageType {
  for (const route of routes)
    if (matchPath({ path: route.path }, pathname))
      return route.type;
  return PageType.COMPETITIONS;
}