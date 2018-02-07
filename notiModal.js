(function ($) {
    NModal =  function (options) {
        var storage;
        try {
            storage = window.localStorage;
        } catch (_error) {
            storage = false;
        }
        this._options = $.extend({
            'name': '',
            'title': 'Hello world',
            'content': 'Hi there, this is a test content',
            'ok': 'ok',
            'no_more': 'Stop showing this',
            'close': 'Close',
            'top': '20px',
            'bottom': 'initial',
            'max_width': '320px',
            'animation_duration': '500ms',
            'show_duration': 10000,
            'delay': 0,
            'sound': false,
            'force': false,
            'auto_hide': false,
            'storage': storage,
            'template': '<div class="popover notiModal" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title">{{title}}</h3> <div class="popover-content">{{content}}</div> <div class="popover-navigation"> <button class="btn btn-sm btn-default" data-role="ok">{{ok}}</button> <button class="btn btn-sm btn-default" data-role="no_more">{{no_more}}r</button> <button class="btn btn-sm btn-default" data-role="close">{{close}}</button> </div> </div>',
            onOkClick: function(noti_modal) {},
            onClose: function(noti_modal) {},
        }, $.notiModal.config, options);

        this.shift_right = '-' + (parseFloat(this._options.max_width) + 20) + 'px'
        this.init(this._options);
    }

    NModal.prototype.addStyle = function (options) {
        this.modal.css({
            'display': 'block',
            'max-width': this.cssMeasureUnit(options.max_width),
            'right': this.shift_right,
            'top': options.bottom !== "initial" ? "initial" : this.cssMeasureUnit(options.top),
            'bottom': this.cssMeasureUnit(options.bottom),
            'left': 'auto',
            'position': 'fixed',
            '-webkit-transition': 'all ' + options.animation_duration + ' ease-out',
            '-moz-transition': 'all ' + options.animation_duration + ' ease-out',
            '-o-transition': 'all ' + options.animation_duration + ' ease-out',
            'transition': 'all ' + options.animation_duration + ' ease-out',
            'border-bottom-right-radius': '0',
            'border-top-right-radius': '0',
        })
        this.modal.find('.popover-navigation').css({
            'margin-bottom': '9px',
            'margin-left': '14px',
            'padding-right': '25px'
        })
    }

    NModal.prototype.replaceTemplate = function (options) {
        this.modal.find('h3.popover-title').html(options.title)
        this.modal.find('.popover-content').html(options.content)
        this.modal.find('button[data-role="ok"]').html(options.ok)
        this.modal.find('button[data-role="no_more"]').html(options.no_more)
        this.modal.find('button[data-role="close"]').html(options.close)
        this.modal.addClass(options.name);
    }

    NModal.prototype.cssMeasureUnit = function (val) {
        return isNaN(val) ? val : parseFloat(val) + 'px';
    }

    NModal.prototype.init = function (options) {
        this.modal = $(options.template);
        this.addStyle(options)
        this.replaceTemplate(options)
        this.attachEvents(options)
        $('body').append(this.modal)
    }

    NModal.prototype.attachEvents = function (options) {
        var noti_modal = this;
        this.modal.find('button[data-role="ok"]').click(function () {
            options.onOkClick(noti_modal)
        });
        this.modal.find('button[data-role="close"]').click(function () {
            noti_modal.hide();
        });
        this.modal.find('button[data-role="no_more"]').click(function () {
            noti_modal.setState('never_show_' + options.name, true);
            noti_modal.hide();
        });
    }

    NModal.prototype.setState = function(key, value) {
        if (this._options.storage)
        {
            keyName = "" + this._options.name + "_" + key;
            try
            {
              this._options.storage.setItem(key, value);
            }
            catch (_error)
            {
              e = _error;
              if (e.code === DOMException.QUOTA_EXCEEDED_ERR)
              {
                this._debug('LocalStorage quota exceeded. State storage failed.');
              }
            }
        }
    };

    NModal.prototype.getState = function(key) {
        var value = false;
        if (this._options.storage)
        {
            value = this._options.storage.getItem(key);
        }
        return value;
    };

    NModal.prototype.show = function (options) {
        var self = this;
        is_never_show_again = this.getState('never_show_' + this._options.name);
        var _options = $.extend({}, this._options, options);

        this.init(_options);

        if(! is_never_show_again || _options.force)
        {
            setTimeout(function () {
                self.modal.css('right', -5);

                if(_options.sound)
                {
                    var audio = new Audio('sound/notify.mp3');
                    audio.play();
                }

                if (_options.auto_hide) {
                    setTimeout(function () {
                        self.hide();
                    }, _options.show_duration)
                }
            }, _options.delay)
        }
    }

    NModal.prototype.hide = function () {
        var self = this;
        this.modal.css('right', this.shift_right );

        setTimeout(function () {
            self._options.onClose(self);
        }, parseInt(this._options.animation_duration));
    }

    NotiModal =  function () {
        this.noti_modals = {};
    }

    NotiModal.prototype.init = function (name, options) {
        if(! (name in this.noti_modals) )
        {
            options.name = name;
            this.noti_modals[name] = new NModal(options);
            return this.noti_modals[name];
        }
        else
        {
            console.error("modal name : "+ name +" already taken");
        }
    }

    NotiModal.prototype.get = function (name) {
        if( name in this.noti_modals)
        {
            return this.noti_modals[name];
        }
        else
        {
            console.error("no such modal name : "+ name);
        }
    }

    NotiModal.prototype.config = {
        sound: false,
        force: false,
        auto_hide: false,
        show_duration: 10000,
    }

    $.notiModal = new NotiModal();
})(window.jQuery)
