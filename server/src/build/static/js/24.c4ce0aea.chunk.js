(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[24],{858:function(e,a,t){"use strict";t.r(a);var n=t(17),r=t.n(n),i=t(24),c=t(3),o=t(103),s=t(10),l=t(366),u=t.n(l),d=t(662),h=t(173),j=t(295),b=t(297),p=t(175),O=t(572),g=t(593),x=t(655),m=t(605),f=t(186),v=t(0),T=t(135),N=t(328),C=t(109),V=t(646),D=t(324),y=t(332),w=t(134),A=t(31),M=t(441),Q=t(1),H=Object(f.a)((function(e){return{inputItem:{marginTop:e.spacing(2)},input:{"& .Mui-disabled":{backgroundColor:"#f7f8f8","-webkit-text-fill-color":"rgba(0, 0, 0, 0.9)"}}}})),k=function(e){var a=Object(v.useContext)(w.a),t=a.category,n=(a.categoryDispatch,e.disable),o=e.control,s=e.errors,l=e.setValue,u=e.loading,d=(e.setError,e.clearErrors),j=(e.getValues,e.qqArr),p=e.setQqArr,O=e.dcttArr,x=e.setDcttArr,m=e.nohtArr,f=e.setNohtArr,T=e.qqValue,N=e.setQqValue,C=e.dcttValue,V=e.setDcttValue,y=e.nohtValue,k=e.setNohtValue,S=H(),q=function(e){l(e.target.name,e.target.value)},E=function(e,a){var t=e.target,n=t.name,o=t.value;switch(l(n,o),"0"!=o&&d(e.target.name),a){case"qq":N(Object(c.a)(Object(c.a)({},T),{},{provinceValue:o}));var s=function(){var e=Object(i.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.get("https://provinces.open-api.vn/api/p/".concat(o,"/?depth=2"));case 2:a=e.sent,p(Object(c.a)(Object(c.a)({},j),{},{districtArr:a.data.districts}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();"0"!=o?s():p(Object(c.a)(Object(c.a)({},j),{},{districtArr:[],wardArr:[]})),l("QQHuyen","0"),l("QQXa","0");break;case"dctt":V(Object(c.a)(Object(c.a)({},C),{},{provinceValue:o}));var u=function(){var e=Object(i.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.get("https://provinces.open-api.vn/api/p/".concat(o,"/?depth=2"));case 2:a=e.sent,x(Object(c.a)(Object(c.a)({},O),{},{districtArr:a.data.districts}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();"0"!=o?u():x(Object(c.a)(Object(c.a)({},O),{},{districtArr:[],wardArr:[]})),l("DCTTHuyen","0"),l("DCTTXa","0");break;case"noht":k(Object(c.a)(Object(c.a)({},y),{},{provinceValue:o}));var h=function(){var e=Object(i.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.get("https://provinces.open-api.vn/api/p/".concat(o,"/?depth=2"));case 2:a=e.sent,f(Object(c.a)(Object(c.a)({},m),{},{districtArr:a.data.districts}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();"0"!=o?h():f(Object(c.a)(Object(c.a)({},m),{},{districtArr:[],wardArr:[]})),l("NOHTHuyen","0"),l("NOHTXa","0")}},X=function(e,a){var t=e.target,n=t.name,o=t.value;switch(l(n,o),"0"!=o&&d(e.target.name),a){case"qq":N(Object(c.a)(Object(c.a)({},T),{},{districtValue:o}));var s=function(){var e=Object(i.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.get("https://provinces.open-api.vn/api/d/".concat(o,"/?depth=2"));case 2:a=e.sent,p(Object(c.a)(Object(c.a)({},j),{},{wardArr:a.data.wards}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();"0"!=o?s():p(Object(c.a)(Object(c.a)({},j),{},{wardArr:[]})),l("QQXa","0");break;case"dctt":V(Object(c.a)(Object(c.a)({},C),{},{districtValue:o}));var u=function(){var e=Object(i.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.get("https://provinces.open-api.vn/api/d/".concat(o,"/?depth=2"));case 2:a=e.sent,x(Object(c.a)(Object(c.a)({},O),{},{wardArr:a.data.wards}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();"0"!=o?u():x(Object(c.a)(Object(c.a)({},O),{},{wardArr:[]})),l("DCTTXa","0");break;case"noht":k(Object(c.a)(Object(c.a)({},y),{},{districtValue:o}));var h=function(){var e=Object(i.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.get("https://provinces.open-api.vn/api/d/".concat(o,"/?depth=2"));case 2:a=e.sent,f(Object(c.a)(Object(c.a)({},m),{},{wardArr:a.data.wards}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();"0"!=o?h():f(Object(c.a)(Object(c.a)({},m),{},{wardArr:[]})),l("NOHTXa","0")}},I=function(e,a){var t=e.target,n=t.name,r=t.value;switch(l(n,r),"0"!=r&&d(e.target.name),a){case"qq":0!=r&&N(Object(c.a)(Object(c.a)({},T),{},{wardValue:r}));break;case"dctt":0!=r&&V(Object(c.a)(Object(c.a)({},C),{},{wardValue:r}));break;case"noht":0!=r&&k(Object(c.a)(Object(c.a)({},y),{},{wardValue:r}))}};return Object(Q.jsx)(Q.Fragment,{children:u||Object(Q.jsxs)(b.a,{container:!0,className:S.input,spacing:1,children:[Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{select:!0,nameTitle:"D\xe2n t\u1ed9c",name:"MaDanToc",defaultValue:"",control:o,errors:s,disabled:n,onChange:q,children:t.categories.ethnic.length>0&&t.categories.ethnic.map((function(e){return Object(Q.jsx)(g.a,{value:e.MaDanToc,children:e.TenDanToc},e.MaDanToc)}))})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{select:!0,nameTitle:"T\xf4n gi\xe1o",name:"MaTonGiao",defaultValue:"",control:o,errors:s,disabled:n,onChange:q,children:t.categories.religion.length>0&&t.categories.religion.map((function(e){return Object(Q.jsx)(g.a,{value:e.MaTonGiao,children:e.TenTonGiao},e.MaTonGiao)}))})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{type:"date",nameTitle:"Ng\xe0y sinh",name:"NgaySinh",control:o,errors:s,disabled:n})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{nameTitle:"Qu\u1ed1c t\u1ecbch",name:"QuocTich",control:o,errors:s,disabled:n})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{nameTitle:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",name:"SoDienThoai",control:o,errors:s,disabled:n})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{nameTitle:"Email",name:"Email",control:o,errors:s,disabled:n})}),Object(Q.jsxs)(b.a,{container:!0,item:!0,xs:12,className:S.inputItem,children:[Object(Q.jsx)(b.a,{item:!0,style:{width:"150px"},children:Object(Q.jsx)(h.a,{children:"Qu\xea qu\xe1n"})}),Object(Q.jsxs)(b.a,{item:!0,container:!0,flex:1,spacing:1,children:[Object(Q.jsx)(b.a,{item:!0,xs:4,children:Object(Q.jsxs)(M.a,{nameTitle:"T\u1ec9nh",name:"QQTinh",defaultValue:"0",control:o,errors:s,disabled:n,rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},onChange:function(e){return E(e,"qq")},children:[Object(Q.jsx)(g.a,{value:"0",children:"T\u1ec9nh"}),j.provinceArr.map((function(e){return Object(Q.jsx)(g.a,{value:e.code,children:e.name},e.code)}))]})}),Object(Q.jsx)(b.a,{item:!0,xs:4,children:Object(Q.jsxs)(M.a,{nameTitle:"Huy\u1ec7n",name:"QQHuyen",defaultValue:"0",control:o,errors:s,disabled:n,rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},onChange:function(e){return X(e,"qq")},children:[Object(Q.jsx)(g.a,{value:"0",children:"Huy\u1ec7n"}),j.districtArr.map((function(e){return Object(Q.jsx)(g.a,{value:e.code,children:e.name},e.code)}))]})}),Object(Q.jsx)(b.a,{item:!0,xs:4,children:Object(Q.jsxs)(M.a,{nameTitle:"X\xe3",name:"QQXa",defaultValue:"0",control:o,errors:s,disabled:n,rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},onChange:function(e){return I(e,"qq")},children:[Object(Q.jsx)(g.a,{value:"0",children:"X\xe3"}),j.wardArr.map((function(e){return Object(Q.jsx)(g.a,{value:e.code,children:e.name},e.code)}))]})}),Object(Q.jsx)(b.a,{item:!0,xs:12,children:Object(Q.jsx)(D.a,{onChange:q,placeholder:"S\u1ed1 nh\xe0, \u0110\u01b0\u1eddng...",noTitle:!0,name:"QQChiTiet",defaultValue:"",control:o,errors:s,disabled:n})})]})]}),Object(Q.jsxs)(b.a,{container:!0,item:!0,xs:12,className:S.inputItem,children:[Object(Q.jsx)(b.a,{item:!0,style:{width:"150px"},children:Object(Q.jsx)(h.a,{children:"\u0110\u1ecba ch\u1ec9 th\u01b0\u1eddng tr\xfa"})}),Object(Q.jsxs)(b.a,{item:!0,container:!0,flex:1,spacing:1,children:[Object(Q.jsx)(b.a,{item:!0,xs:4,children:Object(Q.jsxs)(M.a,{nameTitle:"T\u1ec9nh",name:"DCTTTinh",defaultValue:"0",control:o,errors:s,disabled:n,rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},onChange:function(e){return E(e,"dctt")},children:[Object(Q.jsx)(g.a,{value:"0",children:"T\u1ec9nh"}),O.provinceArr.map((function(e){return Object(Q.jsx)(g.a,{value:e.code,children:e.name},e.code)}))]})}),Object(Q.jsx)(b.a,{item:!0,xs:4,children:Object(Q.jsxs)(M.a,{nameTitle:"Huy\u1ec7n",name:"DCTTHuyen",defaultValue:"0",control:o,disabled:n,errors:s,rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},onChange:function(e){return X(e,"dctt")},children:[Object(Q.jsx)(g.a,{value:"0",children:"Huy\u1ec7n"}),O.districtArr.map((function(e){return Object(Q.jsx)(g.a,{value:e.code,children:e.name},e.code)}))]})}),Object(Q.jsx)(b.a,{item:!0,xs:4,children:Object(Q.jsxs)(M.a,{nameTitle:"X\xe3",name:"DCTTXa",defaultValue:"0",control:o,errors:s,disabled:n,rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},onChange:function(e){return I(e,"dctt")},children:[Object(Q.jsx)(g.a,{value:"0",children:"X\xe3"}),O.wardArr.map((function(e){return Object(Q.jsx)(g.a,{value:e.code,children:e.name},e.code)}))]})}),Object(Q.jsx)(b.a,{item:!0,xs:12,children:Object(Q.jsx)(D.a,{onChange:q,placeholder:"S\u1ed1 nh\xe0, \u0110\u01b0\u1eddng...",noTitle:!0,name:"DCTTChiTiet",defaultValue:"",control:o,errors:s,disabled:n})})]})]}),Object(Q.jsxs)(b.a,{container:!0,item:!0,xs:12,className:S.inputItem,children:[Object(Q.jsx)(b.a,{item:!0,style:{width:"150px"},children:Object(Q.jsx)(h.a,{children:"N\u01a1i \u1edf hi\u1ec7n t\u1ea1i"})}),Object(Q.jsxs)(b.a,{item:!0,container:!0,flex:1,spacing:1,children:[Object(Q.jsx)(b.a,{item:!0,xs:4,children:Object(Q.jsxs)(M.a,{nameTitle:"T\u1ec9nh",name:"NOHTTinh",defaultValue:"0",control:o,errors:s,disabled:n,rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},onChange:function(e){return E(e,"noht")},children:[Object(Q.jsx)(g.a,{value:"0",children:"T\u1ec9nh"}),m.provinceArr.map((function(e){return Object(Q.jsx)(g.a,{value:e.code,children:e.name},e.code)}))]})}),Object(Q.jsx)(b.a,{item:!0,xs:4,children:Object(Q.jsxs)(M.a,{nameTitle:"Huy\u1ec7n",name:"NOHTHuyen",defaultValue:"0",control:o,disabled:n,errors:s,rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},onChange:function(e){return X(e,"noht")},children:[Object(Q.jsx)(g.a,{value:"0",children:"Huy\u1ec7n"}),m.districtArr.map((function(e){return Object(Q.jsx)(g.a,{value:e.code,children:e.name},e.code)}))]})}),Object(Q.jsx)(b.a,{item:!0,xs:4,children:Object(Q.jsxs)(M.a,{nameTitle:"X\xe3",name:"NOHTXa",defaultValue:"0",control:o,disabled:n,errors:s,rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},onChange:function(e){return I(e,"noht")},children:[Object(Q.jsx)(g.a,{value:"0",children:"X\xe3"}),m.wardArr.map((function(e){return Object(Q.jsx)(g.a,{value:e.code,children:e.name},e.code)}))]})}),Object(Q.jsx)(b.a,{item:!0,xs:12,children:Object(Q.jsx)(D.a,{onChange:q,placeholder:"S\u1ed1 nh\xe0, \u0110\u01b0\u1eddng...",noTitle:!0,name:"NOHTChiTiet",defaultValue:"",disabled:n,control:o,errors:s})})]})]})]})})},S=t(15),q=t(343),E=t.n(q),X=t(642),I=t.n(X),J=t(584),B=t(102),F=Object(f.a)((function(e){return{btn:{marginTop:e.spacing(2)},divider:{marginTop:e.spacing(3)},removeIcon:{marginTop:e.spacing(2),backgroundColor:e.palette.error.main,color:e.palette.common.white,"&:hover":{backgroundColor:e.palette.error.dark,color:e.palette.common.white}},addIcon:{marginTop:e.spacing(2),backgroundColor:e.palette.success.main,color:e.palette.common.white,"&:hover":{backgroundColor:e.palette.success.dark,color:e.palette.common.white}}}})),G=function(e){var a=F(),t=e.disable,n=e.control,r=e.errors,i=e.setValue,c=e.loading,o=e.flArray,s=e.levelArray,l=e.setFlArray,u=(e.setLevelArray,Object(v.useContext)(w.a)),d=u.category,h=(u.categoryDispatch,Object(v.useContext)(B.a).openSnackbarDispatch);return Object(Q.jsx)(Q.Fragment,{children:c||Object(Q.jsxs)(b.a,{container:!0,spacing:1,children:[Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{nameTitle:"Ngh\u1ec1 nghi\u1ec7p",name:"NgheNghiep",control:n,errors:r,disabled:t})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{nameTitle:"Tr\xecnh \u0111\u1ed9 h\u1ecdc v\u1ea5n",name:"TrinhDoHocVan",control:n,errors:r,disabled:t})}),Object(Q.jsxs)(b.a,{item:!0,xs:6,children:[Object(Q.jsx)(D.a,{select:!0,nameTitle:"Tr\xecnh \u0111\u1ed9 tin h\u1ecdc",name:"MaTinHoc",defaultValue:"0001",control:n,errors:r,disabled:t,children:d.categories.it.length>0&&d.categories.it.map((function(e){return Object(Q.jsx)(g.a,{value:e.MaTinHoc,children:e.TenTinHoc},e.MaTinHoc)}))}),Object(Q.jsx)(J.a,{className:a.divider})]}),Object(Q.jsxs)(b.a,{item:!0,xs:6,children:[Object(Q.jsx)(D.a,{select:!0,nameTitle:"Tr\xecnh \u0111\u1ed9 ch\xednh tr\u1ecb",name:"MaChinhTri",defaultValue:"0001",control:n,errors:r,disabled:t,children:d.categories.politics.length>0&&d.categories.politics.map((function(e){return Object(Q.jsx)(g.a,{value:e.MaChinhTri,children:e.TenChinhTri},e.MaChinhTri)}))}),Object(Q.jsx)(J.a,{className:a.divider})]}),Object(Q.jsxs)(Q.Fragment,{children:[t&&o.map((function(e,a){return Object(Q.jsxs)(v.Fragment,{children:[Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{select:!0,nameTitle:"Ngo\u1ea1i ng\u1eef",name:"MaNgoaiNgu".concat(a),defaultValue:"0001",control:n,errors:r,disabled:t,children:d.categories.flanguage.length>0&&d.categories.flanguage.map((function(e){return Object(Q.jsx)(g.a,{value:e.MaNgoaiNgu,children:e.TenNgoaiNgu},e.MaNgoaiNgu)}))})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{select:!0,nameTitle:"Tr\xecnh \u0111\u1ed9 ngo\u1ea1i ng\u1eef",name:"MaTrinhDo".concat(a),defaultValue:"",control:n,errors:r,disabled:t,children:s.length>0&&s.map((function(e,t){if(t==a)return e.map((function(e){return Object(Q.jsx)(g.a,{value:e.MaTrinhDo,children:e.TenTrinhDo},e.MaTrinhDo)}))}))})})]},a)})),!t&&o.length>0&&o.map((function(e,c){return Object(Q.jsxs)(b.a,{container:!0,alignItems:"center",children:[Object(Q.jsx)(b.a,{item:!0,xs:1,children:Object(Q.jsx)(O.a,{onClick:function(a){return function(e,a){if(1!=o.length){var t=Object(S.a)(o);t.splice(a,1),o.forEach((function(e,a){i("MaNgoaiNgu".concat(a),"0"),i("MaTrinhDo".concat(a),"0")})),l(t)}else h({type:"SET_OPEN",payload:{type:"error",msg:"B\u1ea1n ph\u1ea3i ch\u1ecdn \xedt nh\u1ea5t m\u1ed9t ngo\u1ea1i ng\u1eef"}})}(e.MaNgoaiNgu,c)},size:"small",className:a.removeIcon,children:Object(Q.jsx)(I.a,{})})}),Object(Q.jsxs)(b.a,{container:!0,item:!0,xs:11,children:[Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsxs)(D.a,{select:!0,onChange:function(e){!function(e,a){var t=e.target,n=t.name,r=t.value,c=Object(S.a)(o);i(n,r),i("MaTrinhDo".concat(a),"0"),c[a].MaNgoaiNgu=r,c[a].MaTrinhDo="0",l(c)}(e,c)},nameTitle:"Ngo\u1ea1i ng\u1eef",name:"MaNgoaiNgu".concat(c),defaultValue:"0",rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},control:n,errors:r,disabled:t,children:[Object(Q.jsx)(g.a,{value:"0",children:"Ch\u1ecdn ngo\u1ea1i ng\u1eef"}),d.categories.flanguage.length>0&&d.categories.flanguage.map((function(e){return Object(Q.jsx)(g.a,{value:e.MaNgoaiNgu,children:e.TenNgoaiNgu},e.MaNgoaiNgu)}))]})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsxs)(D.a,{select:!0,onChange:function(e){!function(e,a){var t=e.target,n=t.name,r=t.value,c=Object(S.a)(o);i(n,r),c[a].MaTrinhDo=r,l(c)}(e,c)},nameTitle:"Tr\xecnh \u0111\u1ed9 ngo\u1ea1i ng\u1eef",name:"MaTrinhDo".concat(c),defaultValue:"0",rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},control:n,errors:r,disabled:t,children:[Object(Q.jsx)(g.a,{value:"0",children:"Ch\u1ecdn tr\xecnh \u0111\u1ed9"}),s.length>0&&s.map((function(e,a){if(a==c)return e.map((function(e){return Object(Q.jsx)(g.a,{value:e.MaTrinhDo,children:e.TenTrinhDo},e.MaTrinhDo)}))}))]})})]})]},e.MaNgoaiNgu)})),t||Object(Q.jsxs)(O.a,{size:"small",onClick:function(){l([].concat(Object(S.a)(o),[{MaNgoaiNgu:"0",MaTrinhDo:"0"}]))},className:a.addIcon,children:[" ",Object(Q.jsx)(E.a,{})]})]})]})})},L=Object(f.a)((function(e){return{}})),U=function(e){L();var a=e.disable,t=e.control,n=e.errors;e.setValue;return Object(Q.jsxs)(b.a,{container:!0,spacing:1,children:[Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{type:"date",nameTitle:"Ng\xe0y v\xe0o \u0110o\xe0n",name:"NgayVaoDoan",control:t,errors:n,disabled:a})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{nameTitle:"N\u01a1i v\xe0o \u0110o\xe0n",name:"NoiVaoDoan",control:t,errors:n,disabled:a})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{type:"date",nameTitle:"Ng\xe0y v\xe0o \u0110\u1ea3ng l\u1ea7n \u0111\u1ea7u",name:"NgayVaoDang",control:t,errors:n,disabled:a})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{nameTitle:"N\u01a1i v\xe0o \u0110\u1ea3ng l\u1ea7n \u0111\u1ea7u",name:"NoiVaoDangLanDau",control:t,errors:n,disabled:a})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{type:"date",nameTitle:"Ng\xe0y v\xe0o \u0110\u1ea3ng ch\xednh th\u1ee9c",name:"NgayChinhThuc",control:t,errors:n,disabled:a})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{nameTitle:"N\u01a1i v\xe0o \u0110\u1ea3ng ch\xednh th\u1ee9c",name:"NoiVaoDangChinhThuc",control:t,errors:n,disabled:a})}),Object(Q.jsx)(b.a,{item:!0,xs:6,children:Object(Q.jsx)(D.a,{nameTitle:"Ng\u01b0\u1eddi gi\u1edbi thi\u1ec7u",name:"NguoiGioiThieu",control:t,errors:n,disabled:a})})]})},z=t(322),P=t(74),W=t(75),_=t(323),R=["children","value","index"],K=Object(f.a)((function(e){return{header:{marginBottom:"40px"},headerContent:{textTransform:"uppercase",fontWeight:"600"},wrapper:{marginTop:"8px"},paper:{padding:"16px",marginBottom:"16px"},paperContent:{paddingBottom:"60px"},imageWrapper:{position:"relative",height:"200px",width:"150px",background:"white",margin:"0 auto"},fileUpload:{cursor:"pointer",position:"absolute",width:"100%",height:"100%",outline:"1px solid #ddd","&::before":{content:'"+"',position:"absolute",left:0,top:0,width:"100%",height:"100%",fontSize:"11rem",margin:"auto",textAlign:"center",backgroundColor:e.palette.common.white}},closeBtn:{position:"absolute",top:"2px",right:"2px",backgroundColor:e.palette.common.white,color:e.palette.primary.main,"&:hover":{backgroundColor:e.palette.common.white,color:e.palette.primary.main}},loadingWrapper:{position:"relative",width:"100%",height:"100%"},loading:{position:"absolute",left:"calc( 50% - 20px )",top:"calc( 50% - 20px )"}}}));a.default=function(){var e=K(),a=Object(v.useContext)(P.a),t=a.info,n=a.infoDispatch,l=Object(v.useContext)(w.a),f=l.category,M=l.categoryDispatch,H=Object(v.useContext)(B.a),S=(H.openSnackbar,H.openSnackbarDispatch),q=Object(v.useContext)(W.a),E=q.loading,X=q.loadingDispatch,I=Object(v.useState)(0),J=Object(s.a)(I,2),F=J[0],L=J[1],Y=Object(v.useState)(!0),Z=Object(s.a)(Y,2),$=Z[0],ee=Z[1],ae=Object(v.useState)([]),te=Object(s.a)(ae,2),ne=te[0],re=te[1],ie=Object(v.useState)([]),ce=Object(s.a)(ie,2),oe=ce[0],se=ce[1],le=Object(v.useState)([]),ue=Object(s.a)(le,2),de=ue[0],he=ue[1],je=Object(v.useState)(""),be=Object(s.a)(je,2),pe=be[0],Oe=be[1],ge=Object(v.useState)({provinceArr:[],districtArr:[],wardArr:[]}),xe=Object(s.a)(ge,2),me=xe[0],fe=xe[1],ve=Object(v.useState)({provinceArr:[],districtArr:[],wardArr:[]}),Te=Object(s.a)(ve,2),Ne=Te[0],Ce=Te[1],Ve=Object(v.useState)({provinceArr:[],districtArr:[],wardArr:[]}),De=Object(s.a)(Ve,2),ye=De[0],we=De[1],Ae=Object(v.useState)({provinceValue:"",districtValue:"",wardValue:""}),Me=Object(s.a)(Ae,2),Qe=Me[0],He=Me[1],ke=Object(v.useState)({provinceValue:"",districtValue:"",wardValue:""}),Se=Object(s.a)(ke,2),qe=Se[0],Ee=Se[1],Xe=Object(v.useState)({provinceValue:"",districtValue:"",wardValue:""}),Ie=Object(s.a)(Xe,2),Je=Ie[0],Be=Ie[1],Fe=["NgaySinh","NgayChinhThuc","NgayVaoDang","NgayVaoDoan"],Ge=Object(T.b)(),Le=Ge.handleSubmit,Ue=Ge.control,ze=Ge.setValue,Pe=Ge.formState.errors,We=Ge.getValues,_e=(Ge.reset,Ge.clearErrors),Re=function(e){var a=e.children,t=e.value,n=e.index,r=Object(o.a)(e,R);return Object(Q.jsx)("div",Object(c.a)(Object(c.a)({role:"tabpanel",hidden:t!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},r),{},{children:t===n&&Object(Q.jsx)(d.a,{p:3,children:a})}))},Ke=function(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}},Ye=function(e){ze(e.target.name,e.target.value)};return Object(v.useEffect)((function(){t.info&&!t.loading&&Object.keys(t.info).forEach((function(e){if(Fe.includes(e))ze(e,Object(_.d)(t.info[e]));else if("HinhAnh"==e)ze(e,{preview:t.info[e]}),he({preview:t.info[e]}),Oe(t.info[e]);else if("NgoaiNgu"==e){var a=[];t.info[e].map((function(e,t){ze("MaNgoaiNgu".concat(t),e.MaNgoaiNgu),ze("MaTrinhDo".concat(t),e.MaTrinhDo),a.push({MaNgoaiNgu:e.MaNgoaiNgu,MaTrinhDo:e.MaTrinhDo})})),re(a)}else if("DiaChi"==e){console.log("SetDiaChi");var n=function(){var e=Object(i.a)(r.a.mark((function e(){var a,n,i,o,s,l,u,d,h;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.get("https://provinces.open-api.vn/api/");case 2:return a=e.sent,e.next=5,A.a.get("https://provinces.open-api.vn/api/p/".concat(t.info.DiaChi.QueQuan.provinceValue,"/?depth=2"));case 5:return n=e.sent,e.next=8,A.a.get("https://provinces.open-api.vn/api/d/".concat(t.info.DiaChi.QueQuan.districtValue,"/?depth=2"));case 8:return i=e.sent,e.next=11,A.a.get("https://provinces.open-api.vn/api/");case 11:return o=e.sent,e.next=14,A.a.get("https://provinces.open-api.vn/api/p/".concat(t.info.DiaChi.DiaChiThuongTru.provinceValue,"/?depth=2"));case 14:return s=e.sent,e.next=17,A.a.get("https://provinces.open-api.vn/api/d/".concat(t.info.DiaChi.DiaChiThuongTru.districtValue,"/?depth=2"));case 17:return l=e.sent,e.next=20,A.a.get("https://provinces.open-api.vn/api/");case 20:return u=e.sent,e.next=23,A.a.get("https://provinces.open-api.vn/api/p/".concat(t.info.DiaChi.NoiOHienTai.provinceValue,"/?depth=2"));case 23:return d=e.sent,e.next=26,A.a.get("https://provinces.open-api.vn/api/d/".concat(t.info.DiaChi.NoiOHienTai.districtValue,"/?depth=2"));case 26:h=e.sent,fe(Object(c.a)(Object(c.a)({},me),{},{provinceArr:a.data,districtArr:n.data.districts,wardArr:i.data.wards})),Ce(Object(c.a)(Object(c.a)({},Ne),{},{provinceArr:o.data,districtArr:s.data.districts,wardArr:l.data.wards})),we(Object(c.a)(Object(c.a)({},ye),{},{provinceArr:u.data,districtArr:d.data.districts,wardArr:h.data.wards})),He(Object(c.a)(Object(c.a)({},Qe),{},{provinceValue:t.info.DiaChi.QueQuan.provinceValue,districtValue:t.info.DiaChi.QueQuan.districtValue,wardValue:t.info.DiaChi.QueQuan.wardValue})),Ee(Object(c.a)(Object(c.a)({},qe),{},{provinceValue:t.info.DiaChi.DiaChiThuongTru.provinceValue,districtValue:t.info.DiaChi.DiaChiThuongTru.districtValue,wardValue:t.info.DiaChi.DiaChiThuongTru.wardValue})),Be(Object(c.a)(Object(c.a)({},Je),{},{provinceValue:t.info.DiaChi.NoiOHienTai.provinceValue,districtValue:t.info.DiaChi.NoiOHienTai.districtValue,wardValue:t.info.DiaChi.NoiOHienTai.wardValue})),ze("QQTinh",t.info.DiaChi.QueQuan.provinceValue),ze("QQHuyen",t.info.DiaChi.QueQuan.districtValue),ze("QQXa",t.info.DiaChi.QueQuan.wardValue),ze("QQChiTiet",t.info.DiaChi.QueQuan.detail),ze("DCTTTinh",t.info.DiaChi.DiaChiThuongTru.provinceValue),ze("DCTTHuyen",t.info.DiaChi.DiaChiThuongTru.districtValue),ze("DCTTXa",t.info.DiaChi.DiaChiThuongTru.wardValue),ze("DCTTChiTiet",t.info.DiaChi.DiaChiThuongTru.detail),ze("NOHTTinh",t.info.DiaChi.NoiOHienTai.provinceValue),ze("NOHTHuyen",t.info.DiaChi.NoiOHienTai.districtValue),ze("NOHTXa",t.info.DiaChi.NoiOHienTai.wardValue),ze("NOHTChiTiet",t.info.DiaChi.NoiOHienTai.detail),X({type:"CLOSE_LOADING"});case 46:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();o=t.info.DiaChi,0!==Object.keys(o).length&&n()}else ze(e,t.info[e]);var o}))}),[t]),Object(v.useEffect)((function(){var e=function(){var e=Object(i.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.next=3,Promise.all(ne.map(function(){var e=Object(i.a)(r.a.mark((function e(t,n){var i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("0"==t.MaNgoaiNgu){e.next=7;break}return e.next=3,Object(N.e)(t.MaNgoaiNgu);case 3:i=e.sent,ze("MaNgoaiNgu".concat(n),t.MaNgoaiNgu),ze("MaTrinhDo".concat(n),t.MaTrinhDo),a[n]=i;case 7:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}()));case 3:se(a),ze("NgoaiNgu",ne);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();ne.length>0&&e()}),[ne]),Object(v.useEffect)((function(){X({type:"OPEN_LOADING"}),Object(N.d)(M)}),[]),Object(Q.jsxs)(y.a,{sidebar:!0,children:[Object(Q.jsx)("div",{className:e.header,children:Object(Q.jsx)(h.a,{className:e.headerContent,variant:"h5",children:"Th\xf4ng tin \u0110\u1ea3ng vi\xean"})}),$?Object(Q.jsx)(z.a,{onClick:function(){return ee(!1)},primary:!0,children:"Ch\u1ec9nh s\u1eeda th\xf4ng tin"}):Object(Q.jsxs)(Q.Fragment,{children:[Object(Q.jsx)(z.a,{onClick:Le((function(e){X({type:"OPEN_LOADING"}),JSON.stringify(We("NgoaiNgu"))===JSON.stringify(t.info.NgoaiNgu)&&delete e.NgoaiNgu,JSON.stringify(de.preview)===JSON.stringify(pe)&&delete e.HinhAnh,JSON.stringify(Object(c.a)(Object(c.a)({},Qe),{},{detail:We("QQChiTiet")}))!==JSON.stringify(t.info.DiaChi.QueQuan)&&(e.QQAddress=Object(c.a)(Object(c.a)({},Qe),{},{detail:We("QQChiTiet")})),JSON.stringify(Object(c.a)(Object(c.a)({},qe),{},{detail:We("DCTTChiTiet")}))!==JSON.stringify(t.info.DiaChi.DiaChiThuongTru)&&(e.DCTTAddress=Object(c.a)(Object(c.a)({},qe),{},{detail:We("DCTTChiTiet")})),JSON.stringify(Object(c.a)(Object(c.a)({},Je),{},{detail:We("NOHTChiTiet")}))!==JSON.stringify(t.info.DiaChi.NoiOHienTai)&&(e.NOHTAddress=Object(c.a)(Object(c.a)({},Je),{},{detail:We("NOHTChiTiet")})),Object(C.e)(n,e,S),ee(!0)})),info:!0,children:"L\u01b0u"}),Object(Q.jsx)(j.a,{onClick:function(){Object.keys(t.info).forEach((function(e){return ze(e,t.info[e])})),Object.keys(t.info).forEach((function(e){var a={};a.preview=t.info.HinhAnh,he(a),"NgoaiNgu"==e?t.info[e].map((function(e,a){ze("MaNgoaiNgu".concat(a),e.MaNgoaiNgu),ze("MaTrinhDo".concat(a),e.MaTrinhDo)})):ze(e,t.info[e])})),ee(!0)},children:"H\u1ee7y"})]}),Object(Q.jsx)(V.a,{data:t.info,button:!0}),E.open||Object(Q.jsxs)(b.a,{container:!0,spacing:2,className:e.wrapper,children:[Object(Q.jsx)(b.a,{item:!0,xs:4,children:Object(Q.jsxs)(p.a,{variant:"outlined",className:e.paper,children:[Object(Q.jsx)("div",{className:e.imageWrapper,children:Object(Q.jsx)(Q.Fragment,{children:(null===de||void 0===de?void 0:de.preview)?Object(Q.jsxs)(Q.Fragment,{children:[Object(Q.jsx)("img",{className:e.fileUpload,style:{height:"100%"},src:de.preview,alt:""}),$||Object(Q.jsx)(O.a,{className:e.closeBtn,size:"small",onClick:function(){he(""),ze("HinhAnh","")},children:Object(Q.jsx)(u.a,{})})]}):Object(Q.jsx)(Q.Fragment,{children:Object(Q.jsx)("input",{type:"file",multiple:!0,className:e.fileUpload,onChange:function(e){var a=e.target.files[0];a.preview=URL.createObjectURL(a),ze("HinhAnh",a),he(a)}})})})}),Object(Q.jsx)(D.a,{nameTitle:"M\xe3 \u0110\u1ea3ng vi\xean",name:"MaSoDangVien",control:Ue,errors:Pe,disabled:!0}),Object(Q.jsx)(D.a,{nameTitle:"H\u1ecd t\xean",name:"HoTen",control:Ue,errors:Pe,disabled:$}),Object(Q.jsx)(D.a,{select:!0,nameTitle:"Chi b\u1ed9",name:"MaChiBo",defaultValue:"",control:Ue,errors:Pe,disabled:!0,onChange:Ye,children:f.categories.partycell.map((function(e){return Object(Q.jsx)(g.a,{value:e.MaChiBo,children:e.TenChiBo},e.MaChiBo)}))}),Object(Q.jsxs)(D.a,{select:!0,onChange:Ye,nameTitle:"Gi\u1edbi t\xednh",name:"GioiTinh",defaultValue:"0",rules:{validate:function(e){return"0"!=e||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}},control:Ue,errors:Pe,disabled:$,children:[Object(Q.jsx)(g.a,{value:"0",children:"Ch\u1ecdn gi\u1edbi t\xednh"}),Object(Q.jsx)(g.a,{value:"m",children:"Nam"}),Object(Q.jsx)(g.a,{value:"f",children:"N\u1eef"}),Object(Q.jsx)(g.a,{value:"u",children:"Kh\xe1c"})]}),Object(Q.jsx)(D.a,{nameTitle:"CMND",name:"CMND",control:Ue,errors:Pe,disabled:$}),Object(Q.jsx)(D.a,{select:!0,nameTitle:"Ch\u1ee9c v\u1ee5",name:"MaChucVu",defaultValue:"",control:Ue,errors:Pe,disabled:!0,onChange:Ye,children:f.categories.position.map((function(e){return Object(Q.jsx)(g.a,{value:e.MaChucVu,children:e.TenChucVu},e.MaChucVu)}))})]})}),Object(Q.jsx)(b.a,{item:!0,xs:8,children:Object(Q.jsxs)(p.a,{className:e.paperContent,variant:"outlined",children:[Object(Q.jsx)(d.a,{sx:{borderBottom:1,borderColor:"divider"},children:Object(Q.jsxs)(x.a,{value:F,onChange:function(e,a){L(a)},"aria-label":"simple tabs example",indicatorColor:"primary",textColor:"primary",children:[Object(Q.jsx)(m.a,Object(c.a)({label:"C\u01a1 b\u1ea3n"},Ke(0))),Object(Q.jsx)(m.a,Object(c.a)({label:"Tr\xecnh \u0111\u1ed9"},Ke(1))),Object(Q.jsx)(m.a,Object(c.a)({label:"V\u1ec1 \u0110o\xe0n / \u0110\u1ea3ng"},Ke(2)))]})}),E.open||Object(Q.jsxs)("form",{className:"add-form",children:[Object(Q.jsx)(Re,{value:F,index:0,children:Object(Q.jsx)(k,{loading:E.open,disable:$,control:Ue,errors:Pe,setValue:ze,clearErrors:_e,getValues:We,qqArr:me,setQqArr:fe,dcttArr:Ne,setDcttArr:Ce,nohtArr:ye,setNohtArr:we,qqValue:Qe,setQqValue:He,dcttValue:qe,setDcttValue:Ee,nohtValue:Je,setNohtValue:Be,F:!0})}),Object(Q.jsx)(Re,{value:F,index:1,children:Object(Q.jsx)(G,{disable:$,control:Ue,errors:Pe,setValue:ze,loading:E.open,flArray:ne,setFlArray:re,levelArray:oe,setLevelArray:se})}),Object(Q.jsx)(Re,{value:F,index:2,children:Object(Q.jsx)(U,{disable:$,control:Ue,errors:Pe,setValue:ze,loading:E.open})})]})]})})]})]})}}}]);
//# sourceMappingURL=24.c4ce0aea.chunk.js.map