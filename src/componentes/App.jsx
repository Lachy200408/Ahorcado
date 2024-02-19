/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState , useEffect } from 'react';
import { Resultado } from './Resultado.jsx';
import { teclado } from './constantes.mjs';
import { getRandomWord } from './getRandomWord.mjs';
import { validarWord } from './validarWord.mjs';
import '../estilos/App.css'

let stringDeTabla = '',	//? Variable que guarda el estado de la tabla
    isEnd = false,		//? Variable que dice si ha terminado el juego
	winner = false;		//? Variable que dice si hay ganador

function App(){
	const [onPlay , setPlay] = useState(false);
	const [secretWord , setSecretWord] = useState();
	const [tablaLetras , setTablaLetras] = useState([]);
	const [fallos , setFallos] = useState([]);

	function comienzoJuego(){
		setPlay(true);
	}

	function handleClick(event){//? Metodo que maneja los clicks de los botones
		if(isEnd) return;

		const letra = event.target.innerHTML.toLowerCase();
		let arrayAux = stringDeTabla.split('');

		for(let index=0; index < secretWord.length; index++){
			if(secretWord[index] === letra){
				arrayAux[index] = '1';
			}
		}

		if(stringDeTabla === arrayAux.join('')) setFallos([...fallos , 1]);


		stringDeTabla = arrayAux.join('');
		setTablaLetras(arrayAux);
		
		//? Terminar juego
		isEnd = (!stringDeTabla.includes('0') || fallos.length>=4)? true : false;
		winner = (isEnd && fallos.length<4)? true : false;
	}

	function handleRestart(){
		stringDeTabla = '';
		isEnd = false;
		winner = false;
		
		setPlay(false);
		setFallos([]);
		setTablaLetras([]);
		getWord();
	}

	function getWord(){
		getRandomWord().then(data => {
			let word = data.slice(2 , -2).toLowerCase();
			word = validarWord(word);
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
						<button id='botonInicio' onClick={comienzoJuego}>Comenzar juego</button>
					</section>
			}
			{
				onPlay &&
				secretWord &&
					<section>
						{
							isEnd &&
								<Resultado winner={winner} />
						}
						{
							fallos.length>0 &&
								<p id='fallos'>
									{
										fallos?.map((_ , indice)=>{
											return '×';
										})
									}
								</p>
						}
						<article className="mostradorWord">
							{
								(!tablaLetras.length>0)?
									<h3>Obteniendo palabra</h3>
								:
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
							<button onClick={handleRestart}/>
						</article>
					</section>
			}
		</main>
	);
}

export default App;