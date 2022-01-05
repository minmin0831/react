import colorNames from 'colornames'; // package.json에 추가된 dependancies에서 colorNames를 import 시켜야 colorname을 hex값으로 변환할 수 있다.  
 
const Input = ({ 
	colorValue, setColorValue, setHexValue, isDarkText, setIsDarkText 
}) => {
	return (
		<form 
			onSubmit={(e) => e.preventDefault()}
		>
			<label>Add Color Name: </label>
			<input 
				autoFocus
				type="text" 
				placeholder="Add color name"
				required
				value={ colorValue }
				onChange={(e) => {
					setColorValue(e.target.value);
					setHexValue(colorNames(e.target.value)); 
					// npm i colornames -S 터미널에 입력하면 package.json > Dependancies 에 colornames가 추가되는 것을 볼 수 있다. 
				}}
			/>
			<button
				type="button"
				onClick={() => setIsDarkText(!isDarkText)}
			>
				Toggle Text Color
			</button>
		</form>
	)
}



export default Input
