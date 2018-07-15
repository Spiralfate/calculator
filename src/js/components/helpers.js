
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

export const elt = (type, ...children) => {
	let node = document.createElement(type);
    for (let child of children) {
      if (typeof child != "string") node.appendChild(child);
      else node.appendChild(document.createTextNode(child));
    }
	return node;
}

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

export const renderAction = (action, parentNode, ...classNames) => {	
	let new_action = nodeWithClasses('button', action.value, ...classNames);
	parentNode.appendChild(new_action)	
}
