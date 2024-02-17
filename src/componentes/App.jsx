/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState , useEffect } from 'react';
import { teclado } from './constantes.mjs';
import { getRandomWord } from './getRandomWord.mjs';
import '../estilos/App.css'

let stringDeTabla = '';//? Variable que guarda el estado de la tabla

function App(){
	const [onPlay , setPlay] = useState(false);
	const [secretWord , setSecretWord] = useState();
	const [tablaLetras , setTablaLetras] = useState([]);

	function comienzoJuego(){
		setPlay(true);
	}

	function handleClick(event){//? Metodo que maneja los clicks de los botones
		const letra = event.target.innerHTML.toLowerCase();
		let arrayAux = stringDeTabla.split('');

		for(let index=0; index < secretWord.length; index++){
			if(secretWord[index] === letra){
				arrayAux[index] = '1';
			}
		}

		stringDeTabla = arrayAux.join('');
		setTablaLetras(arrayAux)
	}

	function handleRestart(){
		setPlay(false);
		setTablaLetras([]);
		getWord();
	}

	function getWord(){
		getRandomWord().then(data => {
			const word = data.slice(2 , -2).toLowerCase();
			setSecretWord(word);
		});
	}

	useEffect(getWord, []);

	useEffect(()=>{//? Inicializar la tabla
		if(secretWord && !tablaLetras.length>0){
			const length = secretWord.length;
			stringDeTabla = Array(length).fill('0').join('');
			setTablaLetras(Array(length).fill(''));
		}
	} , [secretWord]);

	return(
		<main className="ahorcado">
			<h1>Ahorcado</h1>
			{
				!onPlay &&
					<section>
						<button onClick={comienzoJuego}>Comenzar juego</button>
					</section>
			}
			{
				onPlay &&
				secretWord &&
					<section>
						<article className="mostradorWord">
							{
								tablaLetras?.map((_ , indice)=>{
									return(
										<p className='letraTabla' key={indice}>
											{stringDeTabla[indice]==='1' && secretWord[indice]}
										</p>
									);
								})
							}
						</article>
						<article className='teclado'>
							{
								teclado.map((letra , indice) => {
									return(
										<button key={indice**Math.random()} onClick={handleClick}>{letra}</button>
									);
								})
							}
							<button onClick={handleRestart}>
								<img src='../pictures/Restart_32px.png' alt='Rs'/>
							</button>
						</article>
					</section>
			}
		</main>
	);
}

export default App;