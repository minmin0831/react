// CRUD features on the API data

const apiRequest = async(url ="", optionsObj = null, errMsg = null) => {
	try {
		const response = await fetch(url, optionsObj); // optionsObj가 CRUD 중 어느 것을 선택할지 결정한다. 
		if(!response.ok) throw Error("Please reload the app."); // application.state가 아직은 서버 db와 sync되지 않은 상태이기 때문에, reloading을 하여 state와 db가 sync될 수 있도록 한다. 
	} catch(err) {
		errMsg = err.message;
	} finally {

	}
}

export default apiRequest;