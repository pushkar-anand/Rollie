$("#startTabShow").click(() => {
	console.log("Starting show.");
	chrome.tabs.query({}, (tabs) => {
		console.log("Open Tabs", tabs);
		storage.get(null, (data) => {
			const TIMEOUT = data[TAB_TIME_KEY] || DEFAULT_TIME;
			const FULL_SCREEN = data[FULL_SCREEN_KEY] || DEFAULT_FULL_SCREEN;
			console.log("Saved Data", data);
			startShow(tabs, TIMEOUT, FULL_SCREEN);
		});

	} );
});

$("#stopTabShow").click(() => {
	const message = {
		messageType: "stop"
	};
	chrome.runtime.sendMessage(message, callback);
});

const startShow = (tabs, timeout, fullscreen) => {
	chrome.windows.getCurrent({}, (window) => {
		const message = {
			messageType: "start",
			tabs: tabs,
			timeout: timeout,
			windowID: window.id,
			fullscreen: fullscreen
		};
		chrome.runtime.sendMessage(message, callback);
	});
};

const callback = (response) => {
	console.log(response);
	window.close();
};
