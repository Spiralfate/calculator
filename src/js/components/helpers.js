





export const dotTerminator = string => {
	let count = 0;
	return string.replace(/\./g, match => {
		count++;
		return count === 1 ? '.' : ''
		
	})
}




export const toggleTheme = checked => {
	const wrapper = document.getElementsByClassName('wrapper')[0]
	if (checked) {		
		wrapper.classList.add("theme-dark");
	}
	else {
		wrapper.classList.remove("theme-dark");	
	}
}
