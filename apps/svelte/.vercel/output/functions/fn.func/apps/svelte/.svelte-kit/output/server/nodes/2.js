import * as server from '../entries/pages/(home)/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(home)/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(home)/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.D79BUhy6.js","_app/immutable/chunks/disclose-version.DANBn3SQ.js","_app/immutable/chunks/runtime.C97gWRuW.js","_app/immutable/chunks/index-client.blzTf6RA.js","_app/immutable/chunks/schedule-page.BTa8P3jb.js","_app/immutable/chunks/render.DlOsY0DN.js","_app/immutable/chunks/lifecycle.Dnzq6qZw.js","_app/immutable/chunks/sidebar.svelte.D6NWMZe9.js","_app/immutable/chunks/store.Cnqx_hBi.js","_app/immutable/chunks/index.D9r7NAxa.js"];
export const stylesheets = ["_app/immutable/assets/schedule-page.CLPMtJkr.css"];
export const fonts = [];
