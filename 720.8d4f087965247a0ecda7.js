"use strict";(self.webpackChunkangular_merge=self.webpackChunkangular_merge||[]).push([[720],{4720:(C,g,r)=>{r.r(g),r.d(g,{MergeModule:()=>v});var p=r(8583),a=r(3080),d=r(8002),c=r(3190),u=r(3342),h=r(9497),m=r(9773),Z=r(9112),t=r(639),l=r(1841);function f(o,n){if(1&o&&(t.TgZ(0,"tbody"),t.TgZ(1,"tr"),t.TgZ(2,"td"),t._uU(3),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td"),t._uU(7),t.qZA(),t.qZA(),t.qZA()),2&o){const e=n.$implicit;t.xp6(3),t.Oqu(e.userId),t.xp6(2),t.Oqu(e.title),t.xp6(2),t.Oqu(e.completed)}}function T(o,n){if(1&o&&(t.TgZ(0,"table"),t.TgZ(1,"thead"),t.TgZ(2,"tr"),t.TgZ(3,"th"),t._uU(4,"User"),t.qZA(),t.TgZ(5,"th"),t._uU(6,"Title"),t.qZA(),t.TgZ(7,"th"),t._uU(8,"Completed?"),t.qZA(),t.qZA(),t.qZA(),t.YNc(9,f,8,3,"tbody",1),t.qZA()),2&o){const e=t.oxw().ngIf;t.xp6(9),t.Q6J("ngForOf",e.todos)}}function A(o,n){if(1&o&&(t.TgZ(0,"tbody"),t.TgZ(1,"tr"),t.TgZ(2,"td"),t._uU(3),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td"),t._uU(7),t.qZA(),t.qZA(),t.qZA()),2&o){const e=n.$implicit;t.xp6(3),t.Oqu(e.userId),t.xp6(2),t.Oqu(e.title),t.xp6(2),t.Oqu(e.body)}}function U(o,n){if(1&o&&(t.TgZ(0,"table"),t.TgZ(1,"thead"),t.TgZ(2,"tr"),t.TgZ(3,"th"),t._uU(4,"User"),t.qZA(),t.TgZ(5,"th"),t._uU(6,"Title"),t.qZA(),t.TgZ(7,"th"),t._uU(8,"Body"),t.qZA(),t.qZA(),t.qZA(),t.YNc(9,A,8,3,"tbody",1),t.qZA()),2&o){const e=t.oxw().ngIf;t.xp6(9),t.Q6J("ngForOf",e.posts)}}function M(o,n){if(1&o&&(t.TgZ(0,"div"),t.TgZ(1,"h2"),t._uU(2),t.qZA(),t.YNc(3,T,10,1,"table",0),t._UZ(4,"p"),t.YNc(5,U,10,1,"table",0),t.qZA()),2&o){const e=n.ngIf;t.xp6(2),t.hij("Data for: ",e.name,""),t.xp6(1),t.Q6J("ngIf",e.todos),t.xp6(2),t.Q6J("ngIf",e.posts)}}const y=[{path:"",component:(()=>{class o{constructor(e){this.http=e,this.url=" https://jsonplaceholder.typicode.com",this.userUrl="https://jsonplaceholder.typicode.com/users",this.todoUrl="https://jsonplaceholder.typicode.com/todos",this.postUrl="https://jsonplaceholder.typicode.com/posts",this.userName="Kamren",this.dataForUser2$=this.http.get("https://jsonplaceholder.typicode.com/users?username=Kamren").pipe((0,d.U)(s=>s[0]),(0,c.w)(s=>(0,Z.aj)([this.http.get(`${this.todoUrl}?userId=${s.id}`),this.http.get(`${this.postUrl}?userId=${s.id}`)]).pipe((0,d.U)(([i,x])=>({name:s.name,id:s.id,todos:i,posts:x}))))),this.dataForUser2$.subscribe(s=>console.log("User Data",s))}ngOnInit(){}getAddress(e){this.http.get(`https://jsonplaceholder.typicode.com/userId=${e}`).pipe((0,d.U)(s=>{s.filter(i=>i.id===e)}),(0,u.b)(s=>console.log("usersAdress",JSON.stringify(s))))}getMergeData(){this.http.get("https://jsonplaceholder.typicode.com/users?username=Bret").pipe((0,h.g)(600),(0,d.U)(e=>{const s=e[0];return this.userName=s.username,s}),(0,m.zg)(e=>this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${e.id}`))).subscribe(e=>{this.posts=e})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(l.eN))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-merge"]],decls:4,vars:3,consts:[[4,"ngIf"],[4,"ngFor","ngForOf"]],template:function(e,s){1&e&&(t.TgZ(0,"p"),t._uU(1,"merge works!"),t.qZA(),t.YNc(2,M,6,3,"div",0),t.ALo(3,"async")),2&e&&(t.xp6(2),t.Q6J("ngIf",t.lcZ(3,1,s.dataForUser2$)))},directives:[p.O5,p.sg],pipes:[p.Ov],styles:[""]}),o})()}];let q=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[a.Bz.forChild(y)],a.Bz]}),o})(),v=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[p.ez,l.JF,q]]}),o})()}}]);