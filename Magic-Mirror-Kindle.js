'use strict';


window.Log = console;

window._modules = [];


window.Module = {

	register: function (id, module) {
		_modules.push([id, module]);
	},

	initModule: function (id, module) {
		var container = document.getElementById('mm-container');

		// TODO: Merge defaults to make full config
		var config = _.defaults(Module.getModuleConfig(id), module.defaults);

		console.log('module config', id, config);

		var context = module;
		context.name = config.name || id;
		context.config = config;
		context.updateDom = function () {
			Module.updateDom(container, id, module, context);
		};
		context.translate = function (key) {
			module.getTranslations.apply(context)[key] || key;
		};

		// Get scripts
		_.each(module.getScripts.call(context), function (script) {
			console.log('load script', script);
			var s = document.createElement('script');
			s.setAttribute('src', script);
			s.setAttribute('type', 'text/javascript');
			document.body.appendChild(s);
		});

		// Get styles
		_.each(module.getStyles.call(context), function (style) {
			if (style === 'weather-icons.css') return;
			container.insertAdjacentHTML('beforeEnd', '<link href="' + style + '" rel="stylesheet">');
		});

		// Get Dom
		Module.updateDom(container, id, module, context);

		// TODO: Call notificationRecieved with DOM_OBJECTS_CREATED

		// Start
		// TODO: Should start be called first?
		setTimeout(function () {
			try {
				module.start.call(context);
			}
			catch (err) {
				console.log('module start uncaught error', id);
				console.error(err);
			}
		});
	},

	updateDom: function (container, id, module, context) {
		if (context._element) container.removeChild(context._element);
		try {
			context._element = module.getDom.call(context);
		}
		catch (err) {
			console.log('module updateDom uncaught error', id);
			console.error(err);
		}
		context._element.classList.add(id);
		container.appendChild(context._element);
	},

	init: function () {
		_.each(_modules, function (module) {
			Module.initModule.apply(this, module);
		});
		console.log('init success');
	},


	getModuleConfig: function (id) {
		return window.config[id] || {};
	}
};


document.addEventListener("DOMContentLoaded", Module.init);
