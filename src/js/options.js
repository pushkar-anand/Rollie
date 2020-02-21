$(document).ready(() => {
	storage.get(null, setSavedValues);
	M.updateTextFields();
});

$("#save-options").click( ()=> {
	const values = {};
	values[TAB_TIME_KEY] = $("#minutes").val();
	values[FULL_SCREEN_KEY] = $("#full-screen").prop("checked");
	storage.set(values, () => {
		M.toast({html: 'Options Saved!!'});
	})
});


const setSavedValues = (result) => {
	const inputMinutes = $("#minutes");
	const fullScreenSwitch = $("#full-screen");

	if ( result[TAB_TIME_KEY] === undefined) {
		inputMinutes.val(DEFAULT_TIME);
	} else {
		inputMinutes.val(result[TAB_TIME_KEY]);
	}

	if (result[FULL_SCREEN_KEY] === undefined) {
		fullScreenSwitch.prop("checked", DEFAULT_FULL_SCREEN);
	} else {
		fullScreenSwitch.prop("checked", result[FULL_SCREEN_KEY]);
	}
};
