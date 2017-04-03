// Magic Mirror config.
window.config = {
  units: 'us',

  language: 'en',

  'MMM-forecast-io': {
    apiKey: '695c00bfa61f719cbe6e0a23821e2251',
		latitude: '40.4341',
		longitude: '-111.7564',
		maxDaysForecast: 7,
		// TODO: See if this works on the Kindle.
		showPrecipitationGraph: false,
		// Update every other minute. (Max free API calls per day is 1,000 so 720 is close.)
		updateInterval: 60 * 2 * 1000
  }/*,

  'MMM-plex': {
		playerId: 'dd5b56780c1ef764df731e4f6c214946',
		apiBase: 'http://server.local:1880/plex'
  }
	*/
};
