// Magic Mirror config.
window.config = {
  units: 'us',

  language: 'en',

  'MMM-forecast-io': {
    apiKey: '01a457e8decf58c6c551b6870a639d2d',
		latitude: '40.4341',
		longitude: '-111.7564',
		maxDaysForecast: 7,
		// TODO: See if this works on the Kindle.
		showPrecipitationGraph: false,
		// Update every other minute. (Max free API calls per day is 1,000 so 720 is close.)
		updateInterval: 60 * 2 * 1000
  }
};
