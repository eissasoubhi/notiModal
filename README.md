# notiModal.js
A simple bootstrap notification modal with jQuery

![demo screenshot](/demo.jpg?raw=true "demo screenshot")

## Dependencies
- jquery
- bootstrap : If you are already using bootstrap that will work fine, otherwise use ``bootstrap.popover.min.css`` and ``bootstrap.popover.min.js`` files for the minimum style requirements.

The minimum style components requirements from bootstrap : **Buttons** and **Popover**  =>  bootstrap.popover.min.css

The minimum javascript components requirements from bootstrap : **Tooltips** and **Popover** =>  bootstrap.popover.min.js


## Installation
```html
<link rel="stylesheet" type="text/css" href="bootstrap.min.css">
...
<script src="jquery.js" type="text/javascript"></script>
<script src="bootstrap.min.js" type="text/javascript"></script>
<script src="notiModal.min.js" type="text/javascript" ></script>
```
## Usage
You can create modals as many as you need with ``$.notiModal.init()`` and call them later with``$.notiModal.get()``
```javascript
$.notiModal.init("test1", {
            title: "this is a test"
        });
$.notiModal.get("test1").show();
```
or use theme directly after creation 
```javascript
$.notiModal.init("test2", {
            title: "this is another test"
        }).show();
```
## Methods
#### $.notiModal.init

creats a new modal 
```javascript
$.notiModal.init(unique_name, options);
```
#### $.notiModal.get

get a created modal
```javascript
$.notiModal.get(unique_name);
```
#### Show

show selected modal
```javascript
$.notiModal.get(unique_name).show();
```
#### hide

hide selected modal
```javascript
$.notiModal.get(unique_name).hide();
```
## Options

#### name
a unique name for the modal
#### title
the modal title
#### content
the modal content
#### ok
the modal "ok" button text 
#### no_more
the modal "Stop showing this" button text 
#### close
the modal "close" button text 
#### top
the modal top position
#### max_width
the modal max width, default : 320px
#### duration
the modal animation duration, default : 500ms
#### delay
the modal show delay, default : 0 (integer)
#### storage
the browser storage to use : window.localStorage or window.sessionstorage , default : window.localStorage
#### template
the modal template, default :
```html
<div class="popover notiModal" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title">{{title}}</h3> <div class="popover-content">{{content}}</div> <div class="popover-navigation"> <button class="btn btn-sm btn-default" data-role="ok">{{ok}}</button> <button class="btn btn-sm btn-default" data-role="no_more">{{no_more}}r</button> <button class="btn btn-sm btn-default" data-role="close">{{close}}</button> </div> </div>
```
## event
#### onOkClick
called after the "ok" button was clicked

## see working demo in [demo folder](/demo)
