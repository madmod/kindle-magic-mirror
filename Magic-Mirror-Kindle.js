

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
		for (var script of module.getScripts.call(context)) {
			var s = document.createElement( 'script' );
			s.setAttribute( 'src', script );
			document.body.appendChild( s );
		}

		// Get styles
		for (var style of module.getStyles.call(context)) {
			container.insertAdjacentHTML('beforeEnd', '<link href="' + style + '" rel="stylesheet">');
		}

		// Get Dom
		Module.updateDom(container, id, module, context);

		// TODO: Call notificationRecieved with DOM_OBJECTS_CREATED

		// Start
		// TODO: Should start be called first?
		module.start.call(context);
	},

	updateDom: function (container, id, module, context) {
		if (context._element) container.removeChild(context._element);
		context._element = module.getDom.call(context);
		context._element.classList.add(id);
		console.log('updateDom', context._element);
		container.appendChild(context._element);
	},

	init: function () {
		for (var module of _modules) {
			Module.initModule.apply(this, module);
		}
		console.log('init success');
	},


	getModuleConfig: function (id) {
		return window.config[id] || {};
	}
};


document.addEventListener("DOMContentLoaded", Module.init);
