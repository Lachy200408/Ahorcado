export function getRandomWord(){
	return fetch("https://random-word-api.herokuapp.com/word?lang=es&number=1")
			.then((result)=>{
				return result.text();
			})
			.catch((error)=>{
				alert("Ha ocurrido un error.");
				console.error(error);
				return '';
			});
}