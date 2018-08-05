
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


// Request promise
export const fetchDice = () => {
    
    return new Promise((resolve, reject) => {            
        connect('localhost', '8081').then(server => {
            console.log('Sending request for dice..')
            server.send('get dice');
            server.onmessage = event => {
                if (String(event.data).match(/[0-9]/)) {
                    console.log(`Got response with a dice throw of ${event.data}`)                
                    resolve(event.data)
                }
                else reject(event.data)
            }
        })
    })
}
const connect = (url, port) => {
    return new Promise((resolve, reject) => {
        var server = new WebSocket(`ws://${url}:${port}`);
        server.onopen = function() {
            resolve(server);
        };
        server.onerror = function(err) {
            reject(err);
        };
    });
}

