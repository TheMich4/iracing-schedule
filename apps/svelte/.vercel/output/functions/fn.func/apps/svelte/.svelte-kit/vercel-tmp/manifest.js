export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CK8WbDaC.js","app":"_app/immutable/entry/app.DwHsSzPA.js","imports":["_app/immutable/entry/start.CK8WbDaC.js","_app/immutable/chunks/entry.C6HxNRAM.js","_app/immutable/chunks/runtime.C97gWRuW.js","_app/immutable/chunks/index.D9r7NAxa.js","_app/immutable/entry/app.DwHsSzPA.js","_app/immutable/chunks/index-client.blzTf6RA.js","_app/immutable/chunks/runtime.C97gWRuW.js","_app/immutable/chunks/disclose-version.DANBn3SQ.js","_app/immutable/chunks/render.DlOsY0DN.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js'))
		],
		routes: [
			{
				id: "/(home)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/session/column",
				pattern: /^\/api\/session\/column\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/session/column/_server.ts.js'))
			},
			{
				id: "/api/session/favorite",
				pattern: /^\/api\/session\/favorite\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/session/favorite/_server.ts.js'))
			},
			{
				id: "/(pages)/(assets)/cars",
				pattern: /^\/cars\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(pages)/category/[category]",
				pattern: /^\/category\/([^/]+?)\/?$/,
				params: [{"name":"category","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(pages)/favorite",
				pattern: /^\/favorite\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(pages)/(assets)/series",
				pattern: /^\/series\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(pages)/(assets)/tracks",
				pattern: /^\/tracks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
