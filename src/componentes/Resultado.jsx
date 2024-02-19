export function Resultado({winner}){
	return (
		<article className='resultado'>
			<h3>Terminó</h3>
			{
				(winner)? <h3>Has ganado</h3> : <h3>Has perdido</h3>
			}
		</article>
	)
}