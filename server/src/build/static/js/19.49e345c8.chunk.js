(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[19],{331:function(e,t,n){"use strict";n.d(t,"g",(function(){return c})),n.d(t,"b",(function(){return r})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return o})),n.d(t,"d",(function(){return u})),n.d(t,"f",(function(){return s})),n.d(t,"i",(function(){return h})),n.d(t,"a",(function(){return b})),n.d(t,"h",(function(){return g})),n.d(t,"j",(function(){return d})),n.d(t,"k",(function(){return x}));var a=n(323),i=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"portrait";return{pageOrientation:n,content:[{columns:[{text:["\u0110\u1ea2NG B\u1ed8 \u0110\u1ea0I H\u1eccC C\u1ea6N TH\u01a0 \n","CHI B\u1ed8 KHOA CNTT&TT"],alignment:"center"},{text:[]},[{text:"\u0110\u1ea2NG C\u1ed8NG S\u1ea2N VI\u1ec6T NAM \n",alignment:"center"},{text:"Ninh Ki\u1ec1u, ng\xe0y ".concat((new Date).getDate()," th\xe1ng ").concat((new Date).getMonth()+1," n\u0103m ").concat((new Date).getFullYear()," \n"),alignment:"center"}]]},{text:"".concat(t," \n"),alignment:"center",style:"header",bold:!0,margin:[0,24,0,24]},{style:"tableExample",color:"#222",table:{headerRows:2,widths:e.widths,body:e.body}}],styles:{header:{fontSize:14,alignment:"justify"},tableExample:{margin:[0,5,0,15]},content:{margin:[0,30,0,0]},tableHeader:{bold:!0,fontSize:13,color:"black"}}}},c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"DANH S\xc1CH \u0110\u1ea2NG VI\xcaN",n={widths:["auto","*","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center",rowSpan:2},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center",rowSpan:2},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center",rowSpan:2},{text:"Gi\u1edbi t\xednh",style:"tableHeader",alignment:"center",rowSpan:2},{text:"Ng\xe0y sinh",style:"tableHeader",alignment:"center",rowSpan:2},{text:"N\u01a1i sinh",style:"tableHeader",alignment:"center",rowSpan:2},{text:"Ng\xe0y v\xe0o \u0110\u1ea3ng",style:"tableHeader",alignment:"center",colSpan:2},{text:""},{text:"N\u01a1i v\xe0o \u0110\u1ea3ng",style:"tableHeader",alignment:"center",colSpan:2},{text:""},{text:"S\u1ed1 th\u1ebb",style:"tableHeader",alignment:"center",rowSpan:2},{text:"Ch\u1ee9c v\u1ee5",style:"tableHeader",alignment:"center",rowSpan:2},{text:"D\xe2n t\u1ed9c",style:"tableHeader",alignment:"center",rowSpan:2},{text:"T\xf4n gi\xe1o",style:"tableHeader",alignment:"center",rowSpan:2}],["","","","","","",{text:"L\u1ea7n \u0111\u1ea7u",style:"tableHeader"},{text:"Ch\xednh th\u1ee9c",style:"tableHeader"},{text:"L\u1ea7n \u0111\u1ea7u",style:"tableHeader"},{text:"Ch\xednh th\u1ee9c",style:"tableHeader"},"","","",""]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenGioiTinh,Object(a.j)(e.NgaySinh),e.NoiSinh,Object(a.j)(e.NgayVaoDang),Object(a.j)(e.NgayChinhThuc),e.NoiVaoDangLanDau,e.NoiVaoDangChinhThuc,e.SoThe,e.TenChucVu,e.TenDanToc,e.TenTonGiao])})),i(n,t,"landscape")},r=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"Chi b\u1ed9",style:"tableHeader",alignment:"center"},{text:"Lo\u1ea1i",style:"tableHeader",alignment:"center"},{text:"N\u0103m",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenChiBo,e.TenLoai,e.Nam])})),i(n,t)},l=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n t\u1eeb",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n \u0111\u1ebfn",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n \u0111i",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n v\u1ec1",style:"tableHeader",alignment:"center"},{text:"Ghi ch\xfa",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenHinhThuc,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenTuDangBo+", chi b\u1ed9 "+e.TenChiBoTu,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenDenDangBo+", chi b\u1ed9 "+e.TenChiBoDen,Object(a.j)(e.NgayChuyenDi),e.NgayChuyenDen?Object(a.j)(e.NgayChuyenDen):"",e.GhiChu])})),i(n,t)},o=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n t\u1eeb",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n \u0111\u1ebfn",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n \u0111\u1ebfn",style:"tableHeader",alignment:"center"},{text:"Ghi ch\xfa",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenHinhThuc,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenTuDangBo+", chi b\u1ed9 "+e.TenChiBoTu,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenDenDangBo+", chi b\u1ed9 "+e.TenChiBoDen,Object(a.j)(e.NgayChuyenDen),e.GhiChu])})),i(n,t)},u=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n t\u1eeb",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n \u0111\u1ebfn",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n",style:"tableHeader",alignment:"center"},{text:"Ghi ch\xfa",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenHinhThuc,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenTuDangBo+", chi b\u1ed9 "+e.TenChiBoTu,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenDenDangBo+", chi b\u1ed9 "+e.TenChiBoDen,Object(a.j)(e.NgayChuyenDi),e.GhiChu])})),i(n,t)},s=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"Lo\u1ea1i",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n t\u1eeb",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n \u0111\u1ebfn",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n \u0111i",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n \u0111\u1ebfn/v\u1ec1",style:"tableHeader",alignment:"center"},{text:"Ghi ch\xfa",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.LoaiHinhThuc,e.TenHinhThuc,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenTuDangBo+", chi b\u1ed9 "+e.TenChiBoTu,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenDenDangBo+", chi b\u1ed9 "+e.TenChiBoDen,e.NgayChuyenDi?Object(a.j)(e.NgayChuyenDi):"",e.NgayChuyenDen?Object(a.j)(e.NgayChuyenDen):"",e.GhiChu])})),i(n,t)},h=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"T\xean khen th\u01b0\u1edfng",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y khen th\u01b0\u1edfng",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenKhenThuong,Object(a.j)(e.NgayKhenThuong),e.HinhThuc])})),i(n,t)},b=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"T\xean k\u1ef7 lu\u1eadt",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y k\u1ef7 lu\u1eadt",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenKyLuat,Object(a.j)(e.NgayKyLuat),e.HinhThuc])})),i(n,t)},g=function(e,t){var n={widths:["auto","auto","*","*","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"M\xe3 chi b\u1ed9",style:"tableHeader",alignment:"center"},{text:"T\xean chi b\u1ed9",style:"tableHeader",alignment:"center"},{text:"B\xed th\u01b0",style:"tableHeader",alignment:"center"},{text:"Ph\xf3 b\xed th\u01b0",style:"tableHeader",alignment:"center"},{text:"S\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.MaChiBo,e.TenChiBo,e.BiThu,e.PhoBiThu,e.SoDangVien])})),i(n,t)},d=function(e,t,n){console.log(e),console.log(t);var i=t.TenBieuQuyet,c=t.ThoiGianBatDau,r=t.ThoiGianKetThuc,l=t.UngCuVien,o=t.NguoiThamGia,u={widths:["auto","*","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"S\u1ed1 phi\u1ebfu t\xedn nhi\u1ec7m",style:"tableHeader",alignment:"center"},{text:"S\u1ed1 phi\u1ebfu kh\xf4ng t\xedn nhi\u1ec7m",style:"tableHeader",alignment:"center"},{text:"T\u1ec9 l\u1ec7 phi\u1ebfu t\xedn nhi\u1ec7m",style:"tableHeader",alignment:"center"},{text:"T\u1ec9 l\u1ec7 phi\u1ebfu kh\xf4ng t\xedn nhi\u1ec7m",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){u.body.push([t+1,e.HoTen,e.MaSoDangVien,e.SoPhieuTinNhiem,e.SoPhieuKhongTinNhiem,e.TiLeTinNhiem,e.TiLeKhongTinNhiem])})),{content:[{columns:[{text:["\u0110\u1ea2NG B\u1ed8 \u0110\u1ea0I H\u1eccC C\u1ea6N TH\u01a0 \n","CHI B\u1ed8 KHOA CNTT&TT"],alignment:"center",margin:[0,0,30,20]},[{text:"\u0110\u1ea2NG C\u1ed8NG S\u1ea2N VI\u1ec6T NAM \n",alignment:"center",margin:[30,0,0,0]},{text:"Ninh Ki\u1ec1u, ng\xe0y ".concat((new Date).getDate()," th\xe1ng ").concat((new Date).getMonth()+1," n\u0103m ").concat((new Date).getFullYear()," \n"),alignment:"center",italics:!0,margin:[30,0,0,0]}]]},{text:"K\u1ebeT QU\u1ea2 BI\u1ec2U QUY\u1ebeT \n",alignment:"center",style:"header",bold:!0},{text:"".concat(i," \n"),alignment:"center",bold:!0,fontSize:15,margin:[0,10,0,20]},{text:"Cu\u1ed9c bi\u1ec3u quy\u1ebft b\u1eaft \u0111\u1ea7u v\xe0o ".concat(Object(a.k)(c)," v\xe0 k\u1ebft th\xfac v\xe0o ").concat(Object(a.k)(r))},{text:"1. Th\u1ed1ng k\xea",style:"header1"},{text:["S\u1ed1 \u1ee9ng c\u1eed vi\xean: ".concat(l.length," \n"),"S\u1ed1 ng\u01b0\u1eddi tham gia bi\u1ec3u quy\u1ebft: ".concat(o.length," \n"),"S\u1ed1 ng\u01b0\u1eddi kh\xf4ng bi\u1ec3u quy\u1ebft: ".concat(n," \n "),"T\u1ec9 l\u1ec7 ng\u01b0\u1eddi tham gia bi\u1ec3u quy\u1ebft: ".concat(+((o.length-n)/o.length*100).toFixed(2),"%")]},{text:"2. K\u1ebft qu\u1ea3",style:"header1"},{text:"(K\u1ebft qu\u1ea3 \u0111\u01b0\u1ee3c s\u0103p x\u1ebfp theo s\u1ed1 l\u01b0\u1ee3ng phi\u1ebfu b\u1ea7u)."},{style:"tableExample",color:"#222",table:{headerRows:2,widths:u.widths,body:u.body}}],styles:{header:{fontSize:16,alignment:"justify"},tableExample:{margin:[0,5,0,15]},content:{margin:[0,30,0,0]},tableHeader:{bold:!0,fontSize:13,color:"black"},header1:{margin:[0,10,0,0],bold:!0}},defaultStyle:{fontSize:13,lineHeight:1.3}}},x=function(e,t,n){console.log(e),console.log(t);var i=t.TenBieuQuyet,c=t.ThoiGianBatDau,r=t.ThoiGianKetThuc,l=t.UngCuVien,o=t.NguoiThamGia,u={widths:["auto","*","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"S\u1ed1 phi\u1ebfu",style:"tableHeader",alignment:"center"},{text:"T\u1ec9 l\u1ec7 phi\u1ebfu",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){u.body.push([t+1,e.HoTen,e.MaSoDangVien,e.SoPhieu,e.TiLe])})),{content:[{columns:[{text:["\u0110\u1ea2NG B\u1ed8 \u0110\u1ea0I H\u1eccC C\u1ea6N TH\u01a0 \n","CHI B\u1ed8 KHOA CNTT&TT"],alignment:"center",margin:[0,0,30,20]},[{text:"\u0110\u1ea2NG C\u1ed8NG S\u1ea2N VI\u1ec6T NAM \n",alignment:"center",margin:[30,0,0,0]},{text:"Ninh Ki\u1ec1u, ng\xe0y ".concat((new Date).getDate()," th\xe1ng ").concat((new Date).getMonth()+1," n\u0103m ").concat((new Date).getFullYear()," \n"),alignment:"center",italics:!0,margin:[30,0,0,0]}]]},{text:"K\u1ebeT QU\u1ea2 BI\u1ec2U QUY\u1ebeT \n",alignment:"center",style:"header",bold:!0},{text:"".concat(i," \n"),alignment:"center",bold:!0,fontSize:15,margin:[0,10,0,20]},{text:"Cu\u1ed9c bi\u1ec3u quy\u1ebft b\u1eaft \u0111\u1ea7u v\xe0o ".concat(Object(a.k)(c)," v\xe0 k\u1ebft th\xfac v\xe0o ").concat(Object(a.k)(r))},{text:"1. Th\u1ed1ng k\xea",style:"header1"},{text:["S\u1ed1 \u1ee9ng c\u1eed vi\xean: ".concat(l.length," \n"),"S\u1ed1 ng\u01b0\u1eddi tham gia bi\u1ec3u quy\u1ebft: ".concat(o.length," \n"),"S\u1ed1 ng\u01b0\u1eddi kh\xf4ng bi\u1ec3u quy\u1ebft: ".concat(n," \n "),"T\u1ec9 l\u1ec7 ng\u01b0\u1eddi tham gia bi\u1ec3u quy\u1ebft: ".concat((o.length-n)/o.length*100,"%")]},{text:"2. K\u1ebft qu\u1ea3",style:"header1"},{text:"(K\u1ebft qu\u1ea3 \u0111\u01b0\u1ee3c s\u0103p x\u1ebfp theo s\u1ed1 l\u01b0\u1ee3ng phi\u1ebfu b\u1ea7u)."},{style:"tableExample",color:"#222",table:{headerRows:2,widths:u.widths,body:u.body}}],styles:{header:{fontSize:16,alignment:"justify"},tableExample:{margin:[0,5,0,15]},content:{margin:[0,30,0,0]},tableHeader:{bold:!0,fontSize:13,color:"black"},header1:{margin:[0,10,0,0],bold:!0}},defaultStyle:{fontSize:13,lineHeight:1.3}}}},334:function(e,t,n){"use strict";var a=n(187);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n(188)),c=n(1),r=(0,i.default)((0,c.jsx)("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"}),"FileDownload");t.default=r},444:function(e,t,n){"use strict";n(0);var a=n(445),i=(n(489),n(446),n(173)),c=n(1);t.a=function(e){var t=e.label,n=e.data,r=e.twoColor,l=["#EF5350","#EC407A","#AB47BC","#7E57C2","#5C6BC0","#42A5F5","#26A69A","#66BB6A","#9CCC65","#FFEE58","#FFA726","#8D6E63","#78909C"].sort((function(){return Math.random()-.5}));return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(i.a,{component:"body",textAlign:"center",variant:"button",children:t}),Object(c.jsx)(a.b,{data:{labels:n.map((function(e){return e.label})),datasets:[{backgroundColor:r?["#66BB6A","#FFEE58"]:l,data:n.map((function(e){return e.quantity}))}]},option:{title:{display:!0,text:"Predicted world population (millions) in 2050"}}})]})}},859:function(e,t,n){"use strict";n.r(t);var a=n(3),i=n(17),c=n.n(i),r=n(4),l=n(24),o=n(10),u=n(336),s=n.n(u),h=n(649),b=n.n(h),g=n(334),d=n.n(g),x=n(173),m=n(660),y=n(571),j=n(570),p=n(297),O=n(175),T=n(593),f=n(610),H=n(186),C=n(0),v=n(335),S=n(328),N=n(345),D=n(31),w=function(){var e=Object(l.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(t),e.prev=1,"all"!=t.condition){e.next=8;break}return e.next=5,D.a.get("/api/statistic/".concat(t.name,"/"));case 5:n=e.sent,e.next=11;break;case 8:return e.next=10,D.a.get("/api/statistic/".concat(t.name,"?MaChiBo=")+t.condition);case 10:n=e.sent;case 11:if(200!=n.status){e.next=14;break}return console.log(n.data.data),e.abrupt("return",n.data.data);case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(1),console.log(e.t0.response);case 19:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t){return e.apply(this,arguments)}}(),B=(n(143),n(444)),L=n(332),M=n(1),k=(Object(H.a)((function(e){return{paperStatistic:Object(r.a)({padding:"8px",margin:"0 8px 16px"},"padding","8px"),gridContainer:{minWidth:"150px"}}})),n(322)),G=n(340),E=n(134),V=n(74),q=n(75),K=n(139),A=n(331),I=n(323),F=Object(H.a)((function(e){return{header:{marginBottom:"40px"},headerContent:{textTransform:"uppercase",fontWeight:"600"},table:{width:"100%",backgroundColor:"white",marginTop:"18px"},paper:{display:"flex",alignItems:"center",flexWrap:"wrap",padding:"16px",marginBottom:"16px"},inputSelect:{marginRight:"20px",marginLeft:"16px"},paperStatistic:{padding:"8px",margin:"0 8px"},paperWrapper:{display:"flex",flexWrap:"wrap"}}}));t.default=function(){var e=F(),t=Object(C.useContext)(K.a),n=(t.partyMember,t.partyMemberDispatch,Object(C.useContext)(E.a)),i=n.category,u=n.categoryDispatch,h=Object(C.useContext)(q.a),g=(h.loading,h.loadingDispatch),H=Object(C.useContext)(V.a).info,D=Object(C.useState)(1==H.info.Quyen[12]?"partycell":"position"),z=Object(o.a)(D,2),Q=z[0],P=z[1],U=Object(C.useState)("partycell"),W=Object(o.a)(U,2),_=W[0],R=W[1],Y=Object(C.useState)([]),J=Object(o.a)(Y,2),X=J[0],Z=J[1],$=Object(C.useState)(""),ee=Object(o.a)($,2),te=ee[0],ne=ee[1],ae=Object(C.useState)([]),ie=Object(o.a)(ae,2),ce=ie[0],re=ie[1],le=Object(C.useState)(""),oe=Object(o.a)(le,2),ue=oe[0],se=oe[1],he=Object(C.useState)(!1),be=Object(o.a)(he,2),ge=be[0],de=be[1],xe=Object(C.useState)([]),me=Object(o.a)(xe,2),ye=me[0],je=me[1],pe=Object(I.a)(ye,je);pe.pop();var Oe=Object(C.useState)(pe),Te=Object(o.a)(Oe,2),fe=Te[0],He=Te[1],Ce=Object(I.g)(ye,fe),ve=Object(C.useState)([]),Se=Object(o.a)(ve,2),Ne=Se[0],De=Se[1],we=Object(C.useState)([]),Be=Object(o.a)(we,2),Le=Be[0],Me=Be[1],ke=Object(C.useState)([]),Ge=Object(o.a)(ke,2),Ee=Ge[0],Ve=Ge[1],qe=Object(C.useState)([]),Ke=Object(o.a)(qe,2),Ae=Ke[0],Ie=Ke[1],Fe=Object(C.useState)([]),ze=Object(o.a)(Fe,2),Qe=ze[0],Pe=ze[1],Ue=Object(C.useState)([]),We=Object(o.a)(Ue,2),_e=We[0],Re=We[1],Ye=Object(C.useState)([]),Je=Object(o.a)(Ye,2),Xe=Je[0],Ze=Je[1],$e=Object(C.useState)([]),et=Object(o.a)($e,2),tt=et[0],nt=et[1],at=Object(C.useState)([]),it=Object(o.a)(at,2),ct=it[0],rt=it[1],lt=function(e){ne(e.target.value)},ot=function(){var e=Object(l.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(r.a)({},Q,te),1!=H.info.Quyen[12]&&(t.partycell=H.info.MaChiBo),de(!0),e.next=5,Object(N.b)(t);case 5:n=e.sent,je(n),de(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ut=function(){return 1==H.info.Quyen[12]?"all":H.info.MaChiBo};return Object(C.useEffect)((function(){He(pe)}),[ye]),Object(C.useEffect)((function(){var e=function(){var e=Object(l.a)(c.a.mark((function e(){var t,n,a,i,r,l,o,u,s,h,b,g,d,x,m,y,j,p;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w({name:"gender",condition:ut()});case 2:return t=e.sent,n=t.map((function(e){return{label:(t=e.GioiTinh,{m:"Nam",f:"N\u1eef",u:"Kh\xe1c"}[t]),quantity:e.SoLuong};var t})),De(n),e.next=7,w({name:"partycell",condition:ut()});case 7:return a=e.sent,i=a.map((function(e){return{label:e.TenChiBo,quantity:e.SoLuong}})),Me(i),e.next=12,w({name:"position",condition:ut()});case 12:return r=e.sent,l=r.map((function(e){return{label:e.TenChucVu,quantity:e.SoLuong}})),Ve(l),e.next=17,w({name:"ethnic",condition:ut()});case 17:return o=e.sent,u=o.map((function(e){return{label:e.TenDanToc,quantity:e.SoLuong}})),Ie(u),e.next=22,w({name:"religion",condition:ut()});case 22:return s=e.sent,h=s.map((function(e){return{label:e.TenTonGiao,quantity:e.SoLuong}})),Pe(h),e.next=27,w({name:"age",condition:ut()});case 27:return b=e.sent,g=Object.keys(b[0]).map((function(e,t){return{label:e,quantity:b[0][e]}})),Re(g),e.next=32,w({name:"it",condition:ut()});case 32:return d=e.sent,x=d.map((function(e){return{label:e.TenTinHoc,quantity:e.SoLuong}})),Ze(x),e.next=37,w({name:"politics",condition:ut()});case 37:return m=e.sent,y=m.map((function(e){return{label:e.TenChinhTri,quantity:e.SoLuong}})),nt(y),e.next=42,w({name:"flanguage",condition:ut()});case 42:j=e.sent,p=j.map((function(e){return{label:e.TenNgoaiNgu,quantity:e.SoLuong}})),rt(p);case 45:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),Object(C.useEffect)((function(){"age"!=Q&&"gender"!=Q&&(ne(""),Object(S.c)(u,Q))}),[Q]),Object(C.useEffect)((function(){"grade"!=Q?(R(Object(I.i)(Q)),Z(i.categories[Q])):re(i.categories[Q])}),[i]),Object(C.useEffect)((function(){g({type:"OPEN_LOADING"}),ce.length>0&&(se(ce[ce.length-1].Nam),Z(ce[ce.length-1].Data),g({type:"CLOSE_LOADING"}))}),[ce]),Object(C.useEffect)((function(){g({type:"OPEN_LOADING"}),X.length>0&&ne("grade"!=Q?X.length>0?X[0][_[0]]:"":X.length>0?X[0].MaLoai:""),g({type:"CLOSE_LOADING"})}),[X]),Object(M.jsx)(M.Fragment,{children:Object(M.jsxs)(L.a,{sidebar:!0,children:[Object(M.jsx)("div",{className:e.header,children:Object(M.jsx)(x.a,{className:e.headerContent,variant:"h5",children:"B\xe1o c\xe1o - th\u1ed1ng k\xea"})}),Object(M.jsxs)(m.a,{variant:"outlined",children:[Object(M.jsx)(y.a,{expandIcon:Object(M.jsx)(b.a,{}),"aria-controls":"panel1a-content",id:"panel1a-header",children:Object(M.jsx)(x.a,{className:e.heading,children:"Th\u1ed1ng k\xea"})}),Object(M.jsx)(j.a,{children:Object(M.jsxs)(p.a,{container:!0,spacing:2,children:[Object(M.jsx)(p.a,{item:!0,xs:3,children:Object(M.jsx)(B.a,{label:"Gi\u1edbi t\xednh",data:Ne})}),1==H.info.Quyen[12]&&Object(M.jsx)(p.a,{item:!0,xs:3,children:Object(M.jsx)(B.a,{label:"Chi b\u1ed9",data:Le})}),Object(M.jsx)(p.a,{item:!0,xs:3,children:Object(M.jsx)(B.a,{label:"Ch\u1ee9c v\u1ee5",data:Ee})}),Object(M.jsx)(p.a,{item:!0,xs:3,children:Object(M.jsx)(B.a,{label:"D\xe2n t\u1ed9c",data:Ae})}),Object(M.jsx)(p.a,{item:!0,xs:3,children:Object(M.jsx)(B.a,{label:"T\xf4n gi\xe1o",data:Qe})}),Object(M.jsx)(p.a,{item:!0,xs:3,children:Object(M.jsx)(B.a,{label:"\u0110\u1ed9 tu\u1ed5i",data:_e})}),Object(M.jsx)(p.a,{item:!0,xs:3,children:Object(M.jsx)(B.a,{label:"T\u0110 Tin h\u1ecdc",data:Xe})}),Object(M.jsx)(p.a,{item:!0,xs:3,children:Object(M.jsx)(B.a,{label:"T\u0110 Ch\xednh tr\u1ecb",data:tt})}),Object(M.jsx)(p.a,{item:!0,xs:3,children:Object(M.jsx)(B.a,{label:"Ngo\u1ea1i ng\u1eef",data:ct})})]})})]}),Object(M.jsxs)(O.a,{variant:"outlined",className:e.paper,children:[Object(M.jsxs)(G.a,{nameTitle:"Lo\u1ea1i b\xe1o c\xe1o",onChange:function(e){"age"==e.target.value&&ne("from18to30"),"gender"==e.target.value&&ne("m"),P(e.target.value)},value:Q,autowidth:!0,children:[1==H.info.Quyen[12]&&Object(M.jsx)(T.a,{value:"partycell",children:"Chi b\u1ed9"}),Object(M.jsx)(T.a,{value:"position",children:"Ch\u1ee9c v\u1ee5"}),Object(M.jsx)(T.a,{value:"grade",children:"X\u1ebfp Lo\u1ea1i"}),Object(M.jsx)(T.a,{value:"age",children:"Tu\u1ed5i"}),Object(M.jsx)(T.a,{value:"gender",children:"Gi\u1edbi t\xednh"}),Object(M.jsx)(T.a,{value:"ethnic",children:"D\xe2n t\u1ed9c"}),Object(M.jsx)(T.a,{value:"religion",children:"T\xf4n gi\xe1o"}),Object(M.jsx)(T.a,{value:"it",children:"Tr\xecnh \u0111\u1ed9 tin h\u1ecdc"}),Object(M.jsx)(T.a,{value:"politics",children:"Tr\xecnh \u0111\u1ed9 ch\xednh tr\u1ecb"}),Object(M.jsx)(T.a,{value:"flanguage",children:"Ngo\u1ea1i ng\u1eef"})]}),"age"==Q&&Object(M.jsxs)(G.a,{style:{marginLeft:"16px"},value:te,autowidth:!0,onChange:lt,children:[Object(M.jsx)(T.a,{value:"from18to30",children:"T\u1eeb 18 \u0111\u1ebfn 30 tu\u1ed5i"}),Object(M.jsx)(T.a,{value:"from31to40",children:"T\u1eeb 31 \u0111\u1ebfn 40 tu\u1ed5i"}),Object(M.jsx)(T.a,{value:"from41to50",children:"T\u1eeb 41 \u0111\u1ebfn 50 tu\u1ed5i"}),Object(M.jsx)(T.a,{value:"from51to60",children:"T\u1eeb 51 \u0111\u1ebfn 60 tu\u1ed5i"}),Object(M.jsx)(T.a,{value:"over60",children:"Tr\xean 61 tu\u1ed5i"})]}),"gender"==Q&&Object(M.jsxs)(G.a,{style:{marginLeft:"16px"},value:te,autowidth:!0,onChange:lt,children:[Object(M.jsx)(T.a,{value:"m",children:"Nam"}),Object(M.jsx)(T.a,{value:"f",children:"N\u1eef"}),Object(M.jsx)(T.a,{value:"u",children:"Kh\xe1c"})]}),"grade"==Q&&Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(x.a,{className:e.inputSelect,children:"N\u0103m"}),Object(M.jsx)(G.a,{value:ue,autowidth:!0,onChange:function(e){se(e.target.value),ce.forEach((function(t){t.Nam==e.target.value&&(Z(t.Data),ne(t.Data[0].MaLoai))}))},children:ce.map((function(e){return Object(M.jsx)(T.a,{value:e.Nam,children:e.Nam},e.Nam)}))}),Object(M.jsx)(G.a,{style:{marginLeft:"16px"},value:te,autowidth:!0,onChange:lt,children:X.map((function(e){return Object(M.jsx)(T.a,{value:e.MaLoai,children:e.TenLoai},e.MaLoai)}))})]}),"grade"!=Q&&"age"!=Q&&"gender"!=Q&&Object(M.jsx)(G.a,{style:{marginLeft:"16px"},value:te,autowidth:!0,onChange:lt,children:X.length>0&&X.map((function(e){return Object(M.jsx)(T.a,{value:e[_[0]],children:e[_[1]]},e[_[0]])}))})]}),Object(M.jsx)(k.a,{onClick:ot,primary:!0,children:"Xem"}),Ce.data.length>0&&Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(v.CSVLink,{data:Ce.data,headers:Ce.headers,filename:"export.csv",children:Object(M.jsxs)(k.a,{style:{marginLeft:8},success:!0,children:[Object(M.jsx)(d.a,{style:{marginRight:4}}),"Excel"]})}),Object(M.jsxs)(k.a,{onClick:function(){var e=Object(A.g)(ye);Object(I.o)(e)},sx:{ml:1,backgroundColor:"#e95340","&:hover":{backgroundColor:"#e95340"}},children:[Object(M.jsx)(d.a,{sx:{mr:.5}}),"pdf"]})]}),Object(M.jsx)(f.a,{className:"statistic-table",style:{maxWidth:"1170px"},children:Object(M.jsx)(s.a,{components:{Container:function(t){return Object(M.jsx)(O.a,Object(a.a)(Object(a.a)({},t),{},{className:e.table,variant:"outlined"}))}},title:"",columns:fe,data:ye,options:{padding:"dense"},isLoading:ge})})]})})}}}]);
//# sourceMappingURL=19.49e345c8.chunk.js.map