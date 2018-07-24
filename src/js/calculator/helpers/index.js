
// Eliminates every dot of a string except for the first one
export const dotTerminator = string => {
	let count = 0;
	return string.replace(/\./g, match => {
		count++;
		return count === 1 ? '.' : ''		
	})
}

// Toggles theme classes depending on a tumbler condition
export const toggleTheme = checked => {
	const wrapper = document.getElementsByClassName('wrapper')[0],		
		theme_title = document.getElementsByClassName('theme-title')[0];
		
	if (checked) {		
		wrapper.classList.add("theme-dark");
		theme_title.innerHTML = 'theme: dark'
	}
	else {
		wrapper.classList.remove("theme-dark");	
		theme_title.innerHTML = 'theme: light';
	}
}

// Helper function for declaring a DOM branch
export const elt = (type, ...children) => {
	let node = document.createElement(type);
    for (let child of children) {
      if (typeof child != "string") node.appendChild(child);
      else node.appendChild(document.createTextNode(child));
    }
	return node;
}

// Helper function for declaring DOM node with a HTML content and a optional number of classes
export const nodeWithClasses = (node, text, ...classNames) => {
	if (typeof node == 'string') {
		node = document.createElement(node);
		node.innerHTML = String(text).trim();
	}
	classNames.forEach(className => {
		node.classList.add(className)
	})
	return node;
}

//  Helper function for appending child nodes
export const renderAction = (action, parentNode, ...classNames) => {	
	let new_action = nodeWithClasses('button', action.value, ...classNames);
	parentNode.appendChild(new_action)	
}
