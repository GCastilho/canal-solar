import{S as r,i as t,s,r as n,u as a,v as e,p as o,q as u,w as i}from"./client.f8b241a0.js";import{A as l}from"./Article.248358b2.js";function c(r){let t;const s=new l({props:{url:r[0]}});return{c(){n(s.$$.fragment)},l(r){a(s.$$.fragment,r)},m(r,n){e(s,r,n),t=!0},p(r,[t]){const n={};1&t&&(n.url=r[0]),s.$set(n)},i(r){t||(o(s.$$.fragment,r),t=!0)},o(r){u(s.$$.fragment,r),t=!1},d(r){i(s,r)}}}async function p(r){const{slug:t}=r.params;return{url:`/index.php/artigos/opiniao/item/${t}`}}function f(r,t,s){let{url:n}=t;return r.$set=(r=>{"url"in r&&s(0,n=r.url)}),[n]}export default class extends r{constructor(r){super(),t(this,r,f,c,s,{url:0})}}export{p as preload};
