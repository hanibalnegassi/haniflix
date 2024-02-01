import{i as be,k as fe,s as A,q as Ie,ab as Le,_ as b,r as c,m as pe,n as le,o as W,j as v,p as he,ac as Ne,ad as ue,g as ke,ae as ce,af as Ue}from"./index-RN40GIN3.js";import"./react-is.production.min-pGgGHoNV.js";import{a as _e,K as Ve}from"./KeyboardArrowRight--ulIzshY.js";let j;function $e(){if(j)return j;const e=document.createElement("div"),t=document.createElement("div");return t.style.width="10px",t.style.height="1px",e.appendChild(t),e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e),j="reverse",e.scrollLeft>0?j="default":(e.scrollLeft=1,e.scrollLeft===0&&(j="negative")),document.body.removeChild(e),j}function Be(e,t){const r=e.scrollLeft;if(t!=="rtl")return r;switch($e()){case"negative":return e.scrollWidth-e.clientWidth+r;case"reverse":return e.scrollWidth-e.clientWidth-r;default:return r}}function Oe(e){return fe("MuiTab",e)}const qe=be("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper"]),F=qe,Ge=["className","disabled","disableFocusRipple","fullWidth","icon","iconPosition","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"],Je=e=>{const{classes:t,textColor:r,fullWidth:i,wrapped:n,icon:d,label:f,selected:h,disabled:u}=e,m={root:["root",d&&f&&"labelIcon",`textColor${Le(r)}`,i&&"fullWidth",n&&"wrapped",h&&"selected",u&&"disabled"],iconWrapper:["iconWrapper"]};return he(m,Oe,t)},Qe=A(Ie,{name:"MuiTab",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.label&&r.icon&&t.labelIcon,t[`textColor${Le(r.textColor)}`],r.fullWidth&&t.fullWidth,r.wrapped&&t.wrapped]}})(({theme:e,ownerState:t})=>b({},e.typography.button,{maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center"},t.label&&{flexDirection:t.iconPosition==="top"||t.iconPosition==="bottom"?"column":"row"},{lineHeight:1.25},t.icon&&t.label&&{minHeight:72,paddingTop:9,paddingBottom:9,[`& > .${F.iconWrapper}`]:b({},t.iconPosition==="top"&&{marginBottom:6},t.iconPosition==="bottom"&&{marginTop:6},t.iconPosition==="start"&&{marginRight:e.spacing(1)},t.iconPosition==="end"&&{marginLeft:e.spacing(1)})},t.textColor==="inherit"&&{color:"inherit",opacity:.6,[`&.${F.selected}`]:{opacity:1},[`&.${F.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},t.textColor==="primary"&&{color:(e.vars||e).palette.text.secondary,[`&.${F.selected}`]:{color:(e.vars||e).palette.primary.main},[`&.${F.disabled}`]:{color:(e.vars||e).palette.text.disabled}},t.textColor==="secondary"&&{color:(e.vars||e).palette.text.secondary,[`&.${F.selected}`]:{color:(e.vars||e).palette.secondary.main},[`&.${F.disabled}`]:{color:(e.vars||e).palette.text.disabled}},t.fullWidth&&{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},t.wrapped&&{fontSize:e.typography.pxToRem(12)})),Ze=c.forwardRef(function(t,r){const i=pe({props:t,name:"MuiTab"}),{className:n,disabled:d=!1,disableFocusRipple:f=!1,fullWidth:h,icon:u,iconPosition:m="top",indicator:T,label:y,onChange:g,onClick:B,onFocus:G,selected:E,selectionFollowsFocus:C,textColor:J="inherit",value:z,wrapped:re=!1}=i,X=le(i,Ge),I=b({},i,{disabled:d,disableFocusRipple:f,selected:E,icon:!!u,iconPosition:m,label:!!y,fullWidth:h,textColor:J,wrapped:re}),D=Je(I),L=u&&y&&c.isValidElement(u)?c.cloneElement(u,{className:W(D.iconWrapper,u.props.className)}):u,Y=N=>{!E&&g&&g(N,z),B&&B(N)},K=N=>{C&&!E&&g&&g(N,z),G&&G(N)};return v.jsxs(Qe,b({focusRipple:!f,className:W(D.root,n),ref:r,role:"tab","aria-selected":E,disabled:d,onClick:Y,onFocus:K,ownerState:I,tabIndex:E?0:-1},X,{children:[m==="top"||m==="start"?v.jsxs(c.Fragment,{children:[L,y]}):v.jsxs(c.Fragment,{children:[y,L]}),T]}))}),Mt=Ze;function et(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}function tt(e,t,r,i={},n=()=>{}){const{ease:d=et,duration:f=300}=i;let h=null;const u=t[e];let m=!1;const T=()=>{m=!0},y=g=>{if(m){n(new Error("Animation cancelled"));return}h===null&&(h=g);const B=Math.min(1,(g-h)/f);if(t[e]=d(B)*(r-u)+u,B>=1){requestAnimationFrame(()=>{n(null)});return}requestAnimationFrame(y)};return u===r?(n(new Error("Element already at target position")),T):(requestAnimationFrame(y),T)}const ot=["onChange"],lt={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};function rt(e){const{onChange:t}=e,r=le(e,ot),i=c.useRef(),n=c.useRef(null),d=()=>{i.current=n.current.offsetHeight-n.current.clientHeight};return c.useEffect(()=>{const f=ue(()=>{const u=i.current;d(),u!==i.current&&t(i.current)}),h=Ne(n.current);return h.addEventListener("resize",f),()=>{f.clear(),h.removeEventListener("resize",f)}},[t]),c.useEffect(()=>{d(),t(i.current)},[t]),v.jsx("div",b({style:lt,ref:n},r))}function nt(e){return fe("MuiTabScrollButton",e)}const st=be("MuiTabScrollButton",["root","vertical","horizontal","disabled"]),it=st;var Me,Re;const at=["className","direction","orientation","disabled"],ct=e=>{const{classes:t,orientation:r,disabled:i}=e;return he({root:["root",r,i&&"disabled"]},nt,t)},dt=A(Ie,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.orientation&&t[r.orientation]]}})(({ownerState:e})=>b({width:40,flexShrink:0,opacity:.8,[`&.${it.disabled}`]:{opacity:0}},e.orientation==="vertical"&&{width:"100%",height:40,"& svg":{transform:`rotate(${e.isRtl?-90:90}deg)`}})),ut=c.forwardRef(function(t,r){const i=pe({props:t,name:"MuiTabScrollButton"}),{className:n,direction:d}=i,f=le(i,at),u=ke().direction==="rtl",m=b({isRtl:u},i),T=ct(m);return v.jsx(dt,b({component:"div",className:W(T.root,n),ref:r,role:null,ownerState:m,tabIndex:null},f,{children:d==="left"?Me||(Me=v.jsx(_e,{fontSize:"small"})):Re||(Re=v.jsx(Ve,{fontSize:"small"}))}))}),bt=ut;function ft(e){return fe("MuiTabs",e)}const pt=be("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]),de=pt,ht=["aria-label","aria-labelledby","action","centered","children","className","component","allowScrollButtonsMobile","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant","visibleScrollbar"],We=(e,t)=>e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:e.firstChild,Ee=(e,t)=>e===t?e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:e.lastChild,oe=(e,t,r)=>{let i=!1,n=r(e,t);for(;n;){if(n===e.firstChild){if(i)return;i=!0}const d=n.disabled||n.getAttribute("aria-disabled")==="true";if(!n.hasAttribute("tabindex")||d)n=r(e,n);else{n.focus();return}}},mt=e=>{const{vertical:t,fixed:r,hideScrollbar:i,scrollableX:n,scrollableY:d,centered:f,scrollButtonsHideMobile:h,classes:u}=e;return he({root:["root",t&&"vertical"],scroller:["scroller",r&&"fixed",i&&"hideScrollbar",n&&"scrollableX",d&&"scrollableY"],flexContainer:["flexContainer",t&&"flexContainerVertical",f&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",h&&"scrollButtonsHideMobile"],scrollableX:[n&&"scrollableX"],hideScrollbar:[i&&"hideScrollbar"]},ft,u)},vt=A("div",{name:"MuiTabs",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[{[`& .${de.scrollButtons}`]:t.scrollButtons},{[`& .${de.scrollButtons}`]:r.scrollButtonsHideMobile&&t.scrollButtonsHideMobile},t.root,r.vertical&&t.vertical]}})(({ownerState:e,theme:t})=>b({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},e.vertical&&{flexDirection:"column"},e.scrollButtonsHideMobile&&{[`& .${de.scrollButtons}`]:{[t.breakpoints.down("sm")]:{display:"none"}}})),xt=A("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.scroller,r.fixed&&t.fixed,r.hideScrollbar&&t.hideScrollbar,r.scrollableX&&t.scrollableX,r.scrollableY&&t.scrollableY]}})(({ownerState:e})=>b({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},e.fixed&&{overflowX:"hidden",width:"100%"},e.hideScrollbar&&{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},e.scrollableX&&{overflowX:"auto",overflowY:"hidden"},e.scrollableY&&{overflowY:"auto",overflowX:"hidden"})),St=A("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.flexContainer,r.vertical&&t.flexContainerVertical,r.centered&&t.centered]}})(({ownerState:e})=>b({display:"flex"},e.vertical&&{flexDirection:"column"},e.centered&&{justifyContent:"center"})),gt=A("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:(e,t)=>t.indicator})(({ownerState:e,theme:t})=>b({position:"absolute",height:2,bottom:0,width:"100%",transition:t.transitions.create()},e.indicatorColor==="primary"&&{backgroundColor:(t.vars||t).palette.primary.main},e.indicatorColor==="secondary"&&{backgroundColor:(t.vars||t).palette.secondary.main},e.vertical&&{height:"100%",width:2,right:0})),Ct=A(rt,{name:"MuiTabs",slot:"ScrollbarSize"})({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),ze={},yt=c.forwardRef(function(t,r){const i=pe({props:t,name:"MuiTabs"}),n=ke(),d=n.direction==="rtl",{"aria-label":f,"aria-labelledby":h,action:u,centered:m=!1,children:T,className:y,component:g="div",allowScrollButtonsMobile:B=!1,indicatorColor:G="primary",onChange:E,orientation:C="horizontal",ScrollButtonComponent:J=bt,scrollButtons:z="auto",selectionFollowsFocus:re,TabIndicatorProps:X={},TabScrollButtonProps:I={},textColor:D="primary",value:L,variant:Y="standard",visibleScrollbar:K=!1}=i,N=le(i,ht),M=Y==="scrollable",x=C==="vertical",U=x?"scrollTop":"scrollLeft",Q=x?"top":"left",Z=x?"bottom":"right",ne=x?"clientHeight":"clientWidth",_=x?"height":"width",V=b({},i,{component:g,allowScrollButtonsMobile:B,indicatorColor:G,orientation:C,vertical:x,scrollButtons:z,textColor:D,variant:Y,visibleScrollbar:K,fixed:!M,hideScrollbar:M&&!K,scrollableX:M&&!x,scrollableY:M&&x,centered:m&&!M,scrollButtonsHideMobile:!B}),R=mt(V),[me,Fe]=c.useState(!1),[k,ve]=c.useState(ze),[H,Ae]=c.useState({start:!1,end:!1}),[xe,He]=c.useState({overflow:"hidden",scrollbarWidth:0}),Se=new Map,w=c.useRef(null),O=c.useRef(null),ge=()=>{const o=w.current;let l;if(o){const a=o.getBoundingClientRect();l={clientWidth:o.clientWidth,scrollLeft:o.scrollLeft,scrollTop:o.scrollTop,scrollLeftNormalized:Be(o,n.direction),scrollWidth:o.scrollWidth,top:a.top,bottom:a.bottom,left:a.left,right:a.right}}let s;if(o&&L!==!1){const a=O.current.children;if(a.length>0){const p=a[Se.get(L)];s=p?p.getBoundingClientRect():null}}return{tabsMeta:l,tabMeta:s}},q=ce(()=>{const{tabsMeta:o,tabMeta:l}=ge();let s=0,a;if(x)a="top",l&&o&&(s=l.top-o.top+o.scrollTop);else if(a=d?"right":"left",l&&o){const S=d?o.scrollLeftNormalized+o.clientWidth-o.scrollWidth:o.scrollLeft;s=(d?-1:1)*(l[a]-o[a]+S)}const p={[a]:s,[_]:l?l[_]:0};if(isNaN(k[a])||isNaN(k[_]))ve(p);else{const S=Math.abs(k[a]-p[a]),P=Math.abs(k[_]-p[_]);(S>=1||P>=1)&&ve(p)}}),se=(o,{animation:l=!0}={})=>{l?tt(U,w.current,o,{duration:n.transitions.duration.standard}):w.current[U]=o},Ce=o=>{let l=w.current[U];x?l+=o:(l+=o*(d?-1:1),l*=d&&$e()==="reverse"?-1:1),se(l)},ye=()=>{const o=w.current[ne];let l=0;const s=Array.from(O.current.children);for(let a=0;a<s.length;a+=1){const p=s[a];if(l+p[ne]>o)break;l+=p[ne]}return l},Pe=()=>{Ce(-1*ye())},je=()=>{Ce(ye())},Xe=c.useCallback(o=>{He({overflow:null,scrollbarWidth:o})},[]),De=()=>{const o={};o.scrollbarSizeListener=M?v.jsx(Ct,{onChange:Xe,className:W(R.scrollableX,R.hideScrollbar)}):null;const l=H.start||H.end,s=M&&(z==="auto"&&l||z===!0);return o.scrollButtonStart=s?v.jsx(J,b({orientation:C,direction:d?"right":"left",onClick:Pe,disabled:!H.start},I,{className:W(R.scrollButtons,I.className)})):null,o.scrollButtonEnd=s?v.jsx(J,b({orientation:C,direction:d?"left":"right",onClick:je,disabled:!H.end},I,{className:W(R.scrollButtons,I.className)})):null,o},we=ce(o=>{const{tabsMeta:l,tabMeta:s}=ge();if(!(!s||!l)){if(s[Q]<l[Q]){const a=l[U]+(s[Q]-l[Q]);se(a,{animation:o})}else if(s[Z]>l[Z]){const a=l[U]+(s[Z]-l[Z]);se(a,{animation:o})}}}),$=ce(()=>{if(M&&z!==!1){const{scrollTop:o,scrollHeight:l,clientHeight:s,scrollWidth:a,clientWidth:p}=w.current;let S,P;if(x)S=o>1,P=o<l-s-1;else{const te=Be(w.current,n.direction);S=d?te<a-p-1:te>1,P=d?te>1:te<a-p-1}(S!==H.start||P!==H.end)&&Ae({start:S,end:P})}});c.useEffect(()=>{const o=ue(()=>{q(),$()}),l=Ne(w.current);l.addEventListener("resize",o);let s;return typeof ResizeObserver<"u"&&(s=new ResizeObserver(o),Array.from(O.current.children).forEach(a=>{s.observe(a)})),()=>{o.clear(),l.removeEventListener("resize",o),s&&s.disconnect()}},[q,$]);const ie=c.useMemo(()=>ue(()=>{$()}),[$]);c.useEffect(()=>()=>{ie.clear()},[ie]),c.useEffect(()=>{Fe(!0)},[]),c.useEffect(()=>{q(),$()}),c.useEffect(()=>{we(ze!==k)},[we,k]),c.useImperativeHandle(u,()=>({updateIndicator:q,updateScrollButtons:$}),[q,$]);const Te=v.jsx(gt,b({},X,{className:W(R.indicator,X.className),ownerState:V,style:b({},k,X.style)}));let ee=0;const Ye=c.Children.map(T,o=>{if(!c.isValidElement(o))return null;const l=o.props.value===void 0?ee:o.props.value;Se.set(l,ee);const s=l===L;return ee+=1,c.cloneElement(o,b({fullWidth:Y==="fullWidth",indicator:s&&!me&&Te,selected:s,selectionFollowsFocus:re,onChange:E,textColor:D,value:l},ee===1&&L===!1&&!o.props.tabIndex?{tabIndex:0}:{}))}),Ke=o=>{const l=O.current,s=Ue(l).activeElement;if(s.getAttribute("role")!=="tab")return;let p=C==="horizontal"?"ArrowLeft":"ArrowUp",S=C==="horizontal"?"ArrowRight":"ArrowDown";switch(C==="horizontal"&&d&&(p="ArrowRight",S="ArrowLeft"),o.key){case p:o.preventDefault(),oe(l,s,Ee);break;case S:o.preventDefault(),oe(l,s,We);break;case"Home":o.preventDefault(),oe(l,null,We);break;case"End":o.preventDefault(),oe(l,null,Ee);break}},ae=De();return v.jsxs(vt,b({className:W(R.root,y),ownerState:V,ref:r,as:g},N,{children:[ae.scrollButtonStart,ae.scrollbarSizeListener,v.jsxs(xt,{className:R.scroller,ownerState:V,style:{overflow:xe.overflow,[x?`margin${d?"Left":"Right"}`:"marginBottom"]:K?void 0:-xe.scrollbarWidth},ref:w,onScroll:ie,children:[v.jsx(St,{"aria-label":f,"aria-labelledby":h,"aria-orientation":C==="vertical"?"vertical":null,className:R.flexContainer,ownerState:V,onKeyDown:Ke,ref:O,role:"tablist",children:Ye}),me&&Te]}),ae.scrollButtonEnd]}))}),Rt=yt;export{Rt as T,Mt as a};