!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";!function(){var t=n(1);window.Man=t}()},function(t,e,n){"use strict";!function(){var e=function(t,e){var n={},r=void 0;for(r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);if(!e)return n;for(r in e)e.hasOwnProperty(r)&&(n[r]=e[r]);return n},n=function(t){var e=[],n=0;if(!t.length)return e;for(n=0;n<t.length;n++)e.push(t[n]);return e},r=function(t,e){var n=document.createElement(t);for(var r in e)e.hasOwnProperty(r)&&n.setAttribute(r,e[r]);return n},i=function(t,e){var n=Element.prototype;return(n.matches||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||function(t){return-1!==[].indexOf.call(document.querySelectorAll(t),this)}).call(t,e)},o=function(t,e,n){2===arguments.length&&(n=!0);for(var r=n?t:t.parentNode;r&&!i(r,e)&&r.parentNode;)r=r.parentNode;return i(r,e)?r:null},a=function(t,e){var r=0,i=n(document.querySelectorAll("pre tr.highlighted")),a=o(t[0],"pre");for(r=0;r<i.length;r++)i[r].classList.remove("highlighted");if(!t||!t.length)return void(e&&(document.location.hash=""));for(r=0;r<t.length;r++)t[r]&&o(t[r],"tr",!0).classList.add("highlighted");e?document.location="#man-"+a.getAttribute("id")+"-"+t[0].getAttribute("data-line-number"):t[0].scrollIntoView(!0)},l=function(t){var e=document.location.hash.match(/#man-([^\d]*)-(\d*)-?(\d*)?/),i=n(document.body.querySelectorAll("pre")),o=r("div",{class:"man-badge"}),l=0,c=0,u=void 0,d="",s=void 0,f=void 0,h=void 0;if(o.innerHTML='<a href="http://davidfmiller.github.io/man/" title="Built with man" target="_blank">📘</a>',document.body.appendChild(o),t.pre){for(l=0;l<i.length;l++)if(s=i[l],f=s.innerHTML.split("\n"),d="<table><tbody>",s.getAttribute("id")||s.setAttribute("id","pre-man-"+l),!(f.length<=1||s.hasAttribute("data-no-lines"))){for(s.classList.add("lines"),c=0;c<f.length;c++)u="man-"+s.getAttribute("id")+"-"+(c+1),d+='<tr><td title="Line #'+(c+1)+'" id="'+u+'-line" class="col" data-line-number="'+(c+1)+'"></td><td class="code" id="'+u+'-code" data-line-number="'+(c+1)+'">'+f[c]+"</td></tr>";d+="</tbody></table>",s.innerHTML=d}if(document.body.addEventListener("click",function(t){t.target.matches("td.col")?a([t.target],!0):t.target.matches("a.hash")&&a(null,!0)}),e){if(f=[],e[3])for(l=parseInt(e[2]);l<=parseInt(e[3]);l++)u="man-"+e[1]+"-"+l+"-line",(h=document.getElementById(u))&&f.push(h);else f=[document.getElementById("man-"+e[1]+"-"+e[2]+"-line")];a(f,!1)}}},c=function(t){t=e({pre:!1},t||{}),l(t)};t.exports=c}()}]);