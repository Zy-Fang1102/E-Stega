(function(g,n){typeof exports=="object"&&typeof module!="undefined"?n(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],n):(g=typeof globalThis!="undefined"?globalThis:g||self,n(g.DataV={},g.Vue))})(this,function(g,n){"use strict";var il=Object.defineProperty,ll=Object.defineProperties;var sl=Object.getOwnPropertyDescriptors;var Kt=Object.getOwnPropertySymbols;var dl=Object.prototype.hasOwnProperty,cl=Object.prototype.propertyIsEnumerable;var Qt=(g,n,C)=>n in g?il(g,n,{enumerable:!0,configurable:!0,writable:!0,value:C}):g[n]=C,k=(g,n)=>{for(var C in n||(n={}))dl.call(n,C)&&Qt(g,C,n[C]);if(Kt)for(var C of Kt(n))cl.call(n,C)&&Qt(g,C,n[C]);return g},re=(g,n)=>ll(g,sl(n));let C="dv-";function Jt(e){C=e}function ue(e,t=!0){return`${t?".":""}${C||""}${e}`}function S(e){return ue(e,!1)}function Zt(e,t){const o=ue(t);return`.__STYLED__ {${e.toString()}}`.replaceAll(".__STYLED__",o)}function m(e){return t=>{const o=document.createElement("style"),l=c=>{o.innerHTML=Zt(t,c),document.querySelector("head").appendChild(o)},d=()=>document.querySelector("head").removeChild(o);return c=>{const s=e,r=ue(c,!1);return n.defineComponent({setup(i,{slots:f}){return n.onMounted(()=>{l(c)}),n.onUnmounted(()=>{d()}),()=>n.createVNode(s,n.mergeProps(i,{class:r}),{default:()=>{var p;return[(p=f==null?void 0:f.default)==null?void 0:p.call(f)]}})}})}}}m.span=m((e,{slots:t})=>n.createVNode("span",e,[t==null?void 0:t.default()])),m.div=m((e,{slots:t})=>n.createVNode("div",e,[t==null?void 0:t.default()])),m.img=m(e=>n.createVNode("img",e,null)),m.svg=m((e,{slots:t})=>n.createVNode("svg",e,[t==null?void 0:t.default()]));var er=typeof global=="object"&&global&&global.Object===Object&&global;const Ye=er;var tr=typeof self=="object"&&self&&self.Object===Object&&self,rr=Ye||tr||Function("return this")();const j=rr;var nr=j.Symbol;const z=nr;var He=Object.prototype,or=He.hasOwnProperty,ar=He.toString,X=z?z.toStringTag:void 0;function ir(e){var t=or.call(e,X),o=e[X];try{e[X]=void 0;var l=!0}catch(c){}var d=ar.call(e);return l&&(t?e[X]=o:delete e[X]),d}var lr=Object.prototype,sr=lr.toString;function dr(e){return sr.call(e)}var cr="[object Null]",fr="[object Undefined]",qe=z?z.toStringTag:void 0;function K(e){return e==null?e===void 0?fr:cr:qe&&qe in Object(e)?ir(e):dr(e)}function Y(e){return e!=null&&typeof e=="object"}var ur="[object Symbol]";function Ge(e){return typeof e=="symbol"||Y(e)&&K(e)==ur}function pr(e,t){for(var o=-1,l=e==null?0:e.length,d=Array(l);++o<l;)d[o]=t(e[o],o,e);return d}var hr=Array.isArray;const ne=hr;var gr=1/0,Ue=z?z.prototype:void 0,We=Ue?Ue.toString:void 0;function Xe(e){if(typeof e=="string")return e;if(ne(e))return pr(e,Xe)+"";if(Ge(e))return We?We.call(e):"";var t=e+"";return t=="0"&&1/e==-gr?"-0":t}var $r=/\s/;function br(e){for(var t=e.length;t--&&$r.test(e.charAt(t)););return t}var mr=/^\s+/;function yr(e){return e&&e.slice(0,br(e)+1).replace(mr,"")}function M(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var Ke=0/0,Nr=/^[-+]0x[0-9a-f]+$/i,_r=/^0b[01]+$/i,Vr=/^0o[0-7]+$/i,wr=parseInt;function pe(e){if(typeof e=="number")return e;if(Ge(e))return Ke;if(M(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=M(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=yr(e);var o=_r.test(e);return o||Vr.test(e)?wr(e.slice(2),o?2:8):Nr.test(e)?Ke:+e}var Qe=1/0,xr=17976931348623157e292;function Je(e){if(!e)return e===0?e:0;if(e=pe(e),e===Qe||e===-Qe){var t=e<0?-1:1;return t*xr}return e===e?e:0}function he(e){return e}var kr="[object AsyncFunction]",Cr="[object Function]",Sr="[object GeneratorFunction]",Tr="[object Proxy]";function ge(e){if(!M(e))return!1;var t=K(e);return t==Cr||t==Sr||t==kr||t==Tr}var Br=j["__core-js_shared__"];const $e=Br;var Ze=function(){var e=/[^.]+$/.exec($e&&$e.keys&&$e.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function Ar(e){return!!Ze&&Ze in e}var Dr=Function.prototype,Lr=Dr.toString;function Mr(e){if(e!=null){try{return Lr.call(e)}catch(t){}try{return e+""}catch(t){}}return""}var Pr=/[\\^$.*+?()[\]{}|]/g,vr=/^\[object .+?Constructor\]$/,Rr=Function.prototype,Or=Object.prototype,jr=Rr.toString,Er=Or.hasOwnProperty,Ir=RegExp("^"+jr.call(Er).replace(Pr,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Fr(e){if(!M(e)||Ar(e))return!1;var t=ge(e)?Ir:vr;return t.test(Mr(e))}function zr(e,t){return e==null?void 0:e[t]}function be(e,t){var o=zr(e,t);return Fr(o)?o:void 0}var et=Object.create,Yr=function(){function e(){}return function(t){if(!M(t))return{};if(et)return et(t);e.prototype=t;var o=new e;return e.prototype=void 0,o}}();const Hr=Yr;function qr(e,t,o){switch(o.length){case 0:return e.call(t);case 1:return e.call(t,o[0]);case 2:return e.call(t,o[0],o[1]);case 3:return e.call(t,o[0],o[1],o[2])}return e.apply(t,o)}function Gr(e,t){var o=-1,l=e.length;for(t||(t=Array(l));++o<l;)t[o]=e[o];return t}var Ur=800,Wr=16,Xr=Date.now;function Kr(e){var t=0,o=0;return function(){var l=Xr(),d=Wr-(l-o);if(o=l,d>0){if(++t>=Ur)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}function Qr(e){return function(){return e}}var Jr=function(){try{var e=be(Object,"defineProperty");return e({},"",{}),e}catch(t){}}();const oe=Jr;var Zr=oe?function(e,t){return oe(e,"toString",{configurable:!0,enumerable:!1,value:Qr(t),writable:!0})}:he,en=Kr(Zr);const tn=en;var rn=9007199254740991,nn=/^(?:0|[1-9]\d*)$/;function tt(e,t){var o=typeof e;return t=t==null?rn:t,!!t&&(o=="number"||o!="symbol"&&nn.test(e))&&e>-1&&e%1==0&&e<t}function me(e,t,o){t=="__proto__"&&oe?oe(e,t,{configurable:!0,enumerable:!0,value:o,writable:!0}):e[t]=o}function ae(e,t){return e===t||e!==e&&t!==t}var on=Object.prototype,an=on.hasOwnProperty;function ln(e,t,o){var l=e[t];(!(an.call(e,t)&&ae(l,o))||o===void 0&&!(t in e))&&me(e,t,o)}function sn(e,t,o,l){var d=!o;o||(o={});for(var c=-1,s=t.length;++c<s;){var r=t[c],a=l?l(o[r],e[r],r,o,e):void 0;a===void 0&&(a=e[r]),d?me(o,r,a):ln(o,r,a)}return o}var rt=Math.max;function dn(e,t,o){return t=rt(t===void 0?e.length-1:t,0),function(){for(var l=arguments,d=-1,c=rt(l.length-t,0),s=Array(c);++d<c;)s[d]=l[t+d];d=-1;for(var r=Array(t+1);++d<t;)r[d]=l[d];return r[t]=o(s),qr(e,this,r)}}function cn(e,t){return tn(dn(e,t,he),e+"")}var fn=9007199254740991;function nt(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=fn}function ye(e){return e!=null&&nt(e.length)&&!ge(e)}function ot(e,t,o){if(!M(o))return!1;var l=typeof t;return(l=="number"?ye(o)&&tt(t,o.length):l=="string"&&t in o)?ae(o[t],e):!1}function un(e){return cn(function(t,o){var l=-1,d=o.length,c=d>1?o[d-1]:void 0,s=d>2?o[2]:void 0;for(c=e.length>3&&typeof c=="function"?(d--,c):void 0,s&&ot(o[0],o[1],s)&&(c=d<3?void 0:c,d=1),t=Object(t);++l<d;){var r=o[l];r&&e(t,r,l,c)}return t})}var pn=Object.prototype;function at(e){var t=e&&e.constructor,o=typeof t=="function"&&t.prototype||pn;return e===o}function hn(e,t){for(var o=-1,l=Array(e);++o<e;)l[o]=t(o);return l}var gn="[object Arguments]";function it(e){return Y(e)&&K(e)==gn}var lt=Object.prototype,$n=lt.hasOwnProperty,bn=lt.propertyIsEnumerable,mn=it(function(){return arguments}())?it:function(e){return Y(e)&&$n.call(e,"callee")&&!bn.call(e,"callee")};const Ne=mn;function yn(){return!1}var st=typeof g=="object"&&g&&!g.nodeType&&g,dt=st&&typeof module=="object"&&module&&!module.nodeType&&module,Nn=dt&&dt.exports===st,ct=Nn?j.Buffer:void 0,_n=ct?ct.isBuffer:void 0,Vn=_n||yn;const ft=Vn;var wn="[object Arguments]",xn="[object Array]",kn="[object Boolean]",Cn="[object Date]",Sn="[object Error]",Tn="[object Function]",Bn="[object Map]",An="[object Number]",Dn="[object Object]",Ln="[object RegExp]",Mn="[object Set]",Pn="[object String]",vn="[object WeakMap]",Rn="[object ArrayBuffer]",On="[object DataView]",jn="[object Float32Array]",En="[object Float64Array]",In="[object Int8Array]",Fn="[object Int16Array]",zn="[object Int32Array]",Yn="[object Uint8Array]",Hn="[object Uint8ClampedArray]",qn="[object Uint16Array]",Gn="[object Uint32Array]",y={};y[jn]=y[En]=y[In]=y[Fn]=y[zn]=y[Yn]=y[Hn]=y[qn]=y[Gn]=!0,y[wn]=y[xn]=y[Rn]=y[kn]=y[On]=y[Cn]=y[Sn]=y[Tn]=y[Bn]=y[An]=y[Dn]=y[Ln]=y[Mn]=y[Pn]=y[vn]=!1;function Un(e){return Y(e)&&nt(e.length)&&!!y[K(e)]}function Wn(e){return function(t){return e(t)}}var ut=typeof g=="object"&&g&&!g.nodeType&&g,Q=ut&&typeof module=="object"&&module&&!module.nodeType&&module,Xn=Q&&Q.exports===ut,_e=Xn&&Ye.process,Kn=function(){try{var e=Q&&Q.require&&Q.require("util").types;return e||_e&&_e.binding&&_e.binding("util")}catch(t){}}();const pt=Kn;var ht=pt&&pt.isTypedArray,Qn=ht?Wn(ht):Un;const gt=Qn;var Jn=Object.prototype,Zn=Jn.hasOwnProperty;function eo(e,t){var o=ne(e),l=!o&&Ne(e),d=!o&&!l&&ft(e),c=!o&&!l&&!d&&gt(e),s=o||l||d||c,r=s?hn(e.length,String):[],a=r.length;for(var i in e)(t||Zn.call(e,i))&&!(s&&(i=="length"||d&&(i=="offset"||i=="parent")||c&&(i=="buffer"||i=="byteLength"||i=="byteOffset")||tt(i,a)))&&r.push(i);return r}function to(e,t){return function(o){return e(t(o))}}function ro(e){var t=[];if(e!=null)for(var o in Object(e))t.push(o);return t}var no=Object.prototype,oo=no.hasOwnProperty;function ao(e){if(!M(e))return ro(e);var t=at(e),o=[];for(var l in e)l=="constructor"&&(t||!oo.call(e,l))||o.push(l);return o}function $t(e){return ye(e)?eo(e,!0):ao(e)}var io=be(Object,"create");const J=io;function lo(){this.__data__=J?J(null):{},this.size=0}function so(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var co="__lodash_hash_undefined__",fo=Object.prototype,uo=fo.hasOwnProperty;function po(e){var t=this.__data__;if(J){var o=t[e];return o===co?void 0:o}return uo.call(t,e)?t[e]:void 0}var ho=Object.prototype,go=ho.hasOwnProperty;function $o(e){var t=this.__data__;return J?t[e]!==void 0:go.call(t,e)}var bo="__lodash_hash_undefined__";function mo(e,t){var o=this.__data__;return this.size+=this.has(e)?0:1,o[e]=J&&t===void 0?bo:t,this}function E(e){var t=-1,o=e==null?0:e.length;for(this.clear();++t<o;){var l=e[t];this.set(l[0],l[1])}}E.prototype.clear=lo,E.prototype.delete=so,E.prototype.get=po,E.prototype.has=$o,E.prototype.set=mo;function yo(){this.__data__=[],this.size=0}function ie(e,t){for(var o=e.length;o--;)if(ae(e[o][0],t))return o;return-1}var No=Array.prototype,_o=No.splice;function Vo(e){var t=this.__data__,o=ie(t,e);if(o<0)return!1;var l=t.length-1;return o==l?t.pop():_o.call(t,o,1),--this.size,!0}function wo(e){var t=this.__data__,o=ie(t,e);return o<0?void 0:t[o][1]}function xo(e){return ie(this.__data__,e)>-1}function ko(e,t){var o=this.__data__,l=ie(o,e);return l<0?(++this.size,o.push([e,t])):o[l][1]=t,this}function v(e){var t=-1,o=e==null?0:e.length;for(this.clear();++t<o;){var l=e[t];this.set(l[0],l[1])}}v.prototype.clear=yo,v.prototype.delete=Vo,v.prototype.get=wo,v.prototype.has=xo,v.prototype.set=ko;var Co=be(j,"Map");const bt=Co;function So(){this.size=0,this.__data__={hash:new E,map:new(bt||v),string:new E}}function To(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}function le(e,t){var o=e.__data__;return To(t)?o[typeof t=="string"?"string":"hash"]:o.map}function Bo(e){var t=le(this,e).delete(e);return this.size-=t?1:0,t}function Ao(e){return le(this,e).get(e)}function Do(e){return le(this,e).has(e)}function Lo(e,t){var o=le(this,e),l=o.size;return o.set(e,t),this.size+=o.size==l?0:1,this}function H(e){var t=-1,o=e==null?0:e.length;for(this.clear();++t<o;){var l=e[t];this.set(l[0],l[1])}}H.prototype.clear=So,H.prototype.delete=Bo,H.prototype.get=Ao,H.prototype.has=Do,H.prototype.set=Lo;function Mo(e){return e==null?"":Xe(e)}var Po=to(Object.getPrototypeOf,Object);const mt=Po;var vo="[object Object]",Ro=Function.prototype,Oo=Object.prototype,yt=Ro.toString,jo=Oo.hasOwnProperty,Eo=yt.call(Object);function Io(e){if(!Y(e)||K(e)!=vo)return!1;var t=mt(e);if(t===null)return!0;var o=jo.call(t,"constructor")&&t.constructor;return typeof o=="function"&&o instanceof o&&yt.call(o)==Eo}function Fo(){this.__data__=new v,this.size=0}function zo(e){var t=this.__data__,o=t.delete(e);return this.size=t.size,o}function Yo(e){return this.__data__.get(e)}function Ho(e){return this.__data__.has(e)}var qo=200;function Go(e,t){var o=this.__data__;if(o instanceof v){var l=o.__data__;if(!bt||l.length<qo-1)return l.push([e,t]),this.size=++o.size,this;o=this.__data__=new H(l)}return o.set(e,t),this.size=o.size,this}function q(e){var t=this.__data__=new v(e);this.size=t.size}q.prototype.clear=Fo,q.prototype.delete=zo,q.prototype.get=Yo,q.prototype.has=Ho,q.prototype.set=Go;var Nt=typeof g=="object"&&g&&!g.nodeType&&g,_t=Nt&&typeof module=="object"&&module&&!module.nodeType&&module,Uo=_t&&_t.exports===Nt,Vt=Uo?j.Buffer:void 0,wt=Vt?Vt.allocUnsafe:void 0;function Wo(e,t){if(t)return e.slice();var o=e.length,l=wt?wt(o):new e.constructor(o);return e.copy(l),l}var Xo=j.Uint8Array;const xt=Xo;function Ko(e){var t=new e.constructor(e.byteLength);return new xt(t).set(new xt(e)),t}function Qo(e,t){var o=t?Ko(e.buffer):e.buffer;return new e.constructor(o,e.byteOffset,e.length)}function Jo(e){return typeof e.constructor=="function"&&!at(e)?Hr(mt(e)):{}}function Zo(e){return function(t,o,l){for(var d=-1,c=Object(t),s=l(t),r=s.length;r--;){var a=s[e?r:++d];if(o(c[a],a,c)===!1)break}return t}}var ea=Zo();const ta=ea;var ra=function(){return j.Date.now()};const Ve=ra;var na="Expected a function",oa=Math.max,aa=Math.min;function ia(e,t,o){var l,d,c,s,r,a,i=0,f=!1,p=!1,$=!0;if(typeof e!="function")throw new TypeError(na);t=pe(t)||0,M(o)&&(f=!!o.leading,p="maxWait"in o,c=p?oa(pe(o.maxWait)||0,t):c,$="trailing"in o?!!o.trailing:$);function N(h){var b=l,_=d;return l=d=void 0,i=h,s=e.apply(_,b),s}function P(h){return i=h,r=setTimeout(F,t),f?N(h):s}function I(h){var b=h-a,_=h-i,W=t-b;return p?aa(W,c-_):W}function L(h){var b=h-a,_=h-i;return a===void 0||b>=t||b<0||p&&_>=c}function F(){var h=Ve();if(L(h))return te(h);r=setTimeout(F,I(h))}function te(h){return r=void 0,$&&l?N(h):(l=d=void 0,s)}function fe(){r!==void 0&&clearTimeout(r),i=0,l=a=d=r=void 0}function ze(){return r===void 0?s:te(Ve())}function u(){var h=Ve(),b=L(h);if(l=arguments,d=this,a=h,b){if(r===void 0)return P(a);if(p)return clearTimeout(r),r=setTimeout(F,t),N(a)}return r===void 0&&(r=setTimeout(F,t)),s}return u.cancel=fe,u.flush=ze,u}function we(e,t,o){(o!==void 0&&!ae(e[t],o)||o===void 0&&!(t in e))&&me(e,t,o)}function la(e){return Y(e)&&ye(e)}function xe(e,t){if(!(t==="constructor"&&typeof e[t]=="function")&&t!="__proto__")return e[t]}function sa(e){return sn(e,$t(e))}function da(e,t,o,l,d,c,s){var r=xe(e,o),a=xe(t,o),i=s.get(a);if(i){we(e,o,i);return}var f=c?c(r,a,o+"",e,t,s):void 0,p=f===void 0;if(p){var $=ne(a),N=!$&&ft(a),P=!$&&!N&&gt(a);f=a,$||N||P?ne(r)?f=r:la(r)?f=Gr(r):N?(p=!1,f=Wo(a,!0)):P?(p=!1,f=Qo(a,!0)):f=[]:Io(a)||Ne(a)?(f=r,Ne(r)?f=sa(r):(!M(r)||ge(r))&&(f=Jo(a))):p=!1}p&&(s.set(a,f),d(f,a,l,c,s),s.delete(a)),we(e,o,f)}function kt(e,t,o,l,d){e!==t&&ta(t,function(c,s){if(d||(d=new q),M(c))da(e,t,s,o,kt,l,d);else{var r=l?l(xe(e,s),c,s+"",e,t,d):void 0;r===void 0&&(r=c),we(e,s,r)}},$t)}function ca(e,t){for(var o,l=-1,d=e.length;++l<d;){var c=t(e[l]);c!==void 0&&(o=o===void 0?c:o+c)}return o}var fa=un(function(e,t,o){kt(e,t,o)});const Ct=fa;var ua=Math.floor,pa=Math.random;function ha(e,t){return e+ua(pa()*(t-e+1))}var ga=parseFloat,$a=Math.min,ba=Math.random;function St(e,t,o){if(o&&typeof o!="boolean"&&ot(e,t,o)&&(t=o=void 0),o===void 0&&(typeof t=="boolean"?(o=t,t=void 0):typeof e=="boolean"&&(o=e,e=void 0)),e===void 0&&t===void 0?(e=0,t=1):(e=Je(e),t===void 0?(t=e,e=0):t=Je(t)),e>t){var l=e;e=t,t=l}if(o||e%1||t%1){var d=ba();return $a(e+d*(t-e+ga("1e-"+((d+"").length-1))),t)}return ha(e,t)}function Tt(e){return e&&e.length?ca(e,he):0}var ma=0;function ya(e){var t=++ma;return Mo(e)+t}function Na(e,t){const o=new MutationObserver(t);return o.observe(e,{attributes:!0,attributeFilter:["class","style"],attributeOldValue:!0}),o}function _a(e,t){const{clientWidth:o=0,clientHeight:l=0}=e||{};e?(!o||!l)&&console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!"):console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"),t.width=o,t.height=l}function w(){const e=n.ref(),t=[],o=n.reactive({width:0,height:0}),l=()=>{_a(e.value,o)},d=ia(l,100);return n.onMounted(()=>{l();const c=Na(e.value,d);window.addEventListener("resize",d),t.push(()=>{c.disconnect()},()=>{window.removeEventListener("resize",d)})}),n.onUnmounted(()=>{t.forEach(c=>c())}),{domRef:e,domSize:o}}function V(e){const t=e;return t.install=function(o){o.component(t.displayName||t.name,e)},e}const Bt=e=>e,Va=(e,t)=>{const o=Math.abs(e[0]-t[0]),l=Math.abs(e[1]-t[1]);return Math.sqrt(Math.pow(o,2)+Math.pow(l,2))};function R(e,t=[]){return Ct(e,t)}function T(){return{color:{type:Bt(Array),default:()=>[]},backgroundColor:{type:String,default:"transparent"}}}function B(e,t=[]){return Ct(e,t)}const A=m.div`
  position: relative;
  width: 100%;
  height: 100%;
`("border-box"),D=m.div`
  position: relative;
  width: 100%;
  height: 100%;
`("border-box-content"),wa=["#4fd2dd","#235fa7"],xa=["left-top","right-top","left-bottom","right-bottom"],At=m.svg`
  position: absolute;
  display: block;
}
.__STYLED__.right-top {
  right: 0px;
  transform: rotateY(180deg);
}
.__STYLED__.left-bottom {
  bottom: 0px;
  transform: rotateX(180deg);
}
.__STYLED__.right-bottom {
  right: 0px;
  bottom: 0px;
  transform: rotateX(180deg) rotateY(180deg);
`("border"),ka=V(n.defineComponent({name:"BorderBox1",props:T(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w();return()=>{const{color:d,backgroundColor:c}=e,{width:s,height:r}=l,a=B(wa,d);return n.createVNode(A,{class:S("border-box-1"),ref:i=>o.value=i.$el},{default:()=>[n.createVNode(At,{width:s,height:r},{default:()=>[n.createVNode("polygon",{fill:c,points:`10, 27 10, ${r-27} 13, ${r-24} 13, ${r-21} 24, ${r-11} 38, ${r-11}
                41, ${r-8} 73, ${r-8} 75, ${r-10} 81, ${r-10} 85, ${r-6}
                ${s-85}, ${r-6} ${s-81}, ${r-10} ${s-75}, ${r-10}
                ${s-73}, ${r-8} ${s-41}, ${r-8} ${s-38}, ${r-11}
                ${s-24}, ${r-11} ${s-13}, ${r-21} ${s-13}, ${r-24}
                ${s-10}, ${r-27} ${s-10}, 27 ${s-13}, 25 ${s-13}, 21
                ${s-24}, 11 ${s-38}, 11 ${s-41}, 8 ${s-73}, 8 ${s-75}, 10
                ${s-81}, 10 ${s-85}, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`},null)]}),xa.map(i=>n.createVNode(At,{key:i,width:"150",height:"150",class:i},{default:()=>[n.createVNode("polygon",{fill:a[0],points:"6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"},[n.createVNode("animate",{attributeName:"fill",values:`${a[0]};${a[1]};${a[0]}`,dur:"0.5s",begin:"0s",repeatCount:"indefinite"},null)]),n.createVNode("polygon",{fill:a[1],points:"27.6,4.8 38.4,4.8 35.4,7.8 30.6,7.8"},[n.createVNode("animate",{attributeName:"fill",values:`${a[1]};${a[0]};${a[1]}`,dur:"0.5s",begin:"0s",repeatCount:"indefinite"},null)]),n.createVNode("polygon",{fill:a[0],points:"9,54 9,63 7.2,66 7.2,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54"},[n.createVNode("animate",{attributeName:"fill",values:`${a[0]};${a[1]};transparent`,dur:"1s",begin:"0s",repeatCount:"indefinite"},null)])]})),n.createVNode(D,null,{default:()=>{var i;return[(i=t.default)==null?void 0:i.call(t)]}})]})}}})),Ca=["#fff","rgba(255, 255, 255, 0.6)"],Sa=m.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container"),Ta=V(n.defineComponent({name:"BorderBox2",props:T(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w();return()=>{const{color:d,backgroundColor:c}=e,{width:s,height:r}=l,a=B(Ca,d);return n.createVNode(A,{class:S("border-box-2"),ref:i=>o.value=i.$el},{default:()=>[n.createVNode(Sa,{width:s,height:r},{default:()=>[n.createVNode("polygon",{fill:c,points:`7, 7 ${s-7}, 7 ${s-7}, ${r-7} 7, ${r-7}`},null),n.createVNode("polyline",{stroke:a[0],points:`2, 2 ${s-2} ,2 ${s-2}, ${r-2} 2, ${r-2} 2, 2`},null),n.createVNode("polyline",{stroke:a[1],points:`6, 6 ${s-6}, 6 ${s-6}, ${r-6} 6, ${r-6} 6, 6`},null),n.createVNode("circle",{fill:a[0],cx:"11",cy:"11",r:"1"},null),n.createVNode("circle",{fill:a[0],cx:s-11,cy:"11",r:"1"},null),n.createVNode("circle",{fill:a[0],cx:s-11,cy:r-11,r:"1"},null),n.createVNode("circle",{fill:a[0],cx:"11",cy:r-11,r:"1"},null)]}),n.createVNode(D,null,{default:()=>{var i;return[n.createVNode("slot",null,[(i=t.default)==null?void 0:i.call(t)])]}})]})}}})),Ba=["#2862b7","#2862b7"],Aa=m.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
}
.__STYLED__ .stroke-width-1 {
  stroke-width: 1;
}
.__STYLED__ .stroke-width-3 {
  stroke-width: 3;
`("border-svg-container"),Da=V(n.defineComponent({name:"BorderBox3",props:T(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w();return()=>{const{color:d,backgroundColor:c}=e,{width:s,height:r}=l,a=B(Ba,d);return n.createVNode(A,{class:S("border-box-3"),ref:i=>o.value=i.$el},{default:()=>[n.createVNode(Aa,{width:s,height:r},{default:()=>[n.createVNode("polygon",{fill:c,points:`23, 23 ${s-24}, 23 ${s-24}, ${r-24} 23, ${r-24}`},null),n.createVNode("polyline",{class:"stroke-width-3",stroke:a[0],points:`4, 4 ${s-22} ,4 ${s-22}, ${r-22} 4, ${r-22} 4, 4`},null),n.createVNode("polyline",{class:"stroke-width-1",stroke:a[1],points:`10, 10 ${s-16}, 10 ${s-16}, ${r-16} 10, ${r-16} 10, 10`},null),n.createVNode("polyline",{class:"stroke-width-1",stroke:a[1],points:`16, 16 ${s-10}, 16 ${s-10}, ${r-10} 16, ${r-10} 16, 16`},null),n.createVNode("polyline",{class:"stroke-width-1",stroke:a[1],points:`22, 22 ${s-4}, 22 ${s-4}, ${r-4} 22, ${r-4} 22, 22`},null)]}),n.createVNode(D,null,{default:()=>{var i;return[n.createVNode("slot",null,[(i=t.default)==null?void 0:i.call(t)])]}})]})}}}));var Dt={exports:{}};(function(e){(function(){var t={}.hasOwnProperty;function o(){for(var l=[],d=0;d<arguments.length;d++){var c=arguments[d];if(!!c){var s=typeof c;if(s==="string"||s==="number")l.push(c);else if(Array.isArray(c)){if(c.length){var r=o.apply(null,c);r&&l.push(r)}}else if(s==="object"){if(c.toString!==Object.prototype.toString&&!c.toString.toString().includes("[native code]")){l.push(c.toString());continue}for(var a in c)t.call(c,a)&&c[a]&&l.push(a)}}}return l.join(" ")}e.exports?(o.default=o,e.exports=o):window.classNames=o})()})(Dt);const ke=Dt.exports,La=["red","rgba(0,0,255,0.8)"],Ma=m.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
}
.__STYLED__.reverse {
  transform: rotate(180deg);
}
.__STYLED__ .stroke-width1 {
  stroke-width: 1;
}
.__STYLED__ .stroke-width3 {
  stroke-width: 3px;
  stroke-linecap: round;
`("border-svg-container"),Pa=()=>re(k({},T()),{reverse:{type:Boolean,default:!1}}),va=V(n.defineComponent({name:"BorderBox4",props:Pa(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w();return()=>{const{color:d,backgroundColor:c,reverse:s}=e,{width:r,height:a}=l,i=B(La,d);return n.createVNode(A,{class:S("border-box-4"),ref:f=>o.value=f.$el},{default:()=>[n.createVNode(Ma,{class:ke({reverse:s}),width:r,height:a},{default:()=>[n.createVNode("polygon",{fill:c,points:`${r-15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
                16, 42 16, ${a-32} 41, ${a-7} ${r-15}, ${a-7}`},null),n.createVNode("polyline",{class:"stroke-width1",stroke:i[0],points:`145, ${a-5} 40, ${a-5} 10, ${a-35} 10, 40 40, 5 150, 5 170, 20 ${r-15}, 20`},null),n.createVNode("polyline",{stroke:i[1],class:"stroke-width1",points:`245, ${a-1} 36, ${a-1} 14, ${a-23} 14, ${a-100}`},null),n.createVNode("polyline",{class:"stroke-width3",stroke:i[0],points:`7, ${a-40} 7, ${a-75}`},null),n.createVNode("polyline",{class:"stroke-width3",stroke:i[0],points:"28, 24 13, 41 13, 64"},null),n.createVNode("polyline",{class:"stroke-width1",stroke:i[0],points:"5, 45 5, 140"},null),n.createVNode("polyline",{class:"stroke-width1",stroke:i[1],points:"14, 75 14, 180"},null),n.createVNode("polyline",{class:"stroke-width1",stroke:i[1],points:"55, 11 147, 11 167, 26 250, 26"},null),n.createVNode("polyline",{class:"stroke-width3",stroke:i[1],points:"158, 5 173, 16"},null),n.createVNode("polyline",{class:"stroke-width3",style:{strokeDasharray:"100 250"},stroke:i[0],points:`200, 17 ${r-10}, 17`},null),n.createVNode("polyline",{class:"stroke-width1",style:{strokeDasharray:"80 270"},stroke:i[1],points:`385, 17 ${r-10}, 17`},null)]}),n.createVNode(D,null,{default:()=>{var f;return[n.createVNode("slot",null,[(f=t.default)==null?void 0:f.call(t)])]}})]})}}})),Ra=["rgba(255, 255, 255, 0.35)","rgba(255, 255, 255, 0.20)"],Oa=m.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.__STYLED__ > polyline {
  fill: none;
}
.__STYLED__.reverse {
  transform: rotate(180deg);
}
.__STYLED__ .stroke-width1 {
  stroke-width: 1;
}
.__STYLED__ .stroke-width2 {
  stroke-width: 2px;
}
.__STYLED__ .stroke-width5 {
  stroke-width: 5px;
`("border-svg-container"),ja=()=>re(k({},T()),{reverse:{type:Boolean,default:!1}}),Ea=V(n.defineComponent({name:"BorderBox5",props:ja(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w();return()=>{const{color:d,backgroundColor:c,reverse:s}=e,{width:r,height:a}=l,i=B(Ra,d);return n.createVNode(A,{class:S("border-box-5"),ref:f=>o.value=f.$el},{default:()=>[n.createVNode(Oa,{class:ke({reverse:s}),width:r,height:a},{default:()=>[n.createVNode("polygon",{fill:c,points:`
                  10, 22 ${r-22}, 22 ${r-22}, ${a-86} ${r-84}, ${a-24} 10, ${a-24}`},null),n.createVNode("polyline",{class:"stroke-width1",stroke:i[0],points:`8, 5 ${r-5}, 5 ${r-5}, ${a-100}
                  ${r-100}, ${a-5} 8, ${a-5} 8, 5`},null),n.createVNode("polyline",{class:"stroke-width1",stroke:i[1],points:`3, 5 ${r-20}, 5 ${r-20}, ${a-60}
                  ${r-74}, ${a-5} 3, ${a-5} 3, 5`},null),n.createVNode("polyline",{class:"stroke-width5",stroke:i[1],points:`50, 13 ${r-35}, 13`},null),n.createVNode("polyline",{class:"stroke-width2",stroke:i[1],points:`15, 20 ${r-35}, 20`},null),n.createVNode("polyline",{class:"stroke-width2",stroke:i[1],points:`15, ${a-20} ${r-110}, ${a-20}`},null),n.createVNode("polyline",{class:"stroke-width5",stroke:i[1],points:`15, ${a-13} ${r-110}, ${a-13}`},null)]}),n.createVNode(D,null,{default:()=>{var f;return[n.createVNode("slot",null,[(f=t.default)==null?void 0:f.call(t)])]}})]})}}})),Ia=["rgba(255, 255, 255, 0.35)","gray"],Fa=m.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container"),za=V(n.defineComponent({name:"BorderBox6",props:T(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w();return()=>{const{color:d,backgroundColor:c}=e,{width:s,height:r}=l,a=B(Ia,d);return n.createVNode(A,{class:S("border-box-6"),ref:i=>o.value=i.$el},{default:()=>[n.createVNode(Fa,{width:s,height:r},{default:()=>[n.createVNode("polygon",{fill:c,points:`
              9, 7 ${s-9}, 7 ${s-9}, ${r-7} 9, ${r-7}`},null),n.createVNode("circle",{fill:a[1],cx:"5",cy:"5",r:"2"},null),n.createVNode("circle",{fill:a[1],cx:s-5,cy:"5",r:"2"},null),n.createVNode("circle",{fill:a[1],cx:s-5,cy:r-5,r:"2"},null),n.createVNode("circle",{fill:a[1],cx:"5",cy:r-5,r:"2"},null),n.createVNode("polyline",{stroke:a[0],points:`10, 4 ${s-10}, 4`},null),n.createVNode("polyline",{stroke:a[0],points:`10, ${r-4} ${s-10}, ${r-4}`},null),n.createVNode("polyline",{stroke:a[0],points:`5, 70 5, ${r-70}`},null),n.createVNode("polyline",{stroke:a[0],points:`${s-5}, 70 ${s-5}, ${r-70}`},null),n.createVNode("polyline",{stroke:a[0],points:"3, 10, 3, 50"},null),n.createVNode("polyline",{stroke:a[0],points:"7, 30 7, 80"},null),n.createVNode("polyline",{stroke:a[0],points:`${s-3}, 10 ${s-3}, 50`},null),n.createVNode("polyline",{stroke:a[0],points:`${s-7}, 30 ${s-7}, 80`},null),n.createVNode("polyline",{stroke:a[0],points:`3, ${r-10} 3, ${r-50}`},null),n.createVNode("polyline",{stroke:a[0],points:`7, ${r-30} 7, ${r-80}`},null),n.createVNode("polyline",{stroke:a[0],points:`${s-3}, ${r-10} ${s-3}, ${r-50}`},null),n.createVNode("polyline",{stroke:a[0],points:`${s-7}, ${r-30} ${s-7}, ${r-80}`},null)]}),n.createVNode(D,null,{default:()=>{var i;return[n.createVNode("slot",null,[(i=t.default)==null?void 0:i.call(t)])]}})]})}}})),Ya=["rgba(128,128,128,0.3)","rgba(128,128,128,0.5)"],Ha=m.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-linecap: round;
}
.__STYLED__ .stroke-width2 {
  stroke-width: 2px;
}
.__STYLED__ .stroke-width5 {
  stroke-width: 5px;
`("border-svg-container"),qa=V(n.defineComponent({name:"BorderBox7",props:T(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w();return()=>{const{color:d,backgroundColor:c}=e,{width:s,height:r}=l,a=B(Ya,d);return n.createVNode(A,{class:S("border-box-7"),ref:i=>o.value=i.$el,style:{boxShadow:`inset 0 0 40px ${a[0]}`,border:`1px solid ${a[0]}`,backgroundColor:c}},{default:()=>[n.createVNode(Ha,{width:s,height:r},{default:()=>[n.createVNode("polyline",{class:"stroke-width2",stroke:a[0],points:"0, 25 0, 0 25, 0"},null),n.createVNode("polyline",{class:"stroke-width2",stroke:a[0],points:`${s-25}, 0 ${s}, 0 ${s}, 25`},null),n.createVNode("polyline",{class:"stroke-width2",stroke:a[0],points:`${s-25}, ${r} ${s}, ${r} ${s}, ${r-25}`},null),n.createVNode("polyline",{class:"stroke-width2",stroke:a[0],points:`0, ${r-25} 0, ${r} 25, ${r}`},null),n.createVNode("polyline",{class:"stroke-width5",stroke:a[1],points:"0, 10 0, 0 10, 0"},null),n.createVNode("polyline",{class:"stroke-width5",stroke:a[1],points:`${s-10}, 0 ${s}, 0 ${s}, 10`},null),n.createVNode("polyline",{class:"stroke-width5",stroke:a[1],points:`${s-10}, ${r} ${s}, ${r} ${s}, ${r-10}`},null),n.createVNode("polyline",{class:"stroke-width5",stroke:a[1],points:`0, ${r-10} 0, ${r} 10, ${r}`},null)]}),n.createVNode(D,null,{default:()=>{var i;return[n.createVNode("slot",null,[(i=t.default)==null?void 0:i.call(t)])]}})]})}}}));function se(){return n.readonly(n.reactive({id:ya("datav_uuid")}))}const Ga=["#235fa7","#4fd2dd"],Ua=m.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
`("border-svg-container"),Wa=()=>re(k({},T()),{dur:{type:Number,default:3},reverse:{type:Boolean,default:!1}}),Xa=V(n.defineComponent({name:"BorderBox8",props:Wa(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w(),d=se();return()=>{const{color:c,backgroundColor:s,dur:r,reverse:a}=e,{width:i,height:f}=l,p=B(Ga,c),$=`border-box-8-path-${d.id}`,N=`border-box-8-gradient-${d.id}`,P=`border-box-8-mask-${d.id}`,I=a?`M 2.5, 2.5 L 2.5, ${f-2.5} L ${i-2.5}, ${f-2.5} L ${i-2.5}, 2.5 L 2.5, 2.5`:`M2.5, 2.5 L${i-2.5}, 2.5 L${i-2.5}, ${f-2.5} L2.5, ${f-2.5} L2.5, 2.5`;return n.createVNode(A,{class:S("border-box-8"),ref:L=>o.value=L.$el},{default:()=>[n.createVNode(Ua,{width:i,height:f},{default:()=>[n.createVNode("defs",null,[n.createVNode("path",{id:$,d:I,fill:"transparent"},null),n.createVNode("radialGradient",{id:N,cx:"50%",cy:"50%",r:"50%"},[n.createVNode("stop",{offset:"0%","stop-color":"#fff","stop-opacity":"1"},null),n.createVNode("stop",{offset:"100%","stop-color":"#fff","stop-opacity":"0"},null)]),n.createVNode("mask",{id:P},[n.createVNode("circle",{cx:"0",cy:"0",r:"150",fill:`url(#${N})`},[n.createVNode("animateMotion",{dur:`${r}s`,path:I,rotate:"auto",repeatCount:"indefinite"},null)])])]),n.createVNode("polygon",{fill:s,points:`5, 5 ${i-5}, 5 ${i-5} ${f-5} 5, ${f-5}`},null),n.createVNode("use",{stroke:p[0],"stroke-width":"1","xlink:href":`#${$}`},null),n.createVNode("use",{stroke:p[1],"stroke-width":"3","xlink:href":`#${$}`,mask:`url(#${P})`},[n.createVNode("animate",{attributeName:"stroke-dasharray",from:`0, ${length}`,to:`${length}, 0`,dur:`${r}s`,repeatCount:"indefinite"},null)])]}),n.createVNode(D,null,{default:()=>{var L;return[n.createVNode("slot",null,[(L=t.default)==null?void 0:L.call(t)])]}})]})}}})),Ka=["#11eefd","#0078d2"],Qa=m.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
`("border-svg-container"),Ja=V(n.defineComponent({name:"BorderBox9",props:T(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w(),d=se();return()=>{const{color:c,backgroundColor:s}=e,{width:r,height:a}=l,i=B(Ka,c),f=`border-box-9-gradient-${d.id}`,p=`border-box-9-mask-${d.id}`;return n.createVNode(A,{class:S("border-box-9"),ref:$=>o.value=$.$el},{default:()=>[n.createVNode(Qa,{width:r,height:a},{default:()=>[n.createVNode("defs",null,[n.createVNode("linearGradient",{id:f,x1:"0%",y1:"0%",x2:"100%",y2:"100%"},[n.createVNode("animate",{attributeName:"x1",values:"0%;100%;0%",dur:"10s",begin:"0s",repeatCount:"indefinite"},null),n.createVNode("animate",{attributeName:"x2",values:"100%;0%;100%",dur:"10s",begin:"0s",repeatCount:"indefinite"},null),n.createVNode("stop",{offset:"0%","stop-color":i[0]},[n.createVNode("animate",{attributeName:"stop-color",values:`${i[0]};${i[1]};${i[0]}`,dur:"10s",begin:"0s",repeatCount:"indefinite"},null)]),n.createVNode("stop",{offset:"100%","stop-color":i[1]},[n.createVNode("animate",{attributeName:"stop-color",values:`${i[1]};${i[0]};${i[1]}`,dur:"10s",begin:"0s",repeatCount:"indefinite"},null)])]),n.createVNode("mask",{id:p},[n.createVNode("polyline",{stroke:"#fff","stroke-width":"3",fill:"transparent",points:`8, ${a*.4} 8, 3, ${r*.4+7}, 3`},null),n.createVNode("polyline",{fill:"#fff",points:`
                      8, ${a*.15} 8, 3, ${r*.1+7}, 3
                      ${r*.1}, 8 14, 8 14, ${a*.15-7}
                    `},null),n.createVNode("polyline",{stroke:"#fff","stroke-width":"3",fill:"transparent",points:`${r*.5}, 3 ${r-3}, 3, ${r-3}, ${a*.25}`},null),n.createVNode("polyline",{fill:"#fff",points:`
                      ${r*.52}, 3 ${r*.58}, 3
                      ${r*.58-7}, 9 ${r*.52+7}, 9
                    `},null),n.createVNode("polyline",{fill:"#fff",points:`
                      ${r*.9}, 3 ${r-3}, 3 ${r-3}, ${a*.1}
                      ${r-9}, ${a*.1-7} ${r-9}, 9 ${r*.9+7}, 9
                    `},null),n.createVNode("polyline",{stroke:"#fff","stroke-width":"3",fill:"transparent",points:`8, ${a*.5} 8, ${a-3} ${r*.3+7}, ${a-3}`},null),n.createVNode("polyline",{fill:"#fff",points:`
                      8, ${a*.55} 8, ${a*.7}
                      2, ${a*.7-7} 2, ${a*.55+7}
                    `},null),n.createVNode("polyline",{stroke:"#fff","stroke-width":"3",fill:"transparent",points:`${r*.35}, ${a-3} ${r-3}, ${a-3} ${r-3}, ${a*.35}`},null),n.createVNode("polyline",{fill:"#fff",points:`
                      ${r*.92}, ${a-3} ${r-3}, ${a-3} ${r-3}, ${a*.8} ${r-9}, ${a*.8+7} ${r-9}, ${a-9} ${r*.92+7}, ${a-9}`},null)])]),n.createVNode("polygon",{fill:s,points:`
                  15, 9 ${r*.1+1}, 9 ${r*.1+4}, 6 ${r*.52+2}, 6
                  ${r*.52+6}, 10 ${r*.58-7}, 10 ${r*.58-2}, 6
                  ${r*.9+2}, 6 ${r*.9+6}, 10 ${r-10}, 10 ${r-10}, ${a*.1-6}
                  ${r-6}, ${a*.1-1} ${r-6}, ${a*.8+1} ${r-10}, ${a*.8+6}
                  ${r-10}, ${a-10} ${r*.92+7}, ${a-10}  ${r*.92+2}, ${a-6}
                  11, ${a-6} 11, ${a*.15-2} 15, ${a*.15-7}
                `},null),n.createVNode("rect",{x:"0",y:"0",width:r,height:a,fill:`url(#${f})`,mask:`url(#${p})`},null)]}),n.createVNode(D,null,{default:()=>{var $;return[n.createVNode("slot",null,[($=t.default)==null?void 0:$.call(t)])]}})]})}}})),Za=["#1d48c4","#d3e1f8"],ei=["left-top","right-top","left-bottom","right-bottom"],Lt=m.svg`
  position: absolute;
  display: block;
}
.__STYLED__.right-top {
  right: 0px;
  transform: rotateY(180deg);
}
.__STYLED__.left-bottom {
  bottom: 0px;
  transform: rotateX(180deg);
}
.__STYLED__.right-bottom {
  right: 0px;
  bottom: 0px;
  transform: rotateX(180deg) rotateY(180deg);
`("border-svg-container"),ti=V(n.defineComponent({name:"BorderBox10",props:T(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w();return()=>{const{width:d,height:c}=l,{backgroundColor:s,color:r}=e,a=B(Za,r);return n.createVNode(A,{class:S("border-box-10"),ref:i=>o.value=i.$el,style:{boxShadow:`inset 0 0 25px 3px ${a[0]}`}},{default:()=>[n.createVNode(Lt,{width:d,height:c},{default:()=>[n.createVNode("polygon",{fill:s,points:`
                  4, 0 ${d-4}, 0 ${d}, 4 ${d}, ${c-4} ${d-4}, ${c}
                  4, ${c} 0, ${c-4} 0, 4
                `},null)]}),ei.map(i=>n.createVNode(Lt,{width:"150px",height:"150px",key:i,class:i},{default:()=>[n.createVNode("polygon",{fill:a[1],points:"40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"},null)]})),n.createVNode(D,null,{default:()=>{var i;return[n.createVNode("slot",null,[(i=t.default)==null?void 0:i.call(t)])]}})]})}}}));var G={},Mt={exports:{}};(function(e){function t(o){return o&&o.__esModule?o:{default:o}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Mt);var Ce={exports:{}},Se={exports:{}},Te={exports:{}},Pt;function vt(){return Pt||(Pt=1,function(e){function t(o,l){(l==null||l>o.length)&&(l=o.length);for(var d=0,c=new Array(l);d<l;d++)c[d]=o[d];return c}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(Te)),Te.exports}var Rt;function ri(){return Rt||(Rt=1,function(e){var t=vt();function o(l){if(Array.isArray(l))return t(l)}e.exports=o,e.exports.__esModule=!0,e.exports.default=e.exports}(Se)),Se.exports}var Be={exports:{}},Ot;function ni(){return Ot||(Ot=1,function(e){function t(o){if(typeof Symbol!="undefined"&&o[Symbol.iterator]!=null||o["@@iterator"]!=null)return Array.from(o)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(Be)),Be.exports}var Ae={exports:{}},jt;function oi(){return jt||(jt=1,function(e){var t=vt();function o(l,d){if(!!l){if(typeof l=="string")return t(l,d);var c=Object.prototype.toString.call(l).slice(8,-1);if(c==="Object"&&l.constructor&&(c=l.constructor.name),c==="Map"||c==="Set")return Array.from(l);if(c==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c))return t(l,d)}}e.exports=o,e.exports.__esModule=!0,e.exports.default=e.exports}(Ae)),Ae.exports}var De={exports:{}},Et;function ai(){return Et||(Et=1,function(e){function t(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(De)),De.exports}var It;function ii(){return It||(It=1,function(e){var t=ri(),o=ni(),l=oi(),d=ai();function c(s){return t(s)||o(s)||l(s)||d()}e.exports=c,e.exports.__esModule=!0,e.exports.default=e.exports}(Ce)),Ce.exports}var Le={},Ft;function li(){return Ft||(Ft=1,function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=new Map([["transparent","rgba(0,0,0,0)"],["black","#000000"],["silver","#C0C0C0"],["gray","#808080"],["white","#FFFFFF"],["maroon","#800000"],["red","#FF0000"],["purple","#800080"],["fuchsia","#FF00FF"],["green","#008000"],["lime","#00FF00"],["olive","#808000"],["yellow","#FFFF00"],["navy","#000080"],["blue","#0000FF"],["teal","#008080"],["aqua","#00FFFF"],["aliceblue","#f0f8ff"],["antiquewhite","#faebd7"],["aquamarine","#7fffd4"],["azure","#f0ffff"],["beige","#f5f5dc"],["bisque","#ffe4c4"],["blanchedalmond","#ffebcd"],["blueviolet","#8a2be2"],["brown","#a52a2a"],["burlywood","#deb887"],["cadetblue","#5f9ea0"],["chartreuse","#7fff00"],["chocolate","#d2691e"],["coral","#ff7f50"],["cornflowerblue","#6495ed"],["cornsilk","#fff8dc"],["crimson","#dc143c"],["cyan","#00ffff"],["darkblue","#00008b"],["darkcyan","#008b8b"],["darkgoldenrod","#b8860b"],["darkgray","#a9a9a9"],["darkgreen","#006400"],["darkgrey","#a9a9a9"],["darkkhaki","#bdb76b"],["darkmagenta","#8b008b"],["darkolivegreen","#556b2f"],["darkorange","#ff8c00"],["darkorchid","#9932cc"],["darkred","#8b0000"],["darksalmon","#e9967a"],["darkseagreen","#8fbc8f"],["darkslateblue","#483d8b"],["darkslategray","#2f4f4f"],["darkslategrey","#2f4f4f"],["darkturquoise","#00ced1"],["darkviolet","#9400d3"],["deeppink","#ff1493"],["deepskyblue","#00bfff"],["dimgray","#696969"],["dimgrey","#696969"],["dodgerblue","#1e90ff"],["firebrick","#b22222"],["floralwhite","#fffaf0"],["forestgreen","#228b22"],["gainsboro","#dcdcdc"],["ghostwhite","#f8f8ff"],["gold","#ffd700"],["goldenrod","#daa520"],["greenyellow","#adff2f"],["grey","#808080"],["honeydew","#f0fff0"],["hotpink","#ff69b4"],["indianred","#cd5c5c"],["indigo","#4b0082"],["ivory","#fffff0"],["khaki","#f0e68c"],["lavender","#e6e6fa"],["lavenderblush","#fff0f5"],["lawngreen","#7cfc00"],["lemonchiffon","#fffacd"],["lightblue","#add8e6"],["lightcoral","#f08080"],["lightcyan","#e0ffff"],["lightgoldenrodyellow","#fafad2"],["lightgray","#d3d3d3"],["lightgreen","#90ee90"],["lightgrey","#d3d3d3"],["lightpink","#ffb6c1"],["lightsalmon","#ffa07a"],["lightseagreen","#20b2aa"],["lightskyblue","#87cefa"],["lightslategray","#778899"],["lightslategrey","#778899"],["lightsteelblue","#b0c4de"],["lightyellow","#ffffe0"],["limegreen","#32cd32"],["linen","#faf0e6"],["magenta","#ff00ff"],["mediumaquamarine","#66cdaa"],["mediumblue","#0000cd"],["mediumorchid","#ba55d3"],["mediumpurple","#9370db"],["mediumseagreen","#3cb371"],["mediumslateblue","#7b68ee"],["mediumspringgreen","#00fa9a"],["mediumturquoise","#48d1cc"],["mediumvioletred","#c71585"],["midnightblue","#191970"],["mintcream","#f5fffa"],["mistyrose","#ffe4e1"],["moccasin","#ffe4b5"],["navajowhite","#ffdead"],["oldlace","#fdf5e6"],["olivedrab","#6b8e23"],["orange","#ffa500"],["orangered","#ff4500"],["orchid","#da70d6"],["palegoldenrod","#eee8aa"],["palegreen","#98fb98"],["paleturquoise","#afeeee"],["palevioletred","#db7093"],["papayawhip","#ffefd5"],["peachpuff","#ffdab9"],["peru","#cd853f"],["pink","#ffc0cb"],["plum","#dda0dd"],["powderblue","#b0e0e6"],["rosybrown","#bc8f8f"],["royalblue","#4169e1"],["saddlebrown","#8b4513"],["salmon","#fa8072"],["sandybrown","#f4a460"],["seagreen","#2e8b57"],["seashell","#fff5ee"],["sienna","#a0522d"],["skyblue","#87ceeb"],["slateblue","#6a5acd"],["slategray","#708090"],["slategrey","#708090"],["snow","#fffafa"],["springgreen","#00ff7f"],["steelblue","#4682b4"],["tan","#d2b48c"],["thistle","#d8bfd8"],["tomato","#ff6347"],["turquoise","#40e0d0"],["violet","#ee82ee"],["wheat","#f5deb3"],["whitesmoke","#f5f5f5"],["yellowgreen","#9acd32"]]);e.default=t}(Le)),Le}(function(e){var t=Mt.exports;Object.defineProperty(e,"__esModule",{value:!0}),e.getRgbValue=i,e.getRgbaValue=$,e.getOpacity=N,e.toRgb=P,e.toHex=I,e.getColorFromRgbValue=L,e.darken=F,e.lighten=te,e.fade=fe,e.default=void 0;var o=t(ii()),l=t(li()),d=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,c=/^(rgb|rgba|RGB|RGBA)/,s=/^(rgba|RGBA)/;function r(u){var h=d.test(u),b=c.test(u);return h||b?u:(u=a(u),u||(console.error("Color: Invalid color!"),!1))}function a(u){return u?l.default.has(u)?l.default.get(u):!1:(console.error("getColorByKeywords: Missing parameters!"),!1)}function i(u){if(!u)return console.error("getRgbValue: Missing parameters!"),!1;if(u=r(u),!u)return!1;var h=d.test(u),b=c.test(u),_=u.toLowerCase();if(h)return f(_);if(b)return p(_)}function f(u){return u=u.replace("#",""),u.length===3&&(u=Array.from(u).map(function(h){return h+h}).join("")),u=u.split(""),new Array(3).fill(0).map(function(h,b){return parseInt("0x".concat(u[b*2]).concat(u[b*2+1]))})}function p(u){return u.replace(/rgb\(|rgba\(|\)/g,"").split(",").slice(0,3).map(function(h){return parseInt(h)})}function $(u){if(!u)return console.error("getRgbaValue: Missing parameters!"),!1;var h=i(u);return h?(h.push(N(u)),h):!1}function N(u){if(!u)return console.error("getOpacity: Missing parameters!"),!1;if(u=r(u),!u)return!1;var h=s.test(u);return h?(u=u.toLowerCase(),Number(u.split(",").slice(-1)[0].replace(/[)|\s]/g,""))):1}function P(u,h){if(!u)return console.error("toRgb: Missing parameters!"),!1;var b=i(u);if(!b)return!1;var _=typeof h=="number";return _?"rgba("+b.join(",")+",".concat(h,")"):"rgb("+b.join(",")+")"}function I(u){return u?d.test(u)?u:(u=i(u),u?"#"+u.map(function(h){return Number(h).toString(16)}).map(function(h){return h==="0"?"00":h}).join(""):!1):(console.error("toHex: Missing parameters!"),!1)}function L(u){if(!u)return console.error("getColorFromRgbValue: Missing parameters!"),!1;var h=u.length;if(h!==3&&h!==4)return console.error("getColorFromRgbValue: Value is illegal!"),!1;var b=h===3?"rgb(":"rgba(";return b+=u.join(",")+")",b}function F(u){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;if(!u)return console.error("darken: Missing parameters!"),!1;var b=$(u);return b?(b=b.map(function(_,W){return W===3?_:_-Math.ceil(2.55*h)}).map(function(_){return _<0?0:_}),L(b)):!1}function te(u){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;if(!u)return console.error("lighten: Missing parameters!"),!1;var b=$(u);return b?(b=b.map(function(_,W){return W===3?_:_+Math.ceil(2.55*h)}).map(function(_){return _>255?255:_}),L(b)):!1}function fe(u){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;if(!u)return console.error("fade: Missing parameters!"),!1;var b=i(u);if(!b)return!1;var _=[].concat((0,o.default)(b),[h/100]);return L(_)}var ze={fade:fe,toHex:I,toRgb:P,darken:F,lighten:te,getOpacity:N,getRgbValue:i,getRgbaValue:$,getColorFromRgbValue:L};e.default=ze})(G);const zt=["#8aaafb","#1f33a2"],si=m.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container"),di=()=>re(k({},T()),{titleWidth:{type:Number,default:250},title:{type:String,default:""}}),ci=V(n.defineComponent({name:"BorderBox11",props:di(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w(),d=se();return()=>{const{color:c,backgroundColor:s,titleWidth:r,title:a}=e,{width:i,height:f}=l,p=B(zt,c),$=`border-box-11-filterId-${d}`;return n.createVNode(A,{class:S("border-box-11"),ref:N=>o.value=N.$el},{default:()=>[n.createVNode(si,{width:i,height:f},{default:()=>[n.createVNode("defs",null,[n.createVNode("filter",{id:$,height:"150%",width:"150%",x:"-25%",y:"-25%"},[n.createVNode("feMorphology",{operator:"dilate",radius:"2",in:"SourceAlpha",result:"thicken"},null),n.createVNode("feGaussianBlur",{in:"thicken",stdDeviation:"3",result:"blurred"},null),n.createVNode("feFlood",{"flood-color":p[1],result:"glowColor"},null),n.createVNode("feComposite",{in:"glowColor",in2:"blurred",operator:"in",result:"softGlowColored"},null),n.createVNode("feMerge",null,[n.createVNode("feMergeNode",{in:"softGlowColored"},null),n.createVNode("feMergeNode",{in:"SourceGraphic"},null)])])]),n.createVNode("polygon",{fill:s,points:`
                  20, 32 ${i*.5-r/2}, 32 ${i*.5-r/2+20}, 53
                  ${i*.5+r/2-20}, 53 ${i*.5+r/2}, 32
                  ${i-20}, 32 ${i-8}, 48 ${i-8}, ${f-25} ${i-20}, ${f-8}
                  20, ${f-8} 8, ${f-25} 8, 50
                `},null),n.createVNode("polyline",{stroke:p[0],filter:`url(#${$})`,points:`
                  ${(i-r)/2}, 30
                  20, 30 7, 50 7, ${50+(f-167)/2}
                  13, ${55+(f-167)/2} 13, ${135+(f-167)/2}
                  7, ${140+(f-167)/2} 7, ${f-27}
                  20, ${f-7} ${i-20}, ${f-7} ${i-7}, ${f-27}
                  ${i-7}, ${140+(f-167)/2} ${i-13}, ${135+(f-167)/2}
                  ${i-13}, ${55+(f-167)/2} ${i-7}, ${50+(f-167)/2}
                  ${i-7}, 50 ${i-20}, 30 ${(i+r)/2}, 30
                  ${(i+r)/2-20}, 7 ${(i-r)/2+20}, 7
                  ${(i-r)/2}, 30 ${(i-r)/2+20}, 52
                  ${(i+r)/2-20}, 52 ${(i+r)/2}, 30
                `},null),n.createVNode("polygon",{stroke:p[0],fill:"transparent",points:`
                  ${(i+r)/2-5}, 30 ${(i+r)/2-21}, 11
                  ${(i+r)/2-27}, 11 ${(i+r)/2-8}, 34
                `},null),n.createVNode("polygon",{stroke:p[0],fill:"transparent",points:`
                  ${(i-r)/2+5}, 30 ${(i-r)/2+22}, 49
                  ${(i-r)/2+28}, 49 ${(i-r)/2+8}, 26
                `},null),n.createVNode("polygon",{stroke:p[0],fill:G.fade(p[1]||zt[1],30),filter:`url(#${$})`,points:`
                  ${(i+r)/2-11}, 37 ${(i+r)/2-32}, 11
                  ${(i-r)/2+23}, 11 ${(i-r)/2+11}, 23
                  ${(i-r)/2+33}, 49 ${(i+r)/2-22}, 49
                `},null),n.createVNode("polygon",{filter:`url(#${$})`,fill:p[0],opacity:"1",points:`
                  ${(i-r)/2-10}, 37 ${(i-r)/2-31}, 37
                  ${(i-r)/2-25}, 46 ${(i-r)/2-4}, 46
                `},[n.createVNode("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n.createVNode("polygon",{filter:`url(#${$})`,fill:p[0],opacity:"0.7",points:`
                  ${(i-r)/2-40}, 37 ${(i-r)/2-61}, 37
                  ${(i-r)/2-55}, 46 ${(i-r)/2-34}, 46
                `},[n.createVNode("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n.createVNode("polygon",{filter:`url(#${$})`,fill:p[0],opacity:"0.5",points:`
                  ${(i-r)/2-70}, 37 ${(i-r)/2-91}, 37
                  ${(i-r)/2-85}, 46 ${(i-r)/2-64}, 46
                `},[n.createVNode("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n.createVNode("polygon",{filter:`url(#${$})`,fill:p[0],opacity:"1",points:`
                  ${(i+r)/2+30}, 37 ${(i+r)/2+9}, 37
                  ${(i+r)/2+3}, 46 ${(i+r)/2+24}, 46
                `},[n.createVNode("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n.createVNode("polygon",{filter:`url(#${$})`,fill:p[0],opacity:"0.7",points:`
                  ${(i+r)/2+60}, 37 ${(i+r)/2+39}, 37
                  ${(i+r)/2+33}, 46 ${(i+r)/2+54}, 46
                `},[n.createVNode("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n.createVNode("polygon",{filter:`url(#${$})`,fill:p[0],opacity:"0.5",points:`
                  ${(i+r)/2+90}, 37 ${(i+r)/2+69}, 37
                  ${(i+r)/2+63}, 46 ${(i+r)/2+84}, 46
                `},[n.createVNode("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n.createVNode("text",{class:"dv-border-box-11-title",x:`${i/2}`,y:"32",fill:"#fff","font-size":"18","text-anchor":"middle","dominant-baseline":"middle"},[a]),n.createVNode("polygon",{fill:p[0],filter:`url(#${$})`,points:`
                  7, ${53+(f-167)/2} 11, ${57+(f-167)/2}
                  11, ${133+(f-167)/2} 7, ${137+(f-167)/2}
                `},null),n.createVNode("polygon",{fill:p[0],filter:`url(#${$})`,points:`
                  ${i-7}, ${53+(f-167)/2} ${i-11}, ${57+(f-167)/2}
                  ${i-11}, ${133+(f-167)/2} ${i-7}, ${137+(f-167)/2}
                `},null)]}),n.createVNode(D,null,{default:()=>{var N;return[n.createVNode("slot",null,[(N=t.default)==null?void 0:N.call(t)])]}})]})}}})),Z=["#2e6099","#7ce7fd"],fi=m.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`("border-svg-container"),ui=V(n.defineComponent({name:"BorderBox12",props:T(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w(),d=se();return()=>{const{color:c,backgroundColor:s}=e,{width:r,height:a}=l,i=B(Z,c),f=`border-box-12-filterId-${d}`;return n.createVNode(A,{class:S("border-box-12"),ref:p=>o.value=p.$el},{default:()=>[n.createVNode(fi,{width:r,height:a},{default:()=>[n.createVNode("defs",null,[n.createVNode("filter",{id:f,height:"150%",width:"150%",x:"-25%",y:"-25%"},[n.createVNode("feMorphology",{operator:"dilate",radius:"1",in:"SourceAlpha",result:"thicken"},null),n.createVNode("feGaussianBlur",{in:"thicken",stdDeviation:"2",result:"blurred"},null),n.createVNode("feFlood",{"flood-color":G.fade(i[1]||Z[1],70),result:"glowColor"},[n.createVNode("animate",{attributeName:"flood-color",values:`
                        ${G.fade(i[1]||Z[1],70)};
                        ${G.fade(i[1]||Z[1],30)};
                        ${G.fade(i[1]||Z[1],70)};
                      `,dur:"3s",begin:"0s",repeatCount:"indefinite"},null)]),n.createVNode("feComposite",{in:"glowColor",in2:"blurred",operator:"in",result:"softGlowColored"},null),n.createVNode("feMerge",null,[n.createVNode("feMergeNode",{in:"softGlowColored"},null),n.createVNode("feMergeNode",{in:"SourceGraphic"},null)])])]),r&&a&&n.createVNode("path",{fill:s,"stroke-width":"2",stroke:i[0],d:`
                    M15 5 L ${r-15} 5 Q ${r-5} 5, ${r-5} 15
                    L ${r-5} ${a-15} Q ${r-5} ${a-5}, ${r-15} ${a-5}
                    L 15, ${a-5} Q 5 ${a-5} 5 ${a-15} L 5 15
                    Q 5 5 15 5
                  `},null),n.createVNode("path",{"stroke-width":"2",fill:"transparent","stroke-linecap":"round",filter:`url(#${f})`,stroke:i[1],d:"M 20 5 L 15 5 Q 5 5 5 15 L 5 20"},null),n.createVNode("path",{"stroke-width":"2",fill:"transparent","stroke-linecap":"round",filter:`url(#${f})`,stroke:i[1],d:`M ${r-20} 5 L ${r-15} 5 Q ${r-5} 5 ${r-5} 15 L ${r-5} 20`},null),n.createVNode("path",{"stroke-width":"2",fill:"transparent","stroke-linecap":"round",filter:`url(#${f})`,stroke:i[1],d:`
                  M ${r-20} ${a-5} L ${r-15} ${a-5}
                  Q ${r-5} ${a-5} ${r-5} ${a-15}
                  L ${r-5} ${a-20}
                `},null),n.createVNode("path",{"stroke-width":"2",fill:"transparent","stroke-linecap":"round",filter:`url(#${f})`,stroke:i[1],d:`
                  M 20 ${a-5} L 15 ${a-5}
                  Q 5 ${a-5} 5 ${a-15}
                  L 5 ${a-20}
                `},null)]}),n.createVNode(D,null,{default:()=>{var p;return[n.createVNode("slot",null,[(p=t.default)==null?void 0:p.call(t)])]}})]})}}})),pi=["#6586ec","#2cf7fe"],hi=m.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`("border-svg-container"),gi=V(n.defineComponent({name:"BorderBox13",props:T(),setup(e,{slots:t}){const{domRef:o,domSize:l}=w();return()=>{const{color:d,backgroundColor:c}=e,{width:s,height:r}=l,a=B(pi,d);return n.createVNode(A,{class:S("border-box-13"),ref:i=>o.value=i.$el},{default:()=>[n.createVNode(hi,{width:s,height:r},{default:()=>[n.createVNode("path",{fill:c,stroke:a[0],d:`
                  M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
                  L ${s-20} 10 L ${s-5} 25
                  L ${s-5} ${r-5} L 20 ${r-5}
                  L 5 ${r-20} L 5 20
                `},null),n.createVNode("path",{fill:"transparent","stroke-width":"3","stroke-linecap":"round","stroke-dasharray":"10, 5",stroke:a[0],d:"M 16 9 L 61 9"},null),n.createVNode("path",{fill:"transparent",stroke:a[1],d:"M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"},null),n.createVNode("path",{fill:"transparent",stroke:a[1],d:`M ${s-5} ${r-30} L ${s-5} ${r-5} L ${s-30} ${r-5}`},null)]}),n.createVNode(D,null,{default:()=>{var i;return[n.createVNode("slot",null,[(i=t.default)==null?void 0:i.call(t)])]}})]})}}}));function O(){return{color:{type:Bt(Array),default:()=>[]}}}function Me(){return{reverse:{type:Boolean,default:!1}}}function Pe(e){return{duration:{type:Number,default:e}}}function $i({width:e,height:t,rowPoints:o,rowCount:l}){const d=e/(o+1),c=t/(l+1);return new Array(l).fill(0).map((s,r)=>new Array(o).fill(0).map((a,i)=>[d*(i+1),c*(r+1)])).reduce((s,r)=>[...s,...r],[])}const bi=["#fff","#0de7c2"],ve=200,Re=50,Oe=20,mi=4,x=2.5,Yt=x/2,je=$i({width:ve,height:Re,rowPoints:Oe,rowCount:mi}),U=je[Oe*2-1],ee=je[Oe*2-3],yi=m.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ svg {
  transform-origin: left top;
`("decoration-1"),Ni=V(n.defineComponent({name:"Decoration1",props:O(),setup(e){const{domRef:t,domSize:o}=w();return()=>{const{color:l}=e,{width:d,height:c}=o,s=R(bi,l),r={transform:`scale(${d/ve},${c/Re})`};return n.createVNode(yi,{ref:a=>t.value=a.$el},{default:()=>[n.createVNode("svg",{width:ve,height:Re,style:r},[je.map(([a,i],f)=>{const p=a-Yt,$=i-Yt;return Math.random()>.6?n.createVNode("rect",{key:f,x:p,y:$,width:x,height:x,fill:s[0]},[Math.random()>.6&&n.createVNode("animate",{attributeName:"fill",values:`${s[0]};transparent`,dur:"1s",begin:Math.random()*2,repeatCount:"indefinite"},null)]):null}),n.createVNode("rect",{fill:s[1],x:U[0]-x,y:U[1]-x,width:x*2,height:x*2},[n.createVNode("animate",{attributeName:"width",values:`0;${x*2}`,dur:"2s",repeatCount:"indefinite"},null),n.createVNode("animate",{attributeName:"height",values:`0;${x*2}`,dur:"2s",repeatCount:"indefinite"},null),n.createVNode("animate",{attributeName:"x",values:`${U[0]};${U[0]-x}`,dur:"2s",repeatCount:"indefinite"},null),n.createVNode("animate",{attributeName:"y",values:`${U[1]};${U[1]-x}`,dur:"2s",repeatCount:"indefinite"},null)]),n.createVNode("rect",{fill:s[1],x:ee[0]-x,y:ee[1]-x,width:x*2,height:x*2},[n.createVNode("animate",{attributeName:"width",values:"0;40;0",dur:"2s",repeatCount:"indefinite"},null),n.createVNode("animate",{attributeName:"x",values:`${ee[0]};${ee[0]-40};${ee[0]}`,dur:"2s",repeatCount:"indefinite"},null)])])]})}}})),_i=["#3faacb","#fff"];function Vi(){return k(k(k({},O()),Me()),Pe(6))}function wi(e,t,o){return e?{width:1,height:o,x:t/2,y:0}:{width:t,height:1,x:0,y:o/2}}const xi=m.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`("decoration-2"),ki=V(n.defineComponent({name:"Decoration2",props:Vi(),setup(e){const{domRef:t,domSize:o}=w();return()=>{const{width:l,height:d}=o,{color:c,reverse:s,duration:r}=e,a=R(_i,c),{x:i,y:f,width:p,height:$}=wi(s,l,d);return n.createVNode(xi,{ref:N=>t.value=N.$el},{default:()=>[n.createVNode("svg",{width:l,height:d},[n.createVNode("rect",{x:i,y:f,width:p,height:$,fill:a[0]},[n.createVNode("animate",{attributeName:s?"height":"width",from:"0",to:s?d:l,dur:`${r}s`,calcMode:"spline",keyTimes:"0;1",keySplines:".42,0,.58,1",repeatCount:"indefinite"},null)]),n.createVNode("rect",{x:i,y:f,width:"1",height:"1",fill:a[1]},[n.createVNode("animate",{attributeName:s?"y":"x",from:"0",to:s?d:l,dur:`${r}s`,calcMode:"spline",keyTimes:"0;1",keySplines:"0.42,0,0.58,1",repeatCount:"indefinite"},null)])])]})}}}));function Ci({width:e,height:t,rowPoints:o,rowCount:l}){const d=e/(o+1),c=t/(l+1);return new Array(l).fill(0).map((s,r)=>new Array(o).fill(0).map((a,i)=>[d*(i+1),c*(r+1)])).reduce((s,r)=>[...s,...r],[])}const Si=["#7acaec","transparent"],Ee=300,Ie=35,Ti=25,Bi=2,Fe=7,Ht=Fe/2,Ai=Ci({width:Ee,height:Ie,rowPoints:Ti,rowCount:Bi}),Di=m.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ svg {
  transform-origin: left top;
`("decoration-3"),Li=V(n.defineComponent({name:"Decoration3",props:O(),setup(e){const{domRef:t,domSize:o}=w();return()=>{const{width:l,height:d}=o,{color:c}=e,s=R(Si,c);return n.createVNode(Di,{ref:r=>t.value=r.$el},{default:()=>[n.createVNode("svg",{width:Ee,height:Ie,style:{transform:`scale(${l/Ee},${d/Ie})`}},[Ai.map(([r,a],i)=>{const f=r-Ht,p=a-Ht;return Math.random()>.6?n.createVNode("rect",{key:i,x:f,y:p,width:Fe,height:Fe,fill:s[0]},[Math.random()>.6&&n.createVNode("animate",{attributeName:"fill",values:s.join(";"),dur:`${Math.random()+1}s`,begin:Math.random()*2,repeatCount:"indefinite"},null)]):null})])]})}}}));function Mi(){return k(k(k({},O()),Me()),Pe(3))}const Pi=["rgba(255, 255, 255, 0.3)","rgba(255, 255, 255, 0.3)"],vi=m.div`
  position: relative;
  width: 100%;
  height: 100%;
`("decoration-4"),Ri=m.div`
  display: flex;
  overflow: hidden;
  position: absolute;
  flex: 1;
}
.__STYLED__.normal {
  animation: ani-height ease-in-out infinite;
  left: 50%;
  margin-left: -2px;
}
.__STYLED__.reverse {
  animation: ani-width ease-in-out infinite;
  top: 50%;
  margin-top: -2px;
}
@keyframes ani-height {
  0% {
    height: 0%;
  }
  70% {
    height: 100%;
  }
  100% {
    height: 100%;
  }
}
@keyframes ani-width {
  0% {
    width: 0%;
  }
  70% {
    width: 100%;
  }
  100% {
    width: 100%;
  }
`("decoration-content"),Oi=V(n.defineComponent({name:"Decoration4",props:Mi(),setup(e){const{domRef:t,domSize:o}=w();return()=>{const{width:l,height:d}=o,{color:c,reverse:s,duration:r}=e,a=R(Pi,c),i=s?l:5,f=s?5:d,p={width:`${i}px`,height:`${f}px`,animationDuration:`${r}s`},$=s?`0, 2.5 ${l}, 2.5`:`2.5, 0 2.5, ${d}`;return n.createVNode(vi,{ref:N=>t.value=N.$el},{default:()=>[n.createVNode(Ri,{class:ke(s?"reverse":"normal"),style:p},{default:()=>[n.createVNode("svg",{width:i,height:f},[n.createVNode("polyline",{stroke:a[0],points:$},null),n.createVNode("polyline",{class:"bold-line",stroke:a[1],"stroke-width":"3","stroke-dasharray":"20, 80","stroke-dashoffset":"-30",points:$},null)])]})]})}}})),ji=["#3f96a5","#3f96a5"];function Ei(){return k(k({},O()),Pe(1.2))}function qt(e){return new Array(e.length-1).fill(0).map((t,o)=>Va(e[o],e[o+1]))}function Ii(e,t){const o=[[0,t*.2],[e*.18,t*.2],[e*.2,t*.4],[e*.25,t*.4],[e*.27,t*.6],[e*.72,t*.6],[e*.75,t*.4],[e*.8,t*.4],[e*.82,t*.2],[e,t*.2]],l=[[e*.3,t*.8],[e*.7,t*.8]];return{line1Sum:Tt(qt(o)),line2Sum:Tt(qt(l)),line1Point:o.map(d=>d.join(",")).join(" "),line2Point:l.map(d=>d.join(",")).join(" ")}}const Fi=m.div`
  width: 100%;
  height: 100%;
`("decoration-5"),zi=V(n.defineComponent({name:"Decoration5",props:Ei(),setup(e){const{domRef:t,domSize:o}=w();return()=>{const{width:l,height:d}=o,{color:c,duration:s}=e,r=R(ji,c),{line1Sum:a,line2Sum:i,line1Point:f,line2Point:p}=Ii(l,d);return n.createVNode(Fi,{ref:$=>t.value=$.$el},{default:()=>[n.createVNode("svg",{width:l,height:d},[n.createVNode("polyline",{fill:"transparent",stroke:r[0],"stroke-width":"3",points:f},[n.createVNode("animate",{attributeName:"stroke-dasharray",attributeType:"XML",from:`0, ${a/2}, 0, ${a/2}`,to:`0, 0, ${a}, 0`,dur:`${s}s`,begin:"0s",calcMode:"spline",keyTimes:"0;1",keySplines:"0.4,1,0.49,0.98",repeatCount:"indefinite"},null)]),n.createVNode("polyline",{fill:"transparent",stroke:r[1],"stroke-width":"2",points:p},[n.createVNode("animate",{attributeName:"stroke-dasharray",attributeType:"XML",from:`0, ${i/2}, 0, ${i/2}`,to:`0, 0, ${i}, 0`,dur:`${s}s`,begin:"0s",calcMode:"spline",keyTimes:"0;1",keySplines:".4,1,.49,.98",repeatCount:"indefinite"},null)])])]})}}})),Yi=["#7acaec","#7acaec"],Gt=300,Ut=35,Hi=1,qi=40,Wt=7,Gi=Wt/2,Ui=m.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ .svg-origin {
  transform-origin: left top;
`("decoration-6");function Wi({width:e,height:t,rowPoints:o,rowCount:l}){const d=e/(o+1),c=t/(l+1),s=new Array(l).fill(0).map((f,p)=>new Array(o).fill(0).map(($,N)=>[d*(N+1),c*(p+1)])).reduce((f,p)=>[...f,...p],[]),r=new Array(l*o).fill(0).map(()=>Math.random()>.8?St(.7*t,t):St(.2*t,.5*t)),a=new Array(l*o).fill(0).map((f,p)=>r[p]*Math.random()),i=new Array(l*o).fill(0).map(()=>Math.random()+1.5);return{points:s,heights:r,minHeights:a,randoms:i}}const{points:Xi,heights:de,minHeights:ce,randoms:Xt}=Wi({width:Gt,height:Ut,rowPoints:qi,rowCount:Hi}),Ki=V(n.defineComponent({name:"Decoration6",props:O(),setup(e){const{domRef:t,domSize:o}=w();return()=>{const{width:l,height:d}=o,{color:c}=e,s=R(Yi,c),r={transform:`scale(${l/Gt},${d/Ut})`},a=()=>s[Math.random()>.5?0:1];return n.createVNode(Ui,{ref:i=>t.value=i.$el},{default:()=>[n.createVNode("svg",{class:"svg-origin",width:l,height:d,style:r},[Xi.map(([i,f],p)=>n.createVNode("rect",{key:`rect${p}`,fill:a(),x:i-Gi,y:f-de[p],width:Wt,height:de[p]},[n.createVNode("animate",{attributeName:"y",values:`${f-ce[p]/2};${f-de[p]/2};${f-ce[p]/2}`,dur:Xt[p],keyTimes:"0;0.5;1",calcMode:"spline",keySplines:"0.42,0,0.58,1;0.42,0,0.58,1",begin:"0s",repeatCount:"indefinite"},null),n.createVNode("animate",{attributeName:"height",values:`${ce[p]};${de[p]};${ce[p]}`,dur:Xt[p],keyTimes:"0;0.5;1",calcMode:"spline",keySplines:"0.42,0,0.58,1;0.42,0,0.58,1",begin:"0s",repeatCount:"indefinite"},null)]))])]})}}})),Qi=m.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`("decoration-7"),Ji=["#1dc1f5","#1dc1f5"],Zi=V(n.defineComponent({name:"Decoration7",props:O(),setup(e,{slots:t}){const{domRef:o}=w();return()=>{const{color:l}=e,d=R(Ji,l);return n.createVNode(Qi,{ref:c=>o.value=c.$el},{default:()=>{var c;return[n.createVNode("svg",{width:"21px",height:"20px"},[n.createVNode("polyline",{"stroke-width":"4",fill:"transparent",stroke:d[0],points:"10, 0 19, 10 10, 20"},null),n.createVNode("polyline",{"stroke-width":"2",fill:"transparent",stroke:d[1],points:"2, 0 11, 10 2, 20"},null)]),(c=t.default)==null?void 0:c.call(t),n.createVNode("svg",{width:"21px",height:"20px"},[n.createVNode("polyline",{"stroke-width":"4",fill:"transparent",stroke:d[0],points:"11, 0 2, 10 11, 20"},null),n.createVNode("polyline",{"stroke-width":"2",fill:"transparent",stroke:d[1],points:"19, 0 10, 10 19, 20"},null)])]}})}}})),el=["#3f96a5","#3f96a5"];function tl(){return k(k({},O()),Me())}const rl=m.div`
  display: flex;
  width: 100%;
  height: 100%;
`("decoration-8"),nl=V(n.defineComponent({name:"Decoration8",props:tl(),setup(e){const{domRef:t,domSize:o}=w();return()=>{const{color:l,reverse:d}=e,{width:c,height:s}=o,r=i=>d?c-i:i,a=R(el,l);return n.createVNode(rl,{ref:i=>t.value=i.$el},{default:()=>[n.createVNode("svg",{width:c,height:s},[n.createVNode("polyline",{stroke:a[0],"stroke-width":"2",fill:"transparent",points:`${r(0)}, 0 ${r(30)}, ${s/2}`},null),n.createVNode("polyline",{stroke:a[0],"stroke-width":"2",fill:"transparent",points:`${r(20)}, 0 ${r(50)}, ${s/2} ${r(c)}, ${s/2}`},null),n.createVNode("polyline",{stroke:a[1],fill:"transparent","stroke-width":"3",points:`${r(0)}, ${s-3}, ${r(200)}, ${s-3}`},null)])]})}}})),ol=m.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.__STYLED__ .loading-tip {
  font-size: 15px;
`("loading"),al=V(n.defineComponent({name:"Loading",setup(e,{slots:t}){return()=>n.createVNode(ol,null,{default:()=>{var o;return[n.createVNode("svg",{width:"50px",height:"50px"},[n.createVNode("circle",{cx:"25",cy:"25",r:"20",fill:"transparent","stroke-width":"3","stroke-dasharray":"31.415, 31.415",stroke:"#02bcfe","stroke-linecap":"round"},[n.createVNode("animateTransform",{attributeName:"transform",type:"rotate",values:"0, 25 25;360, 25 25",dur:"1.5s",repeatCount:"indefinite"},null),n.createVNode("animate",{attributeName:"stroke",values:"#02bcfe;#3be6cb;#02bcfe",dur:"3s",repeatCount:"indefinite"},null)]),n.createVNode("circle",{cx:"25",cy:"25",r:"10",fill:"transparent","stroke-width":"3","stroke-dasharray":"15.7, 15.7",stroke:"#3be6cb","stroke-linecap":"round"},[n.createVNode("animateTransform",{attributeName:"transform",type:"rotate",values:"360, 25 25;0, 25 25",dur:"1.5s",repeatCount:"indefinite"},null),n.createVNode("animate",{attributeName:"stroke",values:"#3be6cb;#02bcfe;#3be6cb",dur:"3s",repeatCount:"indefinite"},null)])]),n.createVNode("div",{class:"loading-tip"},[(o=t.default)==null?void 0:o.call(t)])]}})}}));g.BorderBox1=ka,g.BorderBox10=ti,g.BorderBox11=ci,g.BorderBox12=ui,g.BorderBox13=gi,g.BorderBox2=Ta,g.BorderBox3=Da,g.BorderBox4=va,g.BorderBox5=Ea,g.BorderBox6=za,g.BorderBox7=qa,g.BorderBox8=Xa,g.BorderBox9=Ja,g.Decoration1=Ni,g.Decoration2=ki,g.Decoration3=Li,g.Decoration4=Oi,g.Decoration5=zi,g.Decoration6=Ki,g.Decoration7=Zi,g.Decoration8=nl,g.Loading=al,g.setClassPrefix=Jt,Object.defineProperty(g,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=datav.umd.js.map
