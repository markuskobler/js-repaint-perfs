!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.IncrementalDOM=e()}}(function(){return function e(t,n,r){function a(i,u){if(!n[i]){if(!t[i]){var s="function"==typeof require&&require;if(!u&&s)return s(i,!0);if(o)return o(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[i]={exports:{}};t[i][0].call(c.exports,function(e){var n=t[i][1][e];return a(n?n:e)},c,c.exports,e,t,n,r)}return n[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)a(r[i]);return a}({1:[function(e,t,n){/**
 * @license
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var r=e("./src/patch").patch,a=e("./src/virtual_elements");t.exports={patch:r,elementVoid:a.elementVoid,elementOpenStart:a.elementOpenStart,elementOpenEnd:a.elementOpenEnd,elementOpen:a.elementOpen,elementClose:a.elementClose,text:a.text,attr:a.attr}},{"./src/patch":8,"./src/virtual_elements":11}],2:[function(e,t,n){function r(){c=!1,u.length?l=u.concat(l):f=-1,l.length&&a()}function a(){if(!c){var e=setTimeout(r);c=!0;for(var t=l.length;t;){for(u=l,l=[];++f<t;)u[f].run();f=-1,t=l.length}u=null,c=!1,clearTimeout(e)}}function o(e,t){this.fun=e,this.array=t}function i(){}var u,s=t.exports={},l=[],c=!1,f=-1;s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new o(e,t)),1!==l.length||c||setTimeout(a,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=i,s.addListener=i,s.once=i,s.off=i,s.removeListener=i,s.removeAllListeners=i,s.emit=i,s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},{}],3:[function(e,t,n){var r=e("./nodes"),a=r.createNode,o=r.getChild,i=r.registerChild,u=e("./node_data"),s=u.getKey,l=u.getNodeName,c=e("./walker").getWalker,f=function(e,t,n){return n?n===s(e):t===l(e)},d=function(e,t,n){var r,u=c(),s=u.currentNode,l=u.getCurrentParent();if(s&&f(s,e,t))r=s;else{var d=t&&o(l,t);d?r=d:(r=a(u.doc,e,t,n),t&&i(l,t,r)),l.insertBefore(r,s),u.currentNode=r}return r};t.exports={alignWithDOM:d}},{"./node_data":6,"./nodes":7,"./walker":12}],4:[function(e,t,n){var r=e("./node_data").getData,a=function(e,t,n){var a=r(e),o=a.attrs;if(o[t]!==n){var i=typeof n;void 0===n?e.removeAttribute(t):"object"===i||"function"===i?e[t]=n:e.setAttribute(t,n),o[t]=n}},o=function(e,t){if("string"==typeof t||t instanceof String)e.style.cssText=t;else{e.style.cssText="";for(var n in t)e.style[n]=t[n]}},i=function(e,t,n){"style"===t?o(e,n):a(e,t,n)};t.exports={updateAttribute:i}},{"./node_data":6}],5:[function(e,t,n){var r=e("./walker").getWalker,a="http://www.w3.org/2000/svg",o=function(e){"svg"===e?r().enterNamespace(a):"foreignObject"===e&&r().enterNamespace(void 0)},i=function(e){("svg"===e||"foreignObject"===e)&&r().exitNamespace()},u=function(e){return"svg"===e?a:r().getCurrentNamespace()};t.exports={enterTag:o,exitTag:i,getNamespaceForTag:u}},{"./walker":12}],6:[function(e,t,n){function r(e,t){this.attrs={},this.attrsArr=[],this.newAttrs={},this.key=t||null,this.keyMap=null,this.lastVisitedChild=null,this.nodeName=e,this.text=null}var a=function(e,t,n){var a=new r(t,n);return e.__incrementalDOMData=a,a},o=function(e){var t=e.__incrementalDOMData;if(!t){var n=e.nodeName.toLowerCase(),r=null;e instanceof Element&&(r=e.getAttribute("key")),t=a(e,n,r)}return t},i=function(e){return o(e).key},u=function(e){return o(e).nodeName};t.exports={getData:o,initData:a,getKey:i,getNodeName:u}},{}],7:[function(e,t,n){var r=e("./attributes").updateAttribute,a=e("./node_data"),o=a.getData,i=a.getKey,u=a.initData,s=e("./namespace").getNamespaceForTag,l=function(e,t,n,a){var o,i=s(t);if(o=i?e.createElementNS(i,t):e.createElement(t),u(o,t,n),a)for(var l=0;l<a.length;l+=2)r(o,a[l],a[l+1]);return o},c=function(e,t){var n=e.createTextNode(t);return o(n).text=t,n},f=function(e,t,n,r){return"#text"===t?c(e,r):l(e,t,n,r)},d=function(e){for(var t={},n=e.children,r=n.length,a=0;r>a;a+=1){var o=n[a],u=i(o);u&&(t[u]=o)}return t},p=function(e){var t=o(e);return t.keyMap||(t.keyMap=d(e)),t.keyMap},g=function(e,t){return p(e)[t]},h=function(e,t,n){p(e)[t]=n};t.exports={createNode:f,getChild:g,registerChild:h}},{"./attributes":4,"./namespace":5,"./node_data":6}],8:[function(e,t,n){var r=e("./traversal"),a=r.firstChild,o=r.parentNode,i=e("./tree_walker"),u=e("./walker"),s=u.getWalker,l=u.setWalker,c=function(e,t,n){var r=s();l(new i(e)),a(),t(n),o(),l(r)};t.exports={patch:c}},{"./traversal":9,"./tree_walker":10,"./walker":12}],9:[function(e,t,n){var r=e("./walker").getWalker,a=e("./node_data").getData,o=e("./namespace"),i=function(e){var t=a(e);o.enterTag(t.nodeName)},u=function(e){var t=a(e),n=t.lastVisitedChild;if(t.lastVisitedChild=null,o.exitTag(t.nodeName),e.lastChild!==n){for(;e.lastChild!==n;)e.removeChild(e.lastChild);t.keyMap=null}},s=function(e){var t=r(),n=t.getCurrentParent(),o=a(n);o.lastVisitedChild=e},l=function(){var e=r();i(e.currentNode),e.firstChild()},c=function(){var e=r();s(e.currentNode),e.nextSibling()},f=function(){var e=r();e.parentNode(),u(e.currentNode)};t.exports={firstChild:l,nextSibling:c,parentNode:f}},{"./namespace":5,"./node_data":6,"./walker":12}],10:[function(e,t,n){function r(e){this.stack_=[],this.currentNode=e,this.doc=e.ownerDocument,this.nsStack_=[void 0]}r.prototype.getCurrentParent=function(){return this.stack_[this.stack_.length-1]},r.prototype.getCurrentNamespace=function(){return this.nsStack_[this.nsStack_.length-1]},r.prototype.enterNamespace=function(e){this.nsStack_.push(e)},r.prototype.exitNamespace=function(){this.nsStack_.pop()},r.prototype.firstChild=function(){this.stack_.push(this.currentNode),this.currentNode=this.currentNode.firstChild},r.prototype.nextSibling=function(){this.currentNode=this.currentNode.nextSibling},r.prototype.parentNode=function(){this.currentNode=this.stack_.pop()},t.exports=r},{}],11:[function(e,t,n){(function(n){var r=e("./alignment").alignWithDOM,a=e("./attributes").updateAttribute,o=e("./node_data").getData,i=(e("./walker").getWalker,e("./traversal")),u=i.firstChild,s=i.nextSibling,l=i.parentNode,c=3,f=[],d="production"===n.env.NODE_ENV;if(!d)var p=!1,g=function(){if(p)throw new Error("Was not expecting a call to attr or elementOpenEnd, they must follow a call to elementOpenStart.")},h=function(){if(!p)throw new Error("Was expecting a call to attr or elementOpenEnd. elementOpenStart must be followed by zero or more calls to attr, then one call to elementOpenEnd.")},m=function(){p=!0},v=function(){p=!1};var y=function(e,t,n,r){for(var a=o(this),i=a.attrsArr,u=!1,s=c,l=0;s<arguments.length;s+=1,l+=1)if(i[l]!==arguments[s]){u=!0;break}for(;s<arguments.length;s+=1,l+=1)i[l]=arguments[s];return l<i.length&&(u=!0,i.length=l),u},w=function(e,t,n,r){var a=this,i=o(a),u=i.newAttrs;for(var s in u)u[s]=void 0;for(var l=c;l<arguments.length;l+=2)u[arguments[l]]=arguments[l+1];return u},N=function(e,t){for(var n in t)a(e,n,t[n])},x=function(e,t,n,a){d||g();var o=r(e,t,n);if(y.apply(o,arguments)){var i=w.apply(o,arguments);N(o,i)}u()},k=function(e,t,n){d||(g(),m()),f[0]=e,f[1]=t,f[2]=n},_=function(e,t){d||h(),f.push(e,t)},b=function(){d||(h(),v()),x.apply(null,f),f.length=0},C=function(e){d||g(),l(),s()},O=function(e,t,n,r){d||g(),x.apply(null,arguments),C.apply(null,arguments)},D=function(e){d||g();var t=r("#text",null,e),n=o(t);n.text!==e&&(t.data=e,n.text=e),s()};t.exports={elementOpenStart:k,elementOpenEnd:b,elementOpen:x,elementVoid:O,elementClose:C,text:D,attr:_}}).call(this,e("_process"))},{"./alignment":3,"./attributes":4,"./node_data":6,"./traversal":9,"./walker":12,_process:2}],12:[function(e,t,n){var r,a=function(){return r},o=function(e){r=e};t.exports={getWalker:a,setWalker:o}},{}]},{},[1])(1)});
//# sourceMappingURL=incremental-dom.js.map