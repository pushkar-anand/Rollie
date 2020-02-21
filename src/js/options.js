$(document).ready(() => {
	storage.get(null, setSavedValues);
	M.updateTextFields();
});

$("#save-options").click( ()=> {
	const values = {};
	values[TAB_TIME_KEY] = $("#minutes").val();
	storage.set(values, () => {
		M.toast({html: 'Options Saved!!'});
	})
});


const setSavedValues = (result) => {
	const inputMinutes = $("#minutes");
	if ( result[TAB_TIME_KEY] === undefined) {
		inputMinutes.val(DEFAULT_TIME);
	} else {
		inputMinutes.val(result[TAB_TIME_KEY]);
	}
};
