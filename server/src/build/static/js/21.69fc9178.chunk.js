(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[21],{529:function(e,t,n){"use strict";var a=n(187);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(188)),c=n(1),o=(0,r.default)((0,c.jsx)("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check");t.default=o},530:function(e,t,n){"use strict";var a=n(187);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(188)),c=n(1),o=(0,r.default)((0,c.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Clear");t.default=o},851:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n(17),c=n.n(r),o=n(15),i=n(24),s=n(10),u=n(336),l=n.n(u),d=n(529),p=n.n(d),j=n(530),b=n.n(j),f=n(173),h=n(610),O=n(175),x=n(186),m=n(0),g=n(328),v=n(644),y=n(643),w=n(332),k=n(134),C=n(1),M=Object(x.a)((function(e){return{header:{marginBottom:"40px"},headerContent:{textTransform:"uppercase",fontWeight:"600"},table:{width:"100%",backgroundColor:"white",marginTop:"18px"},editBtn:{color:e.palette.common.white,backgroundColor:e.palette.info.main,margin:"0 4px","&:hover":{backgroundColor:e.palette.info.dark}},deleteBtn:{color:e.palette.common.white,backgroundColor:e.palette.error.main,margin:"0 4px","&:hover":{backgroundColor:e.palette.error.dark}},paper:{display:"flex",alignItems:"center",flexWrap:"wrap",padding:"16px",marginBottom:"16px"},inputSelect:{marginRight:"20px"},checkIcon:{color:e.palette.success.main}}}));t.default=function(){var e=M(),t=Object(m.useState)("chibo"),n=Object(s.a)(t,2),r=(n[0],n[1],Object(m.useContext)(k.a)),u=r.category,d=r.categoryDispatch,j=Object(m.useState)(!1),x=Object(s.a)(j,2),P=x[0],S=x[1],T=Object(m.useState)([]),q=Object(s.a)(T,2),B=q[0],N=q[1],Q=Object(m.useState)([]),W=Object(s.a)(Q,2),_=W[0],z=W[1];Object(m.useEffect)((function(){S(!0),Object(g.c)(d,"position"),Object(g.c)(d,"permission")}),[]);var E=function(e){var t=!0;return Object.keys(e).forEach((function(n){0==e[n]&&(t=!1)})),t};return Object(m.useEffect)((function(){var e=function(){var e=Object(i.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(v.a)();case 2:t=e.sent,n=Object(o.a)(t),t.map((function(e,t){n[t].all=E(e)?1:0})),N(n),S(!1);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),t=[{title:"Ch\u1ee9c v\u1ee5",field:"TenChucVu",minWidth:150},{title:"To\xe0n quy\u1ec1n",field:"all",render:function(e){return E(e)?Object(C.jsx)(p.a,{sx:{width:"100%"},color:"success"}):Object(C.jsx)(b.a,{sx:{width:"100%"},color:"error"})}}];u.categories.permission.map((function(e){t.push({title:e.TenQuyen,field:e.MaQuyen+"",render:function(t){return 1==t[e.MaQuyen]?Object(C.jsx)(p.a,{sx:{width:"100%"},color:"success"}):Object(C.jsx)(b.a,{sx:{width:"100%"},color:"error"})}})})),t.push({title:"Ph\xe2n quy\u1ec1n",field:"PhanQuyen",render:function(e){return Object(C.jsx)(y.a,{value:e,button:!0,setRows:N})}}),z(t),e()}),[u.categories]),Object(C.jsx)(C.Fragment,{children:Object(C.jsxs)(w.a,{sidebar:!0,children:[Object(C.jsx)("div",{className:e.header,children:Object(C.jsx)(f.a,{className:e.headerContent,variant:"h5",children:"Ph\xe2n quy\u1ec1n"})}),Object(C.jsx)(h.a,{className:"decentralization-table",style:{maxWidth:"1170px"},children:Object(C.jsx)(l.a,{components:{Container:function(t){return Object(C.jsx)(O.a,Object(a.a)(Object(a.a)({},t),{},{className:e.table,variant:"outlined"}))}},options:{padding:"dense",sorting:!1},title:"Ph\xe2n quy\u1ec1n",columns:_,data:B,isLoading:P})})]})})}}}]);
//# sourceMappingURL=21.69fc9178.chunk.js.map