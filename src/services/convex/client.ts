import { ConvexReactClient } from 'convex/react';
import { convexConfig } from './config';

export const convexClient = convexConfig.url ? new ConvexReactClient(convexConfig.url) : null;
