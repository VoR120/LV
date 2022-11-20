(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{326:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var i=t.isSafari=function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)},o=t.isJsons=function(e){return Array.isArray(e)&&e.every((function(e){return"object"===("undefined"===typeof e?"undefined":a(e))&&!(e instanceof Array)}))},l=t.isArrays=function(e){return Array.isArray(e)&&e.every((function(e){return Array.isArray(e)}))},c=t.jsonsHeaders=function(e){return Array.from(e.map((function(e){return Object.keys(e)})).reduce((function(e,t){return new Set([].concat(r(e),r(t)))}),[]))},u=t.jsons2arrays=function(e,t){var n=t=t||c(e),a=t;o(t)&&(n=t.map((function(e){return e.label})),a=t.map((function(e){return e.key})));var i=e.map((function(e){return a.map((function(t){return s(t,e)}))}));return[n].concat(r(i))},s=t.getHeaderValue=function(e,t){var n=e.replace(/\[([^\]]+)]/g,".$1").split(".").reduce((function(e,t,n,a){if(void 0!==e[t])return e[t];a.splice(1)}),t);return void 0===n?e in t?t[e]:"":n},h=t.elementOrEmpty=function(e){return e||0===e?e:""},d=t.joiner=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:'"';return e.filter((function(e){return e})).map((function(e){return e.map((function(e){return h(e)})).map((function(e){return""+n+e+n})).join(t)})).join("\n")},g=t.arrays2csv=function(e,t,n,a){return d(t?[t].concat(r(e)):e,n,a)},y=t.jsons2csv=function(e,t,n,a){return d(u(e,t),n,a)},b=t.string2csv=function(e,t,n,a){return t?t.join(n)+"\n"+e:e},f=t.toCSV=function(e,t,n,a){if(o(e))return y(e,t,n,a);if(l(e))return g(e,t,n,a);if("string"===typeof e)return b(e,t,n);throw new TypeError('Data should be a "String", "Array of arrays" OR "Array of objects" ')};t.buildURI=function(e,t,n,a,r){var o=f(e,n,a,r),l=i()?"application/csv":"text/csv",c=new Blob([t?"\ufeff":"",o],{type:l}),u="data:"+l+";charset=utf-8,"+(t?"\ufeff":"")+o,s=window.URL||window.webkitURL;return"undefined"===typeof s.createObjectURL?u:s.createObjectURL(c)}},327:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PropsNotForwarded=t.defaultProps=t.propTypes=void 0;var a,r=n(0),i=((a=r)&&a.__esModule,n(11));t.propTypes={data:(0,i.oneOfType)([i.string,i.array]).isRequired,headers:i.array,target:i.string,separator:i.string,filename:i.string,uFEFF:i.bool,onClick:i.func,asyncOnClick:i.bool},t.defaultProps={separator:",",filename:"generatedBy_react-csv.csv",uFEFF:!0,asyncOnClick:!1},t.PropsNotForwarded=["data","headers"]},331:function(e,t,n){"use strict";n.d(t,"g",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return u})),n.d(t,"f",(function(){return s})),n.d(t,"i",(function(){return h})),n.d(t,"a",(function(){return d})),n.d(t,"h",(function(){return g})),n.d(t,"j",(function(){return y})),n.d(t,"k",(function(){return b}));var a=n(323),r=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"portrait";return{pageOrientation:n,content:[{columns:[{text:["\u0110\u1ea2NG B\u1ed8 \u0110\u1ea0I H\u1eccC C\u1ea6N TH\u01a0 \n","CHI B\u1ed8 KHOA CNTT&TT"],alignment:"center"},{text:[]},[{text:"\u0110\u1ea2NG C\u1ed8NG S\u1ea2N VI\u1ec6T NAM \n",alignment:"center"},{text:"Ninh Ki\u1ec1u, ng\xe0y ".concat((new Date).getDate()," th\xe1ng ").concat((new Date).getMonth()+1," n\u0103m ").concat((new Date).getFullYear()," \n"),alignment:"center"}]]},{text:"".concat(t," \n"),alignment:"center",style:"header",bold:!0,margin:[0,24,0,24]},{style:"tableExample",color:"#222",table:{headerRows:2,widths:e.widths,body:e.body}}],styles:{header:{fontSize:14,alignment:"justify"},tableExample:{margin:[0,5,0,15]},content:{margin:[0,30,0,0]},tableHeader:{bold:!0,fontSize:13,color:"black"}}}},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"DANH S\xc1CH \u0110\u1ea2NG VI\xcaN",n={widths:["auto","*","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center",rowSpan:2},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center",rowSpan:2},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center",rowSpan:2},{text:"Gi\u1edbi t\xednh",style:"tableHeader",alignment:"center",rowSpan:2},{text:"Ng\xe0y sinh",style:"tableHeader",alignment:"center",rowSpan:2},{text:"N\u01a1i sinh",style:"tableHeader",alignment:"center",rowSpan:2},{text:"Ng\xe0y v\xe0o \u0110\u1ea3ng",style:"tableHeader",alignment:"center",colSpan:2},{text:""},{text:"N\u01a1i v\xe0o \u0110\u1ea3ng",style:"tableHeader",alignment:"center",colSpan:2},{text:""},{text:"S\u1ed1 th\u1ebb",style:"tableHeader",alignment:"center",rowSpan:2},{text:"Ch\u1ee9c v\u1ee5",style:"tableHeader",alignment:"center",rowSpan:2},{text:"D\xe2n t\u1ed9c",style:"tableHeader",alignment:"center",rowSpan:2},{text:"T\xf4n gi\xe1o",style:"tableHeader",alignment:"center",rowSpan:2}],["","","","","","",{text:"L\u1ea7n \u0111\u1ea7u",style:"tableHeader"},{text:"Ch\xednh th\u1ee9c",style:"tableHeader"},{text:"L\u1ea7n \u0111\u1ea7u",style:"tableHeader"},{text:"Ch\xednh th\u1ee9c",style:"tableHeader"},"","","",""]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenGioiTinh,Object(a.j)(e.NgaySinh),e.NoiSinh,Object(a.j)(e.NgayVaoDang),Object(a.j)(e.NgayChinhThuc),e.NoiVaoDangLanDau,e.NoiVaoDangChinhThuc,e.SoThe,e.TenChucVu,e.TenDanToc,e.TenTonGiao])})),r(n,t,"landscape")},o=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"Chi b\u1ed9",style:"tableHeader",alignment:"center"},{text:"Lo\u1ea1i",style:"tableHeader",alignment:"center"},{text:"N\u0103m",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenChiBo,e.TenLoai,e.Nam])})),r(n,t)},l=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n t\u1eeb",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n \u0111\u1ebfn",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n \u0111i",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n v\u1ec1",style:"tableHeader",alignment:"center"},{text:"Ghi ch\xfa",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenHinhThuc,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenTuDangBo+", chi b\u1ed9 "+e.TenChiBoTu,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenDenDangBo+", chi b\u1ed9 "+e.TenChiBoDen,Object(a.j)(e.NgayChuyenDi),e.NgayChuyenDen?Object(a.j)(e.NgayChuyenDen):"",e.GhiChu])})),r(n,t)},c=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n t\u1eeb",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n \u0111\u1ebfn",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n \u0111\u1ebfn",style:"tableHeader",alignment:"center"},{text:"Ghi ch\xfa",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenHinhThuc,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenTuDangBo+", chi b\u1ed9 "+e.TenChiBoTu,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenDenDangBo+", chi b\u1ed9 "+e.TenChiBoDen,Object(a.j)(e.NgayChuyenDen),e.GhiChu])})),r(n,t)},u=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n t\u1eeb",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n \u0111\u1ebfn",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n",style:"tableHeader",alignment:"center"},{text:"Ghi ch\xfa",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenHinhThuc,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenTuDangBo+", chi b\u1ed9 "+e.TenChiBoTu,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenDenDangBo+", chi b\u1ed9 "+e.TenChiBoDen,Object(a.j)(e.NgayChuyenDi),e.GhiChu])})),r(n,t)},s=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"Lo\u1ea1i",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n t\u1eeb",style:"tableHeader",alignment:"center"},{text:"Chuy\u1ec3n \u0111\u1ebfn",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n \u0111i",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y chuy\u1ec3n \u0111\u1ebfn/v\u1ec1",style:"tableHeader",alignment:"center"},{text:"Ghi ch\xfa",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.LoaiHinhThuc,e.TenHinhThuc,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenTuDangBo+", chi b\u1ed9 "+e.TenChiBoTu,"\u0110\u1ea3ng b\u1ed9 "+e.ChuyenDenDangBo+", chi b\u1ed9 "+e.TenChiBoDen,e.NgayChuyenDi?Object(a.j)(e.NgayChuyenDi):"",e.NgayChuyenDen?Object(a.j)(e.NgayChuyenDen):"",e.GhiChu])})),r(n,t)},h=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"T\xean khen th\u01b0\u1edfng",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y khen th\u01b0\u1edfng",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenKhenThuong,Object(a.j)(e.NgayKhenThuong),e.HinhThuc])})),r(n,t)},d=function(e,t){var n={widths:["auto","*","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"T\xean k\u1ef7 lu\u1eadt",style:"tableHeader",alignment:"center"},{text:"Ng\xe0y k\u1ef7 lu\u1eadt",style:"tableHeader",alignment:"center"},{text:"H\xecnh th\u1ee9c",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.HoTen,e.MaSoDangVien,e.TenKyLuat,Object(a.j)(e.NgayKyLuat),e.HinhThuc])})),r(n,t)},g=function(e,t){var n={widths:["auto","auto","*","*","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"M\xe3 chi b\u1ed9",style:"tableHeader",alignment:"center"},{text:"T\xean chi b\u1ed9",style:"tableHeader",alignment:"center"},{text:"B\xed th\u01b0",style:"tableHeader",alignment:"center"},{text:"Ph\xf3 b\xed th\u01b0",style:"tableHeader",alignment:"center"},{text:"S\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){n.body.push([t+1,e.MaChiBo,e.TenChiBo,e.BiThu,e.PhoBiThu,e.SoDangVien])})),r(n,t)},y=function(e,t,n){console.log(e),console.log(t);var r=t.TenBieuQuyet,i=t.ThoiGianBatDau,o=t.ThoiGianKetThuc,l=t.UngCuVien,c=t.NguoiThamGia,u={widths:["auto","*","auto","auto","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"S\u1ed1 phi\u1ebfu t\xedn nhi\u1ec7m",style:"tableHeader",alignment:"center"},{text:"S\u1ed1 phi\u1ebfu kh\xf4ng t\xedn nhi\u1ec7m",style:"tableHeader",alignment:"center"},{text:"T\u1ec9 l\u1ec7 phi\u1ebfu t\xedn nhi\u1ec7m",style:"tableHeader",alignment:"center"},{text:"T\u1ec9 l\u1ec7 phi\u1ebfu kh\xf4ng t\xedn nhi\u1ec7m",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){u.body.push([t+1,e.HoTen,e.MaSoDangVien,e.SoPhieuTinNhiem,e.SoPhieuKhongTinNhiem,e.TiLeTinNhiem,e.TiLeKhongTinNhiem])})),{content:[{columns:[{text:["\u0110\u1ea2NG B\u1ed8 \u0110\u1ea0I H\u1eccC C\u1ea6N TH\u01a0 \n","CHI B\u1ed8 KHOA CNTT&TT"],alignment:"center",margin:[0,0,30,20]},[{text:"\u0110\u1ea2NG C\u1ed8NG S\u1ea2N VI\u1ec6T NAM \n",alignment:"center",margin:[30,0,0,0]},{text:"Ninh Ki\u1ec1u, ng\xe0y ".concat((new Date).getDate()," th\xe1ng ").concat((new Date).getMonth()+1," n\u0103m ").concat((new Date).getFullYear()," \n"),alignment:"center",italics:!0,margin:[30,0,0,0]}]]},{text:"K\u1ebeT QU\u1ea2 BI\u1ec2U QUY\u1ebeT \n",alignment:"center",style:"header",bold:!0},{text:"".concat(r," \n"),alignment:"center",bold:!0,fontSize:15,margin:[0,10,0,20]},{text:"Cu\u1ed9c bi\u1ec3u quy\u1ebft b\u1eaft \u0111\u1ea7u v\xe0o ".concat(Object(a.k)(i)," v\xe0 k\u1ebft th\xfac v\xe0o ").concat(Object(a.k)(o))},{text:"1. Th\u1ed1ng k\xea",style:"header1"},{text:["S\u1ed1 \u1ee9ng c\u1eed vi\xean: ".concat(l.length," \n"),"S\u1ed1 ng\u01b0\u1eddi tham gia bi\u1ec3u quy\u1ebft: ".concat(c.length," \n"),"S\u1ed1 ng\u01b0\u1eddi kh\xf4ng bi\u1ec3u quy\u1ebft: ".concat(n," \n "),"T\u1ec9 l\u1ec7 ng\u01b0\u1eddi tham gia bi\u1ec3u quy\u1ebft: ".concat(+((c.length-n)/c.length*100).toFixed(2),"%")]},{text:"2. K\u1ebft qu\u1ea3",style:"header1"},{text:"(K\u1ebft qu\u1ea3 \u0111\u01b0\u1ee3c s\u0103p x\u1ebfp theo s\u1ed1 l\u01b0\u1ee3ng phi\u1ebfu b\u1ea7u)."},{style:"tableExample",color:"#222",table:{headerRows:2,widths:u.widths,body:u.body}}],styles:{header:{fontSize:16,alignment:"justify"},tableExample:{margin:[0,5,0,15]},content:{margin:[0,30,0,0]},tableHeader:{bold:!0,fontSize:13,color:"black"},header1:{margin:[0,10,0,0],bold:!0}},defaultStyle:{fontSize:13,lineHeight:1.3}}},b=function(e,t,n){console.log(e),console.log(t);var r=t.TenBieuQuyet,i=t.ThoiGianBatDau,o=t.ThoiGianKetThuc,l=t.UngCuVien,c=t.NguoiThamGia,u={widths:["auto","*","auto","auto","auto"],body:[[{text:"STT",style:"tableHeader",alignment:"center"},{text:"H\u1ecd t\xean",style:"tableHeader",alignment:"center"},{text:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",style:"tableHeader",alignment:"center"},{text:"S\u1ed1 phi\u1ebfu",style:"tableHeader",alignment:"center"},{text:"T\u1ec9 l\u1ec7 phi\u1ebfu",style:"tableHeader",alignment:"center"}]]};return e.map((function(e,t){u.body.push([t+1,e.HoTen,e.MaSoDangVien,e.SoPhieu,e.TiLe])})),{content:[{columns:[{text:["\u0110\u1ea2NG B\u1ed8 \u0110\u1ea0I H\u1eccC C\u1ea6N TH\u01a0 \n","CHI B\u1ed8 KHOA CNTT&TT"],alignment:"center",margin:[0,0,30,20]},[{text:"\u0110\u1ea2NG C\u1ed8NG S\u1ea2N VI\u1ec6T NAM \n",alignment:"center",margin:[30,0,0,0]},{text:"Ninh Ki\u1ec1u, ng\xe0y ".concat((new Date).getDate()," th\xe1ng ").concat((new Date).getMonth()+1," n\u0103m ").concat((new Date).getFullYear()," \n"),alignment:"center",italics:!0,margin:[30,0,0,0]}]]},{text:"K\u1ebeT QU\u1ea2 BI\u1ec2U QUY\u1ebeT \n",alignment:"center",style:"header",bold:!0},{text:"".concat(r," \n"),alignment:"center",bold:!0,fontSize:15,margin:[0,10,0,20]},{text:"Cu\u1ed9c bi\u1ec3u quy\u1ebft b\u1eaft \u0111\u1ea7u v\xe0o ".concat(Object(a.k)(i)," v\xe0 k\u1ebft th\xfac v\xe0o ").concat(Object(a.k)(o))},{text:"1. Th\u1ed1ng k\xea",style:"header1"},{text:["S\u1ed1 \u1ee9ng c\u1eed vi\xean: ".concat(l.length," \n"),"S\u1ed1 ng\u01b0\u1eddi tham gia bi\u1ec3u quy\u1ebft: ".concat(c.length," \n"),"S\u1ed1 ng\u01b0\u1eddi kh\xf4ng bi\u1ec3u quy\u1ebft: ".concat(n," \n "),"T\u1ec9 l\u1ec7 ng\u01b0\u1eddi tham gia bi\u1ec3u quy\u1ebft: ".concat((c.length-n)/c.length*100,"%")]},{text:"2. K\u1ebft qu\u1ea3",style:"header1"},{text:"(K\u1ebft qu\u1ea3 \u0111\u01b0\u1ee3c s\u0103p x\u1ebfp theo s\u1ed1 l\u01b0\u1ee3ng phi\u1ebfu b\u1ea7u)."},{style:"tableExample",color:"#222",table:{headerRows:2,widths:u.widths,body:u.body}}],styles:{header:{fontSize:16,alignment:"justify"},tableExample:{margin:[0,5,0,15]},content:{margin:[0,30,0,0]},tableHeader:{bold:!0,fontSize:13,color:"black"},header1:{margin:[0,10,0,0],bold:!0}},defaultStyle:{fontSize:13,lineHeight:1.3}}}},334:function(e,t,n){"use strict";var a=n(187);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(188)),i=n(1),o=(0,r.default)((0,i.jsx)("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"}),"FileDownload");t.default=o},335:function(e,t,n){e.exports=n(337)},337:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CSVLink=t.CSVDownload=void 0;var a=i(n(338)),r=i(n(339));function i(e){return e&&e.__esModule?e:{default:e}}t.CSVDownload=a.default,t.CSVLink=r.default},338:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(0),o=(a=i)&&a.__esModule?a:{default:a},l=n(326),c=n(327);var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"buildURI",value:function(){return l.buildURI.apply(void 0,arguments)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.data,n=e.headers,a=e.separator,r=e.enclosingCharacter,i=e.uFEFF,o=e.target,l=e.specs,c=e.replace;this.state.page=window.open(this.buildURI(t,i,n,a,r),o,l,c)}},{key:"getWindow",value:function(){return this.state.page}},{key:"render",value:function(){return null}}]),t}(o.default.Component);u.defaultProps=Object.assign(c.defaultProps,{target:"_blank"}),u.propTypes=c.propTypes,t.default=u},339:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(0),l=(a=o)&&a.__esModule?a:{default:a},c=n(326),u=n(327);var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.buildURI=n.buildURI.bind(n),n.state={href:""},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.data,n=e.headers,a=e.separator,r=e.uFEFF,i=e.enclosingCharacter;this.setState({href:this.buildURI(t,r,n,a,i)})}},{key:"componentDidUpdate",value:function(e){if(this.props!==e){var t=this.props,n=t.data,a=t.headers,r=t.separator,i=t.uFEFF;this.setState({href:this.buildURI(n,i,a,r)})}}},{key:"buildURI",value:function(){return c.buildURI.apply(void 0,arguments)}},{key:"handleLegacy",value:function(e){if(window.navigator.msSaveOrOpenBlob){e.preventDefault();var t=this.props,n=t.data,a=t.headers,r=t.separator,i=t.filename,o=t.enclosingCharacter,l=t.uFEFF,u=new Blob([l?"\ufeff":"",(0,c.toCSV)(n,a,r,o)]);return window.navigator.msSaveBlob(u,i),!1}}},{key:"handleAsyncClick",value:function(e){var t=this;this.props.onClick(e,(function(n){!1!==n?t.handleLegacy(e):e.preventDefault()}))}},{key:"handleSyncClick",value:function(e){!1===this.props.onClick(e)?e.preventDefault():this.handleLegacy(e)}},{key:"handleClick",value:function(){var e=this;return function(t){if("function"===typeof e.props.onClick)return e.props.asyncOnClick?e.handleAsyncClick(t):e.handleSyncClick(t);e.handleLegacy(t)}}},{key:"render",value:function(){var e=this,t=this.props,n=(t.data,t.headers,t.separator,t.filename),a=(t.uFEFF,t.children),i=(t.onClick,t.asyncOnClick,t.enclosingCharacter,function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(t,["data","headers","separator","filename","uFEFF","children","onClick","asyncOnClick","enclosingCharacter"]));return l.default.createElement("a",r({download:n},i,{ref:function(t){return e.link=t},target:"_self",href:this.state.href,onClick:this.handleClick()}),a)}}]),t}(l.default.Component);s.defaultProps=u.defaultProps,s.propTypes=u.propTypes,t.default=s},820:function(e,t,n){"use strict";var a=n(187);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(188)),i=n(1),o=(0,r.default)((0,i.jsx)("path",{d:"M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"}),"FileUpload");t.default=o},860:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n(17),i=n.n(r),o=n(24),l=n(10),c=n(336),u=n.n(c),s=n(334),h=n.n(s),d=n(820),g=n.n(d),y=n(173),b=n(175),f=n(593),p=n(661),m=n(610),x=n(186),T=n(0),H=n(335),v=n(488),j=n(443),O=n(332),C=n(322),S=n(340),w=n(74),N=n(102),k=n.p+"static/media/KhenThuong.eb4a4534.xlsx",D=n.p+"static/media/KyLuat.dd45235f.xlsx",M=n(331),K=n(323),B=n(1),_=Object(x.a)((function(e){return{header:{marginBottom:"40px"},headerContent:{textTransform:"uppercase",fontWeight:"600"},table:{width:"100%",backgroundColor:"white",marginTop:"18px"},paper:{display:"flex",alignItems:"center",flexWrap:"wrap",padding:"16px",marginBottom:"16px"}}}));t.default=function(){var e=_(),t=Object(T.useContext)(N.a).openSnackbarDispatch,n=Object(T.useContext)(w.a).info,r=1==n.info.Quyen[12],c=Object(T.useState)("Khen th\u01b0\u1edfng"),s=Object(l.a)(c,2),d=s[0],x=s[1],E=Object(T.useState)("all"),F=Object(l.a)(E,2),L=(F[0],F[1]),P=Object(T.useState)(!1),V=Object(l.a)(P,2),G=V[0],A=V[1],I=Object(T.useState)(null),U=Object(l.a)(I,2),R=U[0],z=U[1],q=Object(T.useState)([]),Q=Object(l.a)(q,2),W=Q[0],Y=Q[1],J={"Khen th\u01b0\u1edfng":[{title:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",field:"MaSoDangVien",maxWidth:150},{title:"H\u1ecd t\xean",field:"HoTen"},{title:"Email",field:"Email"},{title:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",field:"SoDienThoai"},{title:"T\xean khen th\u01b0\u1edfng",field:"TenKhenThuong"},{title:"Ng\xe0y khen th\u01b0\u1edfng",field:"NgayKhenThuong",type:"date"},{title:"H\xecnh th\u1ee9c",field:"HinhThuc"},{title:"Ch\u1ee9c n\u0103ng",field:"action",sorting:!1,render:function(e){return Object(B.jsx)(j.a,{content:"B\u1ea1n ch\u1eafn ch\u1eafn mu\u1ed1n x\xf3a?",handleSubmit:function(t){return ae(t,e.MaKhenThuong)},btn:!0})}}],"K\u1ef7 lu\u1eadt":[{title:"M\xe3 s\u1ed1 \u0110\u1ea3ng vi\xean",field:"MaSoDangVien",maxWidth:150},{title:"H\u1ecd t\xean",field:"HoTen"},{title:"Email",field:"Email"},{title:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",field:"SoDienThoai"},{title:"T\xean k\u1ef7 lu\u1eadt",field:"TenKyLuat"},{title:"Ng\xe0y k\u1ef7 lu\u1eadt",field:"NgayKyLuat",type:"date"},{title:"H\xecnh th\u1ee9c",field:"HinhThuc"},{title:"Ch\u1ee9c n\u0103ng",field:"action",sorting:!1,render:function(e){return Object(B.jsx)(j.a,{content:"B\u1ea1n ch\u1eafn ch\u1eafn mu\u1ed1n x\xf3a?",handleSubmit:function(t){return ae(t,e.MaKyLuat)},btn:!0})}}]},X=Object(T.useState)(J["Khen th\u01b0\u1edfng"]),$=Object(l.a)(X,2),Z=$[0],ee=$[1],te=Object(K.g)(W,Z),ne=function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(A(!0),!r){e.next=7;break}return e.next=4,Object(v.c)({Loai:"Khen th\u01b0\u1edfng"==d?"reward":"discipline"});case 4:e.t0=e.sent,e.next=10;break;case 7:return e.next=9,Object(v.c)({Loai:"Khen th\u01b0\u1edfng"==d?"reward":"discipline",MaChiBo:n.info.MaChiBo});case 9:e.t0=e.sent;case 10:t=e.t0,Y(t),A(!1);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ae=function(){var e=Object(o.a)(i.a.mark((function e(n,a){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A(!0),e.next=3,Object(v.e)({type:"Khen th\u01b0\u1edfng"==d?"reward":"discipline",id:a});case 3:(r=e.sent).error?t({type:"SET_OPEN",payload:{msg:r.error.msg,type:"error"}}):(t({type:"SET_OPEN",payload:{msg:r.msg,type:"success"}}),Y("Khen th\u01b0\u1edfng"==d?W.filter((function(e){return e.MaKhenThuong!=a})):W.filter((function(e){return e.MaKyLuat!=a})))),A(!1);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),re=function(){var e=Object(o.a)(i.a.mark((function e(){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(v.d)({file:R,type:"Khen th\u01b0\u1edfng"==d?"reward":"discipline"});case 2:n=e.sent,console.log(n),n.error?t({type:"SET_OPEN",payload:{msg:n.error.msg,type:"error"}}):(t({type:"SET_OPEN",payload:{msg:n.msg,type:"success"}}),z(""),ne());case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(T.useEffect)((function(){ee(J[d])}),[W]),Object(T.useEffect)((function(){A(!0),ne()}),[]),Object(B.jsx)(B.Fragment,{children:Object(B.jsxs)(O.a,{sidebar:!0,children:[Object(B.jsx)("div",{className:e.header,children:Object(B.jsx)(y.a,{className:e.headerContent,variant:"h5",children:"Danh s\xe1ch Khen th\u01b0\u1edfng - K\u1ef7 lu\u1eadt \u0110\u1ea3ng vi\xean"})}),Object(B.jsx)(b.a,{variant:"outlined",className:e.paper,children:Object(B.jsxs)(S.a,{onChange:function(e){L("all"),x(e.target.value)},nameTitle:"Lo\u1ea1i",value:d,autowidth:!0,children:[Object(B.jsx)(f.a,{value:"Khen th\u01b0\u1edfng",children:"Khen th\u01b0\u1edfng"}),Object(B.jsx)(f.a,{value:"K\u1ef7 lu\u1eadt",children:"K\u1ef7 lu\u1eadt"})]})}),Object(B.jsx)(C.a,{onClick:function(){ne()},primary:!0,children:"Xem"}),te.data.length>0&&Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(H.CSVLink,{data:te.data,headers:te.headers,filename:"export.csv",children:Object(B.jsxs)(C.a,{sx:{ml:1},success:!0,children:[Object(B.jsx)(h.a,{sx:{mr:.5}}),"Excel"]})}),Object(B.jsxs)(C.a,{onClick:function(){var e="Khen th\u01b0\u1edfng"==d?Object(M.i)(W,"DANH S\xc1CH KHEN TH\u01af\u1edeNG \u0110\u1ea2NG VI\xcaN"):Object(M.a)(W,"DANH S\xc1CH K\u1ef6 LU\u1eacT \u0110\u1ea2NG VI\xcaN");Object(K.o)(e)},sx:{ml:1,backgroundColor:"#e95340","&:hover":{backgroundColor:"#e95340"}},children:[Object(B.jsx)(h.a,{sx:{mr:.5}}),"pdf"]})]}),Object(B.jsx)("input",{onChange:function(e){var t,n=e.target.files;console.log(n[0]),(null===(t=e.target)||void 0===t?void 0:t.files)&&z(e.target.files[0])},style:{display:"none"},id:"upload-photo",name:"upload-photo",type:"file"}),Object(B.jsx)(p.a,{sx:{ml:2},icon:Object(B.jsx)(h.a,{}),download:!0,component:"a",href:"Khen th\u01b0\u1edfng"==d?k:D,clickable:!0,label:"File m\u1eabu"}),Object(B.jsxs)("label",{htmlFor:"upload-photo",children:[Object(B.jsxs)(C.a,{sx:{ml:1},success:!0,component:"span",children:[Object(B.jsx)(g.a,{sx:{mr:.5}}),"Import"]}),R&&Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(y.a,{sx:{p:"8px 16px",textDecoration:"underline"},component:"span",children:R.name}),Object(B.jsx)(C.a,{onClick:re,children:"L\u01b0u"})]})]}),Object(B.jsx)(m.a,{className:"reward-discipline-table",style:{maxWidth:"1170px"},children:Object(B.jsx)(u.a,{components:{Container:function(t){return Object(B.jsx)(b.a,Object(a.a)(Object(a.a)({},t),{},{className:e.table,variant:"outlined"}))}},title:"Khen th\u01b0\u1edfng - K\u1ef7 lu\u1eadt",columns:Z,data:W,options:{padding:"dense"},isLoading:G})})]})})}}}]);
//# sourceMappingURL=11.694520b9.chunk.js.map