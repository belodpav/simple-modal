;(function() {
	// Constructor
	this.SimpleModal = function() {
		this.box = null;
		this.overlay = null;
		this.options = null;
		// Default Modal message settings
		var defaults = {
			content: 'Hello, world!',
			closeButton: true,
			overlay: true,
			minWidth: 200,
			maxWidth: 600
		};

		if (arguments[0] && typeof arguments[0] === 'object') {
			this.options = extendDefaults(defaults, arguments[0]);
		} else {
			this.options = defaults;
		}
	};
	// Public
	SimpleModal.prototype.open = function() {
		buildOut.call(this);
		initEvents.call(this);

		window.getComputedStyle(this.modal).opacity;
		
		this.modal.className += ' simple-modal--open';
	};
	SimpleModal.prototype.close = function() {
		var self = this;
		window.getComputedStyle(this.modal).opacity;
		this.modal.className = this.modal.className.replace('simple-modal--open','');
		this.modal.addEventListener('transitionend', function() {
			self.modal.remove();
		});
		
	}
	// Private
	function extendDefaults(source, properties) {
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property]; 
			}
		}
		return source;
	}
	function initEvents() {
		if (this.options.closeButton) {
			this.closeButton.addEventListener('click', this.close.bind(this));
		}
		if (this.options.overlay) {
			this.overlay.addEventListener('click', this.close.bind(this));
		}
	}
	function buildOut() {
		var docFrag, contentText;

		if (typeof this.options.content === 'string') {
			contentText = this.options.content;
		} else {
			contentText = this.options.content.innerHTML;
		}

		docFrag = document.createDocumentFragment();
		
		this.modal = document.createElement('div');
		this.modal.className = 'simple-modal';
		this.box = document.createElement('div');
		this.box.className = 'simple-modal__box';

		if (this.options.closeButton) {
			this.closeButton = document.createElement('button');
			this.closeButton.className = 'simple-modal__close-btn';
			this.closeButton.innerHTML = 'x';
			this.box.appendChild(this.closeButton);
		}

		this.content = document.createElement('div');
		this.content.className = 'simple-modal__content';
		this.content.innerHTML = contentText;
		this.box.appendChild(this.content);

		if (this.options.overlay) {
			this.overlay = document.createElement('div');
			this.overlay.className = 'simple-modal__overlay';
			this.modal.appendChild(this.overlay);
		}

		this.modal.appendChild(this.box);

		docFrag.appendChild(this.modal);

		document.body.appendChild(docFrag);

	}
})();