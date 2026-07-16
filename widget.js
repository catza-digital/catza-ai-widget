/* ==============================================
CATZA AI Widget v2.1
============================================== */

(function(){

class CATZAWidget{

constructor(){

this.config=null;
this.button=null;
this.window=null;

}

async init(){

await this.loadConfig();
this.createButton();
this.createWindow();

}

async loadConfig(){

const response=await fetch("catza.config.json");
this.config=await response.json();

}

createButton(){

const color=this.config.widget.color || "#2563eb";

this.button=document.createElement("button");
this.button.id="catza-button";
this.button.innerHTML="💬";

Object.assign(this.button.style,{
position:"fixed",
right:"20px",
bottom:"20px",
width:"65px",
height:"65px",
borderRadius:"50%",
border:"none",
background:color,
color:"white",
fontSize:"28px",
cursor:"pointer",
boxShadow:"0 10px 25px rgba(0,0,0,.25)",
zIndex:"999999"
});

this.button.onclick=()=>this.toggleWindow();

document.body.appendChild(this.button);

}

createWindow(){

this.window=document.createElement("div");
this.window.id="catza-window";

Object.assign(this.window.style,{
position:"fixed",
right:"20px",
bottom:"95px",
width:"340px",
height:"460px",
background:"white",
borderRadius:"18px",
boxShadow:"0 15px 40px rgba(0,0,0,.2)",
display:"none",
flexDirection:"column",
overflow:"hidden",
zIndex:"999998"
});

this.window.innerHTML=`
<div style="background:${this.config.widget.color};color:white;padding:16px;font-weight:bold;">
${this.config.widget.avatar} ${this.config.widget.nombre}
</div>

<div style="flex:1;padding:16px;background:#f8fafc;">
<div style="background:white;padding:12px;border-radius:12px;line-height:1.5;box-shadow:0 2px 8px rgba(0,0,0,.05);">
<strong>${this.config.widget.saludo}</strong><br><br>
${this.config.widget.mensaje}
</div>
</div>

<div style="border-top:1px solid #e5e7eb;padding:10px;display:flex;gap:8px;">
<input type="text" placeholder="${this.config.widget.placeholder}" style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:10px;outline:none;">
<button style="background:${this.config.widget.color};color:white;border:none;padding:0 14px;border-radius:10px;cursor:pointer;">➤</button>
</div>
`;

document.body.appendChild(this.window);

}

toggleWindow(){

this.window.style.display=
this.window.style.display==="flex"
? "none"
: "flex";

}

}

window.CATZA={

init(){

new CATZAWidget().init();

}

};

})();
