var wt=Array.isArray,$t=Array.from,Qt=Object.assign,Jt=Object.isFrozen,tn=Object.defineProperty,nn=Object.getOwnPropertyDescriptor,gt=Object.getOwnPropertyDescriptors,en=Object.prototype,rn=Array.prototype,kt=Object.getPrototypeOf,st=Map.prototype,Ct=st.set,Dt=st.get;function sn(t,n,e){Ct.call(t,n,e)}function on(t,n){return Dt.call(t,n)}function un(t){return typeof t=="function"}const P=2,j=4,I=8,ot=16,T=32,X=64,w=128,y=256,m=512,D=1024,x=2048,F=4096,xt=8192,ut=16384,tt=Symbol("$state");function lt(t){return t===this.v}function Ft(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function it(t){return!Ft(t,this.v)}const ln=1,fn=2,an=4,cn=8,_n=16,pn=64,vn=1,En=2,dn=4,hn=8,Tn=1,yn=2,mn=4,An=1,Rn=2,On="[",Lt="]",Sn=`${Lt}!`,Pt=Symbol(),Nn=["beforeinput","click","dblclick","contextmenu","focusin","focusout","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"],In=["touchstart","touchmove","touchend"],wn={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"},gn="http://www.w3.org/2000/svg";function ft(t){return{f:0,reactions:null,equals:lt,v:t,version:0}}function kn(t){const n=ft(t);return n.equals=it,a&&(a.d??(a.d=[])).push(n),n}function Mt(t,n){var e=t.v!==Pt;if(!O&&e&&v!==null&&W()&&v.f&P)throw new Error("ERR_SVELTE_UNSAFE_MUTATION");return t.equals(n)||(t.v=n,t.version++,W()&&e&&f!==null&&f.f&y&&!(f.f&T)&&(_!==null&&_.includes(t)?(h(f,m),B(f)):R===null?Kt([t]):R.push(t)),J(t,m,!0)),n}function Cn(t){var n=document.createElement("template");return n.innerHTML=t,n.content}function bt(t){if(wt(t))for(var n=0;n<t.length;n++){var e=t[n];e.isConnected&&e.remove()}else t.isConnected&&t.remove()}function qt(t,n){var e=n.last;e===null?n.last=n.first=t:(e.next=t,t.prev=e,n.last=t)}function M(t,n,e){var r=(t&X)!==0,s={ctx:a,deps:null,dom:null,f:t|m,first:null,fn:n,last:null,next:null,parent:r?null:f,prev:null,teardown:null,transitions:null};if(v!==null&&!r&&qt(s,v),e){var o=C;try{nt(!0),b(s),s.f|=xt}finally{nt(o)}}else B(s);return s}function Dn(t){if(f===null)throw new Error("ERR_SVELTE_ORPHAN_EFFECT");if(Y)throw new Error("ERR_SVELTE_EFFECT_IN_TEARDOWN");if(f.f&I&&a!==null&&!a.m){const e=a;(e.e??(e.e=[])).push(t)}else at(t)}function xn(t){if(f===null)throw new Error("ERR_SVELTE_ORPHAN_EFFECT");if(Y)throw new Error("ERR_SVELTE_EFFECT_IN_TEARDOWN");return Z(t)}function Fn(t){const n=M(X,t,!0);return()=>{$(n)}}function at(t){return M(j,t,!1)}function Ln(t,n){var e=a,r={effect:null,ran:!1};e.l1.push(r),r.effect=Z(()=>{t(),!r.ran&&(r.ran=!0,Mt(e.l2,!0),Wt(n))})}function Pn(){var t=a;Z(()=>{if(Nt(t.l2)){for(var n of t.l1){var e=n.effect;L(e)&&b(e),n.ran=!1}t.l2.v=!1}})}function Z(t){return M(I,t,!0)}function Mn(t){return M(I|ot,t,!0)}function bn(t){return M(I|T,t,!0)}function ct(t){var n=t.teardown;if(n!==null){const e=Y;et(!0);try{n.call(null)}finally{et(e)}}}function $(t){var n=t.dom;if(n!==null&&bt(n),Q(t),V(t,0),h(t,F),t.transitions)for(const o of t.transitions)o.stop();ct(t);var e=t.parent;if(e!==null&&t.f&T&&e.first!==null){var r=t.prev,s=t.next;r!==null?s!==null?(r.next=s,s.prev=r):(r.next=null,e.last=r):s!==null?(s.prev=null,e.first=s):(e.first=null,e.last=null)}t.next=t.prev=t.teardown=t.ctx=t.dom=t.deps=t.parent=t.fn=null}function qn(t,n){var e=[];_t(t,e,!0),jt(e,()=>{$(t),n&&n()})}function jt(t,n){var e=t.length;if(e>0){var r=()=>--e||n();for(var s of t)s.out(r)}else n()}function _t(t,n,e){if(!(t.f&x)){if(t.f^=x,t.transitions!==null)for(const l of t.transitions)(l.is_global||e)&&n.push(l);for(var r=t.first;r!==null;){var s=r.next,o=(r.f&ut)!==0||(r.f&T)!==0;_t(r,n,o?e:!1),r=s}}}function jn(t){pt(t,!0)}function pt(t,n){if(t.f&x){t.f^=x,L(t)&&b(t);for(var e=t.first;e!==null;){var r=e.next,s=(e.f&ut)!==0||(e.f&T)!==0;pt(e,s?n:!1),e=r}if(t.transitions!==null)for(const o of t.transitions)(o.is_global||n)&&o.in()}}const Hn=()=>{};function Un(t){return t()}function Ht(t){for(var n=0;n<t.length;n++)t[n]()}let H=!1,z=[];function vt(){H=!1;const t=z.slice();z=[],Ht(t)}function Yn(t){H||(H=!0,queueMicrotask(vt)),z.push(t)}function Ut(){H&&vt()}function Yt(t){let n=P|m;f===null&&(n|=w);const e={deps:null,deriveds:null,equals:lt,f:n,first:null,fn:t,last:null,reactions:null,v:null,version:0};if(v!==null&&v.f&P){var r=v;r.deriveds===null?r.deriveds=[e]:r.deriveds.push(e)}return e}function Vn(t){const n=Yt(t);return n.equals=it,n}function Et(t){Q(t);var n=t.deriveds;if(n!==null){t.deriveds=null;for(var e=0;e<n.length;e+=1)Vt(n[e])}}function dt(t,n){Et(t);var e=Tt(t),r=(k||t.f&w)&&t.deps!==null?D:y;h(t,r),t.equals(e)||(t.v=e,J(t,m,n))}function Vt(t){Et(t),V(t,0),h(t,F),t.first=t.last=t.deps=t.reactions=t.fn=null}const ht=0,Bt=1;let q=ht,U=!1,C=!1,Y=!1;function nt(t){C=t}function et(t){Y=t}let S=[],N=0,v=null,f=null,_=null,c=0,R=null;function Kt(t){R=t}let O=!1,k=!1,a=null;function W(){return a!==null&&a.r}function L(t){var i;var n=t.f;if(n&m)return!0;if(n&D){var e=t.deps,r=(n&w)!==0;if(e!==null)for(var s=e.length,o=0;o<s;o++){var l=e[o];if(L(l)&&(dt(l,!0),t.f&m))return!0;var E=l.version;if(r){if(E>t.version)return t.version=E,!0;if(!k&&!((i=l==null?void 0:l.reactions)!=null&&i.includes(t))){var u=l.reactions;u===null?l.reactions=[t]:u.push(t)}}}r||h(t,y)}return!1}function Tt(t){const n=_,e=c,r=R,s=v,o=k,l=O;_=null,c=0,R=null,v=t,k=!C&&(t.f&w)!==0,O=!1;try{let E=t.fn(),u=t.deps;if(_!==null){let i;if(u!==null){const p=u.length,d=c===0?_:u.slice(0,c).concat(_),g=d.length>16&&p-c>1?new Set(d):null;for(i=c;i<p;i++){const A=u[i];(g!==null?!g.has(A):!d.includes(A))&&yt(t,A)}}if(u!==null&&c>0)for(u.length=c+_.length,i=0;i<_.length;i++)u[c+i]=_[i];else t.deps=u=_;if(!k)for(i=c;i<u.length;i++){const p=u[i],d=p.reactions;d===null?p.reactions=[t]:d[d.length-1]!==t&&d.push(t)}}else u!==null&&c<u.length&&(V(t,c),u.length=c);return E}finally{_=n,c=e,R=r,v=s,k=o,O=l}}function yt(t,n){const e=n.reactions;let r=0;if(e!==null){r=e.length-1;const s=e.indexOf(t);s!==-1&&(r===0?n.reactions=null:(e[s]=e[r],e.pop()))}r===0&&n.f&w&&(h(n,m),V(n,0))}function V(t,n){const e=t.deps;if(e!==null){const r=n===0?null:e.slice(0,n);let s;for(s=n;s<e.length;s++){const o=e[s];(r===null||!r.includes(o))&&yt(t,o)}}}function Q(t){let n=t.first;t.first=null,t.last=null;for(var e;n!==null;)e=n.next,$(n),n=e}function b(t){var n=t.f;if(!(n&F)){h(t,y);var e=t.ctx,r=f,s=a;f=t,a=e;try{n&ot||Q(t),ct(t);var o=Tt(t);t.teardown=typeof o=="function"?o:null}finally{f=r,a=s}}}function mt(){if(N>1e3)throw N=0,new Error("ERR_SVELTE_TOO_MANY_UPDATES");N++}function At(t){for(var n=0;n<t.length;n++){var e=t[n];Ot(e,I|j)}}function rt(t){var n=t.length;if(n!==0){mt();for(var e=0;e<n;e++){var r=t[e];!(r.f&(F|x))&&L(r)&&b(r)}}}function zt(){if(U=!1,N>101)return;const t=S;S=[],At(t),U||(N=0)}function B(t){q===ht&&(U||(U=!0,queueMicrotask(zt)));for(var n=t;n.parent!==null;){n=n.parent;var e=n.f;if(e&T){if(!(e&y))return;h(n,D)}}S.push(n)}function Rt(t,n,e,r){var s=t.first,o=[];t:for(;s!==null;){var l=s.f,E=(l&(F|x))===0,u=l&T,i=(l&y)!==0,p=s.first;if(E&&(!u||!i)){if(u&&h(s,y),l&I){if(u){if(!e&&p!==null){s=p;continue}}else if(L(s)&&(b(s),p=s.first),!e&&p!==null){s=p;continue}}else if(l&j)if(u||i){if(!e&&p!==null){s=p;continue}}else o.push(s)}var d=s.next;if(d===null){let A=s.parent;for(;A!==null;){if(t===A)break t;var K=A.next;if(K!==null){s=K;continue t}A=A.parent}}s=d}if(o.length>0&&(n&j&&r.push(...o),!e))for(var g=0;g<o.length;g++)Rt(o[g],n,!1,r)}function Ot(t,n,e=!1){var r=[],s=C;C=!0;try{t.first===null&&!(t.f&T)?rt([t]):(Rt(t,n,e,r),rt(r))}finally{C=s}}function Bn(t){N=0,Ot(t,I,!0)}function St(t,n=!0){var e=q,r=S;try{mt();const o=[];q=Bt,S=o,n&&At(r);var s=t==null?void 0:t();return Ut(),(S.length>0||o.length>0)&&St(),N=0,s}finally{q=e,S=r}}async function Kn(){await Promise.resolve(),St()}function Nt(t){const n=t.f;if(n&F)return t.v;if(v!==null&&!(v.f&(T|X))&&!O){const e=(v.f&w)!==0,r=v.deps;_===null&&r!==null&&r[c]===t&&!(e&&f!==null)?c++:(r===null||c===0||r[c-1]!==t)&&(_===null?_=[t]:_.push(t)),R!==null&&f!==null&&f.f&y&&!(f.f&T)&&R.includes(t)&&(h(f,m),B(f))}return n&P&&L(t)&&dt(t,!1),t.v}function J(t,n,e){var r=t.reactions;if(r!==null)for(var s=W(),o=r.length,l=0;l<o;l++){var E=r[l];if(!((!e||!s)&&E===f)){var u=E.f;h(E,n);var i=(u&D)!==0,p=(u&w)!==0;(u&y||i&&p)&&(E.f&P?J(E,D,e):B(E))}}}function Wt(t){const n=O;try{return O=!0,t()}finally{O=n}}const Gt=~(m|D|y);function h(t,n){t.f=t.f&Gt|n}function Xt(t){return typeof t=="object"&&t!==null&&typeof t.f=="number"}function zn(t){return It().get(t)}function Wn(t,n){return It().set(t,n),n}function It(){const t=a;if(t===null)throw new Error("ERR_SVELTE_ORPHAN_CONTEXT");return t.c??(t.c=new Map(Zt(t)||void 0))}function Zt(t){let n=t.p;for(;n!==null;){const e=n.c;if(e!==null)return e;n=n.p}return null}function Gn(t,n=!1,e){a={x:null,c:null,e:null,m:!1,p:a,d:null,s:t,r:n,l1:[],l2:ft(!1),u:null}}function Xn(t){const n=a;if(n!==null){t!==void 0&&(n.x=t);const e=n.e;if(e!==null){n.e=null;for(let r=0;r<e.length;r++)at(e[r])}a=n.p,n.m=!0}return t||{}}function Zn(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(tt in t)G(t);else if(!Array.isArray(t))for(let n in t){const e=t[n];typeof e=="object"&&e&&tt in e&&G(e)}}}function G(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t);for(let r in t)try{G(t[r],n)}catch{}const e=kt(t);if(e!==Object.prototype&&e!==Array.prototype&&e!==Map.prototype&&e!==Set.prototype&&e!==Date.prototype){const r=gt(e);for(let s in r){const o=r[s].get;if(o)try{o.call(t)}catch{}}}}}function $n(t){return Xt(t)?Nt(t):t}export{Wn as $,nn as A,Cn as B,y as C,Rn as D,Kn as E,ft as F,Jt as G,On as H,en as I,rn as J,kt as K,ut as L,Sn as M,bt as N,jn as O,In as P,qn as Q,Yn as R,tt as S,An as T,Pt as U,dn as V,it as W,vn as X,En as Y,hn as Z,un as _,Gn as a,zn as a0,Ln as a1,Pn as a2,Vn as a3,x as a4,ln as a5,fn as a6,pn as a7,_t as a8,jt as a9,$ as aa,cn as ab,_n as ac,an as ad,gn as ae,Qt as af,on as ag,sn as ah,wn as ai,gt as aj,Nn as ak,ot as al,xt as am,Tn as an,mn as ao,yn as ap,$n as aq,xn as b,Dn as c,Yt as d,at as e,a as f,Nt as g,Ht as h,f as i,Bn as j,Un as k,Zn as l,kn as m,Hn as n,tn as o,Xn as p,wt as q,Z as r,Mt as s,Mn as t,Wt as u,St as v,$t as w,Fn as x,bn as y,Lt as z};