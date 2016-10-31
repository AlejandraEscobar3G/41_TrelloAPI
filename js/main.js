var boton = document.getElementById("AgregarLista");
boton.addEventListener("click", agregarLista);

function agregarLista(){
	var pre = document.getElementById("contenedor");
	pre.removeChild(boton);
	// formulario
	var formulario = document.createElement("DIV");
	formulario.classList.add("form-group");
	
	var input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("placeholder", "Nombre de lista");
	var bton = document.createElement("button");
	var texto = document.createTextNode("Guardar");

	// APPENDCHILD
	bton.appendChild(texto);
	formulario.appendChild(input);
	formulario.appendChild(bton);
	pre.appendChild(formulario);
	input.focus();

	//Creando eventos en GUARDAR (0.0.2)

	bton.onclick = function(){
		var txt = input.value;
		
		if(txt == 0){
			alert("Ingresa una lista");
			return false;
		} else{
			var titulo = document.createTextNode(txt);

			pre.removeChild(formulario);

			var tarjeta = document.createElement("div");
			var h2 = document.createElement("h2");
			var annadir = document.createTextNode("Añadir tarjeta");
			var lista = document.createElement("button");

			lista.classList.add("btn", "mt-2");

			h2.appendChild(titulo);
			lista.appendChild(annadir);
			tarjeta.appendChild(h2);
			tarjeta.appendChild(lista);
			pre.appendChild(tarjeta);
			pre.appendChild(boton);

			lista.onclick = function(){
				tarjeta.removeChild(lista);
				var textoArea = document.createElement("textarea");
				var id = (new Date()).getTime() + "";
				textoArea.setAttribute("id", id);
				tarjeta.appendChild(textoArea);
				tarjeta.appendChild(lista);
				textoArea.focus();

				//Drag and Drop
				textoArea.setAttribute("draggable", "true");

				tarjeta.addEventListener("dragover", dragOver);

				textoArea.addEventListener("dragstart", dragInicializar);
				tarjeta.addEventListener("drop", hacerDrop);

				function dragOver(ev){
					ev.preventDefault();
				}
				function dragInicializar(ev){
					ev.dataTransfer.setData("text", ev.target.id);
				}
				function hacerDrop(ev){
					ev.preventDefault();
					var elemento = ev.dataTransfer.getData("text");
					//console.log(elemento);
					if(ev.target.nodeName == "DIV"){
						ev.target.insertBefore(document.getElementById(elemento),lista);
					} else if((ev.target.nodeName == "TEXTAREA") || (ev.target.nodeName == "BUTTON")){
						ev.target.parentNode.insertBefore(document.getElementById(elemento), lista);
					}			
				}
			}
		}
	}
}