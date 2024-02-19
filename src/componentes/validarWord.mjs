export function validarWord(word){
	let palabra = word;
	const signos = ['\\' , '|' , '@' , '#' , '~' , '€' , '¬' , 'ª' ,'º','!','"','\'','·','$','%','&','/','(',')','=','?','¿','¡','+','*','[',']','{','}','-','_','.',':',',',';'];
	
	signos.forEach((value)=>{
		while(palabra.includes(value)){
			palabra = palabra.replace(value , '');
		}
	});

	if(palabra.includes(' ')){
		palabra = palabra.slice(0 , palabra.indexOf(' '));
	}

	return palabra;
}