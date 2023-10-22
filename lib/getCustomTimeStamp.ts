const getCustomTimeStamp = () => {
	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const date = new Date();
	const day = daysOfWeek[date.getDay()];
	const currentDate = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	return `${day} ${currentDate} ${month} ${year}`;
};

export default getCustomTimeStamp;
