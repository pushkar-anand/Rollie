let current = 0;
let intervalID;

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
	if (intervalID) {
		clearInterval(intervalID);
	}
});

const startShow = (tabs, timeout) => {
	const noOfTabs = tabs.length;
	console.log("No of Tabs", noOfTabs);
	setInterval(changeTabs, timeout * 60 * 1000, tabs, noOfTabs);
};

const changeTabs = (tabs, maxTabs) => {
	current = (current < maxTabs) ? current: 0;
	console.log("Current", current);
	const tabID = tabs[0].id;
	chrome.tabs.update(tabID, {active:true, highlighted: true});
};
