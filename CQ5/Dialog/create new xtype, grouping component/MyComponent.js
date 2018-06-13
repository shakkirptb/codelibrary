CQ.Ext.namespace('CQ.form');

CQ.form.MyComponent = CQ.Ext.extend(CQ.Ext.Panel, {
	'FORMAT_JSON':			'JSON',
	'FORMAT_CONCATENATE':	'CONCATENATE',

	/**
	 * @cfg {Boolean} readOnly <tt>true</tt> to mark the field as readOnly in HTML
	 * (defaults to <tt>false</tt>).
	 * <br><p><b>Note</b>: this only sets the element's readOnly DOM attribute.
	 * Setting <code>readOnly=true</code>, for example, will not disable triggering a
	 * ComboBox or DateField; it gives you the option of forcing the user to choose
	 * via the trigger without typing in the text box. To hide the trigger use
	 * <code>{@link CQ.Ext.form.TriggerField#hideTrigger hideTrigger}</code>.</p>
	 */
	'readOnly':				false,

	/**
	 * @cfg {Boolean} disabled True to disable the field (defaults to false).
	 * <p>Be aware that conformant with the <a href="http://www.w3.org/TR/html401/interact/forms.html#h-17.12.1">HTML specification</a>,
	 * disabled Fields will not be {@link CQ.Ext.form.BasicForm#submit submitted}.</p>
	 */
	'disabled':				false,

	/**
	 * @cfg {Boolean} submitValue False to clear the name attribute on the field so that it is not submitted during a form post.
	 * Defaults to <tt>true</tt>.
	 */
	'submitValue':			true,

	/**
	 * @cfg {String} ignoreData
	 * True to ignore data from records (defaults to false)
	 */
	'ignoreData':			false,

	/**
	 * @cfg (String) format
	 * 'json', 'concatenate'
	 */
	'format':				'JSON',

	/**
	 * @cfg (String) concatenateCharacter
	 */
	'concatenateCharacter':	'\n',

	/**
		 * @cfg {String/Object} layout
		 * <p><b>*Important</b>: In order for child items to be correctly sized and
		 * positioned, typically a layout manager <b>must</b> be specified through
		 * the <code>layout</code> configuration option.</p>
		 * <br><p>The sizing and positioning of child {@link items} is the responsibility of
		 * the Container's layout manager which creates and manages the type of layout
		 * you have in mind.  For example:</p><pre><code>
new CQ.Ext.Window({
	width:300, height: 300,
	layout: 'fit', // explicitly set layout manager: override the default (layout:'auto')
	items: [{
	    title: 'Panel inside a Window'
	}]
}).show();
		 * </code></pre>
		 * <p>If the {@link #layout} configuration is not explicitly specified for
		 * a general purpose container (e.g. Container or Panel) the
		 * {@link CQ.Ext.layout.ContainerLayout default layout manager} will be used
		 * which does nothing but render child components sequentially into the
		 * Container (no sizing or positioning will be performed in this situation).
		 * Some container classes implicitly specify a default layout
		 * (e.g. FormPanel specifies <code>layout:'form'</code>). Other specific
		 * purpose classes internally specify/manage their internal layout (e.g.
		 * GridPanel, TabPanel, TreePanel, Toolbar, Menu, etc.).</p>
		 * <br><p><b><code>layout</code></b> may be specified as either as an Object or
		 * as a String:</p><div><ul class="mdetail-params">
		 *
		 * <li><u>Specify as an Object</u></li>
		 * <div><ul class="mdetail-params">
		 * <li>Example usage:</li>
<pre><code>
layout: {
	type: 'vbox',
	padding: '5',
	align: 'left'
}
</code></pre>
		 *
		 * <li><code><b>type</b></code></li>
		 * <br/><p>The layout type to be used for this container.  If not specified,
		 * a default {@link CQ.Ext.layout.ContainerLayout} will be created and used.</p>
		 * <br/><p>Valid layout <code>type</code> values are:</p>
		 * <div class="sub-desc"><ul class="mdetail-params">
		 * <li><code><b>{@link CQ.Ext.layout.AbsoluteLayout absolute}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.AccordionLayout accordion}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.AnchorLayout anchor}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.ContainerLayout auto}</b></code> &nbsp;&nbsp;&nbsp; <b>Default</b></li>
		 * <li><code><b>{@link CQ.Ext.layout.BorderLayout border}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.CardLayout card}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.ColumnLayout column}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.FitLayout fit}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.FormLayout form}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.HBoxLayout hbox}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.MenuLayout menu}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.TableLayout table}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.ToolbarLayout toolbar}</b></code></li>
		 * <li><code><b>{@link CQ.Ext.layout.VBoxLayout vbox}</b></code></li>
		 * </ul></div>
		 *
		 * <li>Layout specific configuration properties</li>
		 * <br/><p>Additional layout specific configuration properties may also be
		 * specified. For complete details regarding the valid config options for
		 * each layout type, see the layout class corresponding to the <code>type</code>
		 * specified.</p>
		 *
		 * </ul></div>
		 *
		 * <li><u>Specify as a String</u></li>
		 * <div><ul class="mdetail-params">
		 * <li>Example usage:</li>
<pre><code>
layout: 'vbox',
layoutConfig: {
	padding: '5',
	align: 'left'
}
</code></pre>
		 * <li><code><b>layout</b></code></li>
		 * <br/><p>The layout <code>type</code> to be used for this container (see list
		 * of valid layout type values above).</p><br/>
		 * <li><code><b>{@link #layoutConfig}</b></code></li>
		 * <br/><p>Additional layout specific configuration properties. For complete
		 * details regarding the valid config options for each layout type, see the
		 * layout class corresponding to the <code>layout</code> specified.</p>
		 * </ul></div></ul></div>
		 */
	'layout':				'form',

	/**
	 * @cfg {Number} labelWidth The width of labels in pixels. This property cascades to child containers
	 * and can be overridden on any child container (e.g., a fieldset can specify a different <tt>labelWidth</tt>
	 * for its fields) (defaults to <tt>100</tt>).
	 */
	'labelWidth':			130,

	/**
	 * private
	 */
	'bodyPadding':			4,

	/**
	 * private
	 */
	'value':				null,

	/**
	 * private
	 */
	'isFormField':			true,

	/**
	 * private
	 */
	'hiddenField':			null,

	'monitorResize':		true,
	'resizeEvent':			'resize',

    'initComponent':		function() {
    	CQ.form.MyComponent.superclass.initComponent.call(this);

		/*this.on('disable', function() {
			if (this.items) {
				this.items.each(function(item, index, length) {
					if (item != this.hiddenField) {
						item.disable();
						// item.field.disable();
					}
				}, this);
			}
		});
		this.on('enable', function() {
			if (this.items) {
				this.items.each(function(item, index, length) {
					if (item != this.hiddenField) {
						item.enable();
						// item.field.enable();
					}
				}, this);
			}
		});*/

		this.bodyStyle = 'padding:' + this.bodyPadding + 'px';

		this.addEvents(
			/**
			 * @event disable
			 * Fires after the component is disabled.
			 * @param {CQ.Ext.Component} this
			 */
			'disable',
			/**
			 * @event enable
			 * Fires after the component is enabled.
			 * @param {CQ.Ext.Component} this
			 */
			'enable',
			/**
			 * @event afterrender
			 * <p>Fires after the component rendering is finished.</p>
			 * <p>The afterrender event is fired after this Component has been {@link #rendered}, been postprocesed
			 * by any afterRender method defined for the Component, and, if {@link #stateful}, after state
			 * has been restored.</p>
			 * @param {CQ.Ext.Component} this
			 */
			'afterrender',
			/**
			 * @event beforeloadcontent
			 * Fires before the content is loaded. Return false to cancel loading content.
			 * @param {CQ.form.CompositeField} field This composite field
			 * @param {CQ.Ext.data.Record} record The record
			 * @param {String} path The content path where the record was created from
			 */
			'beforeloadcontent',
			/**
			 * @event loadcontent
			 * Fires when the content has been loaded.
			 * @param {CQ.form.CompositeField} field This composite field
			 * @param {CQ.Ext.data.Record} record The record
			 * @param {String} path The content path where the record was created from
			 */
			'loadcontent',
			/**
			 * @event setvalue
			 * Fires when the value is set
			 * @param {CQ.form.CompositeField} field This composite field
			 * @param {Mixed} the new value
			 */
			'setvalue'
		);
	},

	'initItems':			function() {
        if(! this.items){
            this.items = new CQ.Ext.util.MixedCollection(false, this.getComponentId);
            this.getLayout();

			if (!this.hiddenField) {
				this.hiddenField = new CQ.Ext.form.Hidden({
					'name':					this.name,
					'value':				'',
					'ignoreData':			true,
					'submitValue':			this.submitValue,
					'stateful':				this.stateful
				});
				this.items.add(this.hiddenField);
			}
        }
	},
	
	'add':					function(comp) {
		if (arguments.length == 1 && ! CQ.Ext.isArray(comp)) {
			CQ.Ext.apply(comp, {
				'ignoreData':			true,
				'submitValue':			false,
				'disabled':				this.disabled,
				'readOnly':				this.readOnly
			});
		}
		CQ.form.MyComponent.superclass.add.apply(this, CQ.Ext.toArray(arguments));
	},

	/*'render':				function(container, position) {
		CQ.form.MyComponent.superclass.render.call(this, container, position);
	},*/

	'onRender':				function(container, position) {
		CQ.form.MyComponent.superclass.onRender.call(this, container, position);

		this.el.setVisibilityMode(CQ.Ext.Element.DISPLAY);
		this.body.setVisibilityMode(CQ.Ext.Element.DISPLAY);
		// todo hack to be removed; Dialog should dispatch this event to all subcomponents
		var dialog = this.findParentByType('dialog');
		if (dialog) {
			dialog.on("beforesubmit", function() {
            	if (! this.isDestroyed) {
					this.syncFormElements();
            	}
				return true;
			}, this);
		} else {
			var form = this.findParentByType(CQ.Ext.form.FormPanel);
			if (form) {
				var frm = form.getForm();
				frm.on("beforeaction", function() {
	            	if (! this.isDestroyed) {
	            		this.syncFormElements();
	            	}
					return true;
				}, this);
			}
		}
	},

	'afterRender':			function() {
		CQ.form.MyComponent.superclass.afterRender.call(this);
		this.initValue();
		this.fireEvent('afterrender', this);
	},

	'onEnable':				function() {
		this.items.each(function(item, index, length) {
			if (item != this.hiddenField && (typeof item.enable === 'function')) {
				item.enable();
			}
		}, this);
		this.fireEvent('enable', this);
	},

	'onDisable':			function() {
		this.items.each(function(item, index, length) {
			if (item != this.hiddenField && (typeof item.disable === 'function')) {
				item.disable();
			}
		}, this);
		this.fireEvent('disable', this);
	},

	'getName':				function() {
		return this.name;
	},

	'setSize':				function(width, height) {
        if(typeof width == 'object'){
            width = width.width;
        }
        if (CQ.Ext.isDefined(width)) {
        	this.setWidth(width);
        }
	},

	'setWidth':				function(width) {
		width = width - 2 * this.bodyPadding - this.labelWidth;
		this.items.each(function(item, index, length) {
			if (item != this.hiddenField && (typeof item.setWidth === 'function')) {
				item.setWidth(width);
			}
		}, this);
	},

	'initValue':			function() {
		this.hiddenField.setValue(this.getValue());
	},

	/**
	 * Resets the current field value to the originally loaded value and clears any validation messages
	 */
	'reset':				function() {
		CQ.form.MyComponent.superclass.reset.call(this);
		this.items.each(function(item, index, length) {
			if (item != this.hiddenField && (typeof item.reset === 'function')) {
				item.reset();
			}
		}, this);
		this.clearInvalid();
	},

	'syncFormElements':		function() {
		this.hiddenField.setValue(this.getValue());
	},

	'getRawValue':			function() {
		return this.getValue();
	},

	'getValue':				function() {
		var values = (this.format == this.FORMAT_CONCATENATE ? [] : {});
		this.items.each(function(item, index, length) {

            if ((typeof item.processPath === 'function')) {
                item.processPath(this.getDialogPath(), true);
            }

			if (item != this.hiddenField && (typeof item.getName === 'function') && (typeof item.getValue === 'function')) {
				if (this.format == this.FORMAT_CONCATENATE) {
					values.push(item.getValue());
				} else {
					values[item.getName()] = item.getValue();
				}
			}
		}, this);
		return this.format == this.FORMAT_CONCATENATE ? values.join(this.concatenateCharacter) : CQ.Ext.util.JSON.encode(values);
	},

	'setValue':				function(value) {
		var values = (this.format == this.FORMAT_CONCATENATE ? value.split(this.concatenateCharacter) : CQ.Ext.util.JSON.decode(value));
		this.items.each(function(item, index, length) {
			if (item != this.hiddenField && (typeof item.getName === 'function') && (typeof item.getValue === 'function')) {

                if ((typeof item.processPath === 'function')) {
                    item.processPath(this.getDialogPath(), true);
                }

				if (this.format == this.FORMAT_CONCATENATE) {
					item.setValue(values.shift());
				} else {
					item.setValue(values[item.getName()]);
				}
			
			}
		}, this);
		this.hiddenField.setValue(this.getValue());
		this.fireEvent('setvalue', this, value);
	},

	/**
	 * Sets the value of the field using the given record. If no according value
	 * exists the default value is set. This method is usually called by
	 * {@link CQ.Dialog#processRecords}.
	 * @param {CQ.Ext.data.Record} record The record
	 * @param {String} path The content path where the record was created from
	 */
	'processRecord':		function(record, path) {
		if (this.fireEvent('beforeloadcontent', this, record, path) !== false) {
			var value = record.get(this.getName());
			if (value == undefined && this.defaultValue != null) {
				if (this.isApplyDefault(record, path)) {
					this.setValue(this.defaultValue);
				}
			} else {
				this.setValue(value);
			}
			this.fireEvent('loadcontent', this, record, path);
		}
	},

	/**
	 * private, detects if the defaultValue has to be applied by comparing jcr:created
	 * and jcr:lastModified
	 */
	'isApplyDefault':		function(record, path) {
		var jcrCreated	= record.get('jcr:created');
		var jcrModified	= record.get('jcr:lastModified') || record.get('cq:lastModified');
		/**
		 * jcr:created is not set before CQ 5.4
		 */
		if (!jcrCreated && record.data.length == 0) {
			return false;
		}
		return jcrCreated == jcrModified;
	},

	/**
	 * Validates the field value
	 * @return {Boolean} True if the value is valid, else false
	 */
	'validate':				function() {
		if (this.disabled || this.distroyed) {
			return true;
		}
		var valid = true;
		this.items.each(function(item, index, length) {
			if (item != this.hiddenField && (typeof item.validate === 'function')) {
				valid = valid && item.validate();
			}
		}, this);
		return valid;
	},


	'getDialog':			function() {
		return this.findParentByType('dialog');
	},

	'getDialogPath':		function() {
		return this.getDialog().path;
	}
});
CQ.Ext.reg('mycomponent', CQ.form.MyComponent);
