$("#startTabShow").click(() => {
	console.log("Starting show.");
	chrome.tabs.query({}, (tabs) => {
		console.log("Open Tabs", tabs);
		storage.get(null, (data) => {
			const TIMEOUT = data[TAB_TIME_KEY] || DEFAULT_TIME;
			console.log("Timeout", TIMEOUT);
			startShow(tabs, TIMEOUT);
		});

	} );
});

$("#stopTabShow").click(() => {
	const message = {
		messageType: "stop"
	};
	chrome.runtime.sendMessage(message, callback);
});

const startShow = (tabs, timeout) => {
	const message = {
		messageType: "start",
		tabs: tabs,
		timeout: timeout
	};
	chrome.runtime.sendMessage(message, callback);
};

const callback = (response) => {
	console.log(response);
};
