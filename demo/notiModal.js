(function ($) {
    NModal =  function (options) {
        var storage;
        try {
            storage = window.localStorage;
        } catch (_error) {
            storage = false;
        }
        this._options = $.extend({
            name: '',
            title: 'Hello world',
            content: 'Hi there, this is a test content',
            ok: 'ok',
            no_more: 'Stop showing this',
            close: 'Close',
            top: '20px',
            'max_width': '320px',
            'duration': '500ms',
            'delay': 0,
            'storage': storage,
            template: '<div class="popover notiModal" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title">{{title}}</h3> <div class="popover-content">{{content}}</div> <div class="popover-navigation"> <button class="btn btn-sm btn-default" data-role="ok">{{ok}}</button> <button class="btn btn-sm btn-default" data-role="no_more">{{no_more}}r</button> <button class="btn btn-sm btn-default" data-role="close">{{close}}</button> </div> </div>',
            onOkClick: function(noti_modal) {},
        }, options);

        this.shift_right = '-' + (parseFloat(this._options.max_width) + 20) + 'px'
        this.init();
    }

    NModal.prototype.addStyle = function () {
        this.modal.css({
            'display': 'block',
            'max-width': parseFloat(this._options.max_width) + 'px',
            'right': this.shift_right,
            'top': parseFloat(this._options.top) + 'px',
            'left': 'auto',
            'position': 'fixed',
            '-webkit-transition': 'all ' + this._options.duration + ' ease-out',
            '-moz-transition': 'all ' + this._options.duration + ' ease-out',
            '-o-transition': 'all ' + this._options.duration + ' ease-out',
            'transition': 'all ' + this._options.duration + ' ease-out',
            'border-bottom-right-radius': '0',
            'border-top-right-radius': '0',
        })
        this.modal.find('.popover-navigation').css({
            'margin-bottom': '9px',
            'margin-left': '14px',
            'padding-right': '25px'
        })
    }

    NModal.prototype.replaceTemplate = function () {
        this.modal.find('h3.popover-title').html(this._options.title)
        this.modal.find('.popover-content').html(this._options.content)
        this.modal.find('button[data-role="ok"]').html(this._options.ok)
        this.modal.find('button[data-role="no_more"]').html(this._options.no_more)
        this.modal.find('button[data-role="close"]').html(this._options.close)
        this.modal.addClass(this._options.name);
    }

    NModal.prototype.init = function () {
        this.modal = $(this._options.template);
        this.addStyle()
        this.replaceTemplate()
        this.attachEvents()
        $('body').append(this.modal)
    }

    NModal.prototype.attachEvents = function () {
        var noti_modal = this;
        this.modal.find('button[data-role="ok"]').click(function () {
            noti_modal._options.onOkClick(noti_modal)
        });
        this.modal.find('button[data-role="close"]').click(function () {
            noti_modal.hide()
        });
        this.modal.find('button[data-role="no_more"]').click(function () {
            noti_modal.setState('never_show_' + noti_modal._options.name, true);
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

    NModal.prototype.show = function (force) {
        var self = this;
        is_never_show_again = this.getState('never_show_' + this._options.name);
        var force = force ? true : false;

        if(! is_never_show_again || force)
        {
            setTimeout(function () {
                self.modal.css('right', -5)
                var audio = new Audio('sound/notify.mp3');
                audio.play();
            }, this._options.delay)
        }
    }

    NModal.prototype.hide = function () {
        this.modal.css('right', this.shift_right )
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

    $.notiModal = new NotiModal();
})(window.jQuery)