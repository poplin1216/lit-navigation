var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e,t,n){let r=e.left+e.width/2,i=e.top+e.height/2,a=t.left+t.width/2,o=t.top+t.height/2;switch(n){case`ArrowDown`:if(o<=i)return 1/0;break;case`ArrowUp`:if(o>=i)return 1/0;break;case`ArrowRight`:if(a<=r)return 1/0;break;case`ArrowLeft`:if(a>=r)return 1/0;break}let s=0,c=0,l=!1;n===`ArrowDown`||n===`ArrowUp`?(s=Math.abs(o-i),c=Math.abs(a-r),l=Math.max(0,Math.min(e.right,t.right)-Math.max(e.left,t.left))>0):(s=Math.abs(a-r),c=Math.abs(o-i),l=Math.max(0,Math.min(e.bottom,t.bottom)-Math.max(e.top,t.top))>0);let u=l?1:4;return s*2+c*u}function r(e,t,r){let i=null,a=1/0;for(let o of t){if(o.rect.left===e.left&&o.rect.top===e.top&&o.rect.right===e.right&&o.rect.bottom===e.bottom)continue;let t=n(e,o.rect,r);t<a&&(a=t,i=o)}return i}function i(e=document.body){let t=[];function n(e){if(e.nodeType!==Node.ELEMENT_NODE&&e.nodeType!==Node.DOCUMENT_FRAGMENT_NODE)return;let r=e.nodeType===Node.ELEMENT_NODE?e:null;if(r&&(r.inert||r.hasAttribute(`inert`)))return;r&&r.shadowRoot&&n(r.shadowRoot);let i=e.children;if(i)for(let e=0;e<i.length;e++){let r=i[e];a(r)&&t.push(r),n(r)}}return n(e),t}function a(e){if(e.disabled||e.hasAttribute(`disabled`)||e.style&&(e.style.display===`none`||e.style.visibility===`hidden`))return!1;let t=e.tagName.toLowerCase();if([`button`,`input`,`select`,`textarea`].includes(t)||t===`a`&&e.hasAttribute(`href`))return!0;let n=e.getAttribute(`tabindex`);if(n!==null){let e=parseInt(n,10);return!isNaN(e)&&e>=0}return!1}var o=t({compute:()=>f}),s=e=>typeof e==`object`&&!!e&&e.nodeType===1,c=(e,t)=>(!t||e!==`hidden`)&&e!==`visible`&&e!==`clip`,l=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){let n=getComputedStyle(e,null);return c(n.overflowY,t)||c(n.overflowX,t)||(e=>{let t=(e=>{if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch{return null}})(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)})(e)}return!1},u=(e,t,n,r,i,a,o,s)=>a<e&&o>t||a>e&&o<t?0:a<=e&&s<=n||o>=t&&s>=n?a-e-r:o>t&&s<n||a<e&&s>n?o-t+i:0,d=e=>e.parentElement??(e.getRootNode().host||null),f=(e,t)=>{if(typeof document>`u`)return[];let{scrollMode:n,block:r,inline:i,boundary:a,skipOverflowHiddenElements:o}=t,c=typeof a==`function`?a:e=>e!==a;if(!s(e))throw TypeError(`Invalid target`);let f=document.scrollingElement||document.documentElement,p=[],m=e;for(;s(m)&&c(m);){if(m=d(m),m===f){p.push(m);break}m!=null&&m===document.body&&l(m)&&!l(document.documentElement)||m!=null&&l(m,o)&&p.push(m)}let h=window.visualViewport?.width??innerWidth,g=window.visualViewport?.height??innerHeight,{scrollX:_,scrollY:v}=window,{height:y,width:b,top:x,right:S,bottom:C,left:w}=e.getBoundingClientRect(),{top:T,right:E,bottom:D,left:O}=(e=>{let t=window.getComputedStyle(e);return{top:parseFloat(t.scrollMarginTop)||0,right:parseFloat(t.scrollMarginRight)||0,bottom:parseFloat(t.scrollMarginBottom)||0,left:parseFloat(t.scrollMarginLeft)||0}})(e),k=r===`start`||r===`nearest`?x-T:r===`end`?C+D:x+y/2-T+D,A=i===`center`?w+b/2-O+E:i===`end`?S+E:w-O,ee=[];for(let e=0;e<p.length;e++){let t=p[e],{height:a,width:o,top:s,right:c,bottom:d,left:m}=t.getBoundingClientRect();if(n===`if-needed`&&x>=0&&w>=0&&C<=g&&S<=h&&(t===f&&!l(t)||x>=s&&C<=d&&w>=m&&S<=c))return ee;let T=getComputedStyle(t),E=parseInt(T.borderLeftWidth,10),D=parseInt(T.borderTopWidth,10),O=parseInt(T.borderRightWidth,10),j=parseInt(T.borderBottomWidth,10),M=0,N=0,P=`offsetWidth`in t?t.offsetWidth-t.clientWidth-E-O:0,F=`offsetHeight`in t?t.offsetHeight-t.clientHeight-D-j:0,I=`offsetWidth`in t?t.offsetWidth===0?0:o/t.offsetWidth:0,L=`offsetHeight`in t?t.offsetHeight===0?0:a/t.offsetHeight:0;if(f===t)M=r===`start`?k:r===`end`?k-g:r===`nearest`?u(v,v+g,g,D,j,v+k,v+k+y,y):k-g/2,N=i===`start`?A:i===`center`?A-h/2:i===`end`?A-h:u(_,_+h,h,E,O,_+A,_+A+b,b),M=Math.max(0,M+v),N=Math.max(0,N+_);else{M=r===`start`?k-s-D:r===`end`?k-d+j+F:r===`nearest`?u(s,d,a,D,j+F,k,k+y,y):k-(s+a/2)+F/2,N=i===`start`?A-m-E:i===`center`?A-(m+o/2)+P/2:i===`end`?A-c+O+P:u(m,c,o,E,O+P,A,A+b,b);let{scrollLeft:e,scrollTop:n}=t;M=L===0?0:Math.max(0,Math.min(n+M/L,t.scrollHeight-a/L+F)),N=I===0?0:Math.max(0,Math.min(e+N/I,t.scrollWidth-o/I+P)),k+=n-M,A+=e-N}ee.push({el:t,top:M,left:N})}return ee},p=null;try{let e=o;p=typeof e==`function`?e:e?.default||e?.computeScrollIntoView}catch(e){console.warn(`compute-scroll-into-view import failed, falling back to native scrollIntoView`,e)}function m(e=document){let t=e.activeElement;if(!t)return null;for(;t.shadowRoot&&t.shadowRoot.activeElement&&(t=t.shadowRoot.activeElement,t););return t}var h=class{static{this.isListening=!1}static start(){this.isListening||=(window.addEventListener(`keydown`,this.handleKeyDown,!0),!0)}static stop(){this.isListening&&=(window.removeEventListener(`keydown`,this.handleKeyDown,!0),!1)}static{this.handleKeyDown=e=>{let t=[`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`],n=e.key;if(!t.includes(n))return;e.preventDefault();let a=m(),o=!a||a===document.body,s=i();if(console.log(`[DEBUG] Key: ${n}, Active Element ID: ${a?.id||`body/none`}, HasNoFocus: ${o}, Candidates Count: ${s.length}`),o){if(s.length>0){let e=[...s].sort((e,t)=>{let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();return n.top===r.top?n.left-r.left:n.top-r.top});console.log(`[DEBUG] Focusing default first candidate: ${e[0].id}`),this.focusAndScroll(e[0])}return}let c=r(a.getBoundingClientRect(),s.filter(e=>e!==a).map(e=>({element:e,rect:e.getBoundingClientRect()})),n);console.log(`[DEBUG] Nearest element for ${n}: ${c?.element?.id||`none`}`),c&&this.focusAndScroll(c.element)}}static focusAndScroll(e){console.log(`[DEBUG] focusAndScroll target: ${e.id}`),e.focus();try{typeof p==`function`?p(e,{scrollMode:`if-needed`,block:`nearest`,inline:`nearest`}).forEach(({el:e,top:t,left:n})=>{typeof e.scrollTo==`function`?e.scrollTo({top:t,left:n,behavior:`smooth`}):(e.scrollTop=t,e.scrollLeft=n)}):e.scrollIntoView({behavior:`smooth`,block:`nearest`,inline:`nearest`})}catch(e){console.warn(`Scroll interaction error:`,e)}}},g=class{static{this.stack=[]}static push(e){if(this.stack.length>0){let e=this.stack[this.stack.length-1];e.inert=!0,e.setAttribute(`inert`,``)}e.inert=!1,e.removeAttribute(`inert`),this.stack.push(e)}static pop(){if(this.stack.length===0)return null;let e=this.stack.pop();if(e.inert=!0,e.setAttribute(`inert`,``),this.stack.length>0){let e=this.stack[this.stack.length-1];e.inert=!1,e.removeAttribute(`inert`)}return e}static reset(){this.stack.forEach(e=>{e.inert=!1,e.removeAttribute(`inert`)}),this.stack=[]}static getStack(){return[...this.stack]}},_=globalThis,v=_.ShadowRoot&&(_.ShadyCSS===void 0||_.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,y=Symbol(),b=new WeakMap,x=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(v&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=b.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&b.set(t,e))}return e}toString(){return this.cssText}},S=e=>new x(typeof e==`string`?e:e+``,void 0,y),C=(e,...t)=>new x(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,y),w=(e,t)=>{if(v)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=_.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},T=v?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return S(t)})(e):e,{is:E,defineProperty:D,getOwnPropertyDescriptor:O,getOwnPropertyNames:k,getOwnPropertySymbols:A,getPrototypeOf:ee}=Object,j=globalThis,M=j.trustedTypes,N=M?M.emptyScript:``,P=j.reactiveElementPolyfillSupport,F=(e,t)=>e,I={toAttribute(e,t){switch(t){case Boolean:e=e?N:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},L=(e,t)=>!E(e,t),te={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:L};Symbol.metadata??=Symbol(`metadata`),j.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=te){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&D(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=O(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??te}static _$Ei(){if(this.hasOwnProperty(F(`elementProperties`)))return;let e=ee(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(F(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F(`properties`))){let e=this.properties,t=[...k(e),...A(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(T(e))}else e!==void 0&&t.push(T(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return w(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?I:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?I:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??L)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};R.elementStyles=[],R.shadowRootOptions={mode:`open`},R[F(`elementProperties`)]=new Map,R[F(`finalized`)]=new Map,P?.({ReactiveElement:R}),(j.reactiveElementVersions??=[]).push(`2.1.2`);var ne=globalThis,re=e=>e,z=ne.trustedTypes,ie=z?z.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ae=`$lit$`,B=`lit$${Math.random().toFixed(9).slice(2)}$`,oe=`?`+B,se=`<${oe}>`,V=document,H=()=>V.createComment(``),U=e=>e===null||typeof e!=`object`&&typeof e!=`function`,ce=Array.isArray,le=e=>ce(e)||typeof e?.[Symbol.iterator]==`function`,ue=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,de=/-->/g,fe=/>/g,G=RegExp(`>|${ue}(?:([^\\s"'>=/]+)(${ue}*=${ue}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),pe=/'/g,me=/"/g,he=/^(?:script|style|textarea|title)$/i,K=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),q=Symbol.for(`lit-noChange`),J=Symbol.for(`lit-nothing`),ge=new WeakMap,Y=V.createTreeWalker(V,129);function _e(e,t){if(!ce(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ie===void 0?t:ie.createHTML(t)}var ve=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=W;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===W?c[1]===`!--`?o=de:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=G):(he.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=G):o=fe:o===G?c[0]===`>`?(o=i??W,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?G:c[3]===`"`?me:pe):o===me||o===pe?o=G:o===de||o===fe?o=W:(o=G,i=void 0);let d=o===G&&e[t+1].startsWith(`/>`)?` `:``;a+=o===W?n+se:l>=0?(r.push(s),n.slice(0,l)+ae+n.slice(l)+B+d):n+B+(l===-2?t:d)}return[_e(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},ye=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ve(t,n);if(this.el=e.createElement(l,r),Y.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Y.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ae)){let t=u[o++],n=i.getAttribute(e).split(B),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ce:r[1]===`?`?we:r[1]===`@`?Te:Se}),i.removeAttribute(e)}else e.startsWith(B)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(he.test(i.tagName)){let e=i.textContent.split(B),t=e.length-1;if(t>0){i.textContent=z?z.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],H()),Y.nextNode(),c.push({type:2,index:++a});i.append(e[t],H())}}}else if(i.nodeType===8)if(i.data===oe)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(B,e+1))!==-1;)c.push({type:7,index:a}),e+=B.length-1}a++}}static createElement(e,t){let n=V.createElement(`template`);return n.innerHTML=e,n}};function X(e,t,n=e,r){if(t===q)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=U(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=X(e,i._$AS(e,t.values),i,r)),t}var be=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??V).importNode(t,!0);Y.currentNode=r;let i=Y.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new xe(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ee(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Y.nextNode(),a++)}return Y.currentNode=V,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},xe=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),U(e)?e===J||e==null||e===``?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==q&&this._(e):e._$litType$===void 0?e.nodeType===void 0?le(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(V.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=ye.createElement(_e(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new be(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ge.get(e.strings);return t===void 0&&ge.set(e.strings,t=new ye(e)),t}k(t){ce(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(H()),this.O(H()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=re(e).nextSibling;re(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Se=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=J}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=X(this,e,t,0),a=!U(e)||e!==this._$AH&&e!==q,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=X(this,r[n+o],t,o),s===q&&(s=this._$AH[o]),a||=!U(s)||s!==this._$AH[o],s===J?e=J:e!==J&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ce=class extends Se{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}},we=class extends Se{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}},Te=class extends Se{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??J)===q)return;let n=this._$AH,r=e===J&&n!==J||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==J&&(n===J||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ee=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}},De=ne.litHtmlPolyfillSupport;De?.(ye,xe),(ne.litHtmlVersions??=[]).push(`3.3.3`);var Oe=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new xe(t.insertBefore(H(),e),e,void 0,n??{})}return i._$AI(e),i},ke=globalThis,Z=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Oe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};Z._$litElement$=!0,Z.finalized=!0,ke.litElementHydrateSupport?.({LitElement:Z});var Ae=ke.litElementPolyfillSupport;Ae?.({LitElement:Z}),(ke.litElementVersions??=[]).push(`4.2.2`);var Q=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},je={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:L},Me=(e=je,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function Ne(e){return(t,n)=>typeof n==`object`?Me(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function $(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Pe=class extends Z{constructor(...e){super(...e),this.disabled=!1}static{this.styles=C`
    :host {
      display: inline-block;
      outline: none;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #ffffff;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
    }

    /* 포커스링 커스텀 스타일 (D-pad/Spatial Focus 상태 표현) */
    :host(:focus) button,
    :host(.is-spatial-focused) button {
      transform: scale(1.05);
      background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 1), 0 0 0 6px #6366f1, 0 10px 15px -3px rgba(79, 70, 229, 0.3);
    }

    button:active {
      transform: scale(0.98);
    }

    /* 비활성 상태 */
    :host([disabled]) button {
      background: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }
  `}connectedCallback(){super.connectedCallback(),!this.hasAttribute(`tabindex`)&&!this.disabled&&this.setAttribute(`tabindex`,`0`)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`disabled`&&(this.disabled?this.removeAttribute(`tabindex`):this.setAttribute(`tabindex`,`0`))}render(){return K`
      <button ?disabled=${this.disabled} tabindex="-1">
        <slot></slot>
      </button>
    `}};$([Ne({type:Boolean,reflect:!0})],Pe.prototype,`disabled`,void 0),Pe=$([Q(`lit-button`)],Pe);var Fe=class extends Z{static{this.styles=C`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      background-color: #f8fafc;
      color: #0f172a;
      box-sizing: border-box;
      padding: 24px;
      transition: opacity 0.3s ease, filter 0.3s ease;
    }

    /* 뒷배경으로 깔려 inert화 되었을 때의 흐릿한 시각적 효과 피드백 */
    :host([inert]) {
      opacity: 0.6;
      filter: grayscale(40%) blur(1px);
      pointer-events: none;
    }
  `}connectedCallback(){super.connectedCallback(),g.push(this)}disconnectedCallback(){g.pop(),super.disconnectedCallback()}render(){return K`<slot></slot>`}};Fe=$([Q(`lit-page`)],Fe);var Ie=class extends Z{constructor(...e){super(...e),this.open=!1}static{this.styles=C`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    :host([open]) {
      display: flex;
    }

    .backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(8px);
      transition: all 0.3s ease;
    }

    .dialog {
      position: relative;
      background: #ffffff;
      border-radius: 20px;
      padding: 32px;
      width: 90%;
      max-width: 480px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(226, 232, 240, 0.8);
      z-index: 10000;
      transform: scale(0.95);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    :host([open]) .dialog {
      transform: scale(1);
      opacity: 1;
    }
  `}updated(e){e.has(`open`)&&(this.open?g.push(this):e.get(`open`)===!0&&g.pop())}disconnectedCallback(){this.open&&g.pop(),super.disconnectedCallback()}render(){return K`
      <div class="backdrop" @click=${()=>this.open=!1}></div>
      <div class="dialog">
        <slot></slot>
      </div>
    `}};$([Ne({type:Boolean,reflect:!0})],Ie.prototype,`open`,void 0),Ie=$([Q(`lit-modal`)],Ie);var Le=class extends Z{static{this.styles=C`
    :host {
      display: block;
      width: 100%;
      max-height: 320px;
      overflow-y: auto;
      border-radius: 16px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      box-sizing: border-box;
      padding: 8px;
    }

    /* 프리미엄 커스텀 스크롤바 디자인 */
    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `}render(){return K`<slot></slot>`}};Le=$([Q(`lit-list`)],Le);var Re=class extends Z{constructor(...e){super(...e),this.disabled=!1}static{this.styles=C`
    :host {
      display: block;
      outline: none;
      margin-bottom: 4px;
    }

    :host(:last-child) {
      margin-bottom: 0;
    }

    .item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-radius: 10px;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 14px;
      color: #334155;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    /* 포커스 받았을 때의 프리미엄 디자인 피드백 */
    :host(:focus) .item,
    :host(.is-spatial-focused) .item {
      background: #f1f5f9;
      color: #4f46e5;
      font-weight: 600;
      box-shadow: inset 4px 0 0 #4f46e5;
      transform: translateX(4px);
    }

    /* 비활성 상태 */
    :host([disabled]) .item {
      color: #94a3b8;
      cursor: not-allowed;
      pointer-events: none;
    }
  `}connectedCallback(){super.connectedCallback(),!this.hasAttribute(`tabindex`)&&!this.disabled&&this.setAttribute(`tabindex`,`0`)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`disabled`&&(this.disabled?this.removeAttribute(`tabindex`):this.setAttribute(`tabindex`,`0`))}render(){return K`
      <div class="item">
        <slot></slot>
      </div>
    `}};$([Ne({type:Boolean,reflect:!0})],Re.prototype,`disabled`,void 0),Re=$([Q(`lit-list-item`)],Re),h.start();var ze=document.getElementById(`page-home`),Be=document.getElementById(`page-detail`),Ve=document.getElementById(`modal-dialog`),He=document.getElementById(`app-container`);Be.style.display=`block`,Be.remove(),document.getElementById(`btn-next`)?.addEventListener(`click`,()=>{ze.remove(),He.appendChild(Be),setTimeout(()=>{document.getElementById(`btn-modal-open`)?.focus()},10)}),document.getElementById(`btn-back`)?.addEventListener(`click`,()=>{Be.remove(),He.appendChild(ze),setTimeout(()=>{document.getElementById(`btn-next`)?.focus()},10)}),document.getElementById(`btn-modal-open`)?.addEventListener(`click`,()=>{Ve.open=!0,setTimeout(()=>{document.getElementById(`btn-modal-close`)?.focus()},10)}),document.getElementById(`btn-modal-close`)?.addEventListener(`click`,()=>{Ve.open=!1,setTimeout(()=>{document.getElementById(`btn-modal-open`)?.focus()},10)}),document.getElementById(`btn-modal-confirm`)?.addEventListener(`click`,()=>{alert(`🎉 Premium Action Confirmed!`),Ve.open=!1,setTimeout(()=>{document.getElementById(`btn-modal-open`)?.focus()},10)});