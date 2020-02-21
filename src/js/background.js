let current = 0;
let intervalID;

const messageReceived = (message, sender, callback) => {
	console.log("Message received", message);
	if (message.messageType === "start") {

		const tabs = message.tabs;
		const noOfTabs = message.tabs.length;
		const millis = message.timeout * 60 * 1000;
		current = getCurrent(tabs);

		intervalID = setInterval(changeTabs, millis, tabs, noOfTabs);
		callback({message: "Started", intervalID: intervalID});

	} else if(message.messageType === "stop") {
		clearInterval(intervalID);
		current = 0;
		callback({message: "Stopped", intervalID: intervalID});
	}
};

const changeTabs = (tabs, maxTabs) => {
	current = (current < maxTabs) ? current : 0;
	const tabID = tabs[current].id;
	chrome.tabs.update(tabID, {active:true, highlighted: true});
	current++;
};

const getCurrent = (tabs) => {
	for(let i = 0; i<tabs.length; i++) {
		if (tabs[i].active === true) {
			return i;
		}
	}
	return 0;
};

chrome.runtime.onMessage.addListener(messageReceived);
