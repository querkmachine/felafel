import{GenerateGuid}from"../helpers/strings.js";class FileDragAndDrop{constructor(e){this.$module=e,this.$input=e.querySelector('input[type="file"]'),this.$icons=e.querySelector(".fs-file-drag-and-drop__icons"),this.$label=e.querySelector(".fs-file-drag-and-drop__label"),this.iconsDefaultHTML=this.$icons.innerHTML,this.labelDefaultHTML=this.$label.innerHTML,this.id=`DragAndDrop-${GenerateGuid()}`,this.create()}create(){this.$label.setAttribute("id",this.id),this.$label.setAttribute("aria-live","polite"),this.$input.setAttribute("aria-describedby",this.$input.getAttribute("aria-describedby")?this.$input.getAttribute("aria-describedby")+" "+this.id:this.id),this.$input.bindDragOver=this.onDragOver.bind(this),this.$input.bindDragOut=this.onDragOut.bind(this),this.$input.bindChange=this.onChange.bind(this),this.$input.addEventListener("dragenter",this.$input.bindDragOver,!0),this.$input.addEventListener("dragover",this.$input.bindDragOver,!0),this.$input.addEventListener("dragleave",this.$input.bindDragOut,!0),this.$input.addEventListener("drop",this.$input.bindDragOut,!0),this.$input.addEventListener("change",this.$input.bindChange,!0)}onChange(e){this.handleFiles(e.target.files)}onDragOver(){this.$module.classList.add("fs-file-drag-and-drop--highlight")}onDragOut(){this.$module.classList.remove("fs-file-drag-and-drop--highlight")}handleFiles(i){if(this.resetFilePreview(),i.length){let e=[];this.$icons.innerHTML="",[...i].forEach(t=>{if(e.push(t.name),["image/gif","image/jpeg","image/png"].includes(t.type)){let e=new FileReader;e.onload=e=>{let i=document.createElement("img");i.setAttribute("alt",t.name),i.classList.add("fs-file-drag-and-drop__icon"),i.src=e.target.result,this.$icons.appendChild(i)},e.readAsDataURL(t)}}),1===e.length?this.$label.innerHTML=`Selected file: <strong>${e[0]}</strong>.`:this.$label.innerHTML=`Selected <strong>${e.length} files</strong>.`}}resetFilePreview(){this.$icons.innerHTML=this.iconsDefaultHTML,this.$label.innerHTML=this.labelDefaultHTML}}export default FileDragAndDrop;
//# sourceMappingURL=file-drag-and-drop.js.map