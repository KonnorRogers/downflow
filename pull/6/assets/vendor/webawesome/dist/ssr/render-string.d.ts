import { type RenderInfo } from '@lit-labs/ssr';
/**
 * Takes a string and turns it into a lit template and removes the outer markers to make it able to SSR.
 */
export declare function renderString(html: string, renderInfo?: Partial<RenderInfo>): string;
