# notiModal.js
A simple bootstrap notification modal with jQuery

![demo screenshot](/demo.jpg?raw=true "demo screenshot")

## Dependencies
- jquery
- bootstrap (css) : If you are already using bootstrap that will work fine, otherwise notiModal requires **Buttons** and **Popover** bootstrap style components. use ``bootstrap.popover.min.css`` file for **the minimum style requirements**.


## Installation
```html
<link rel="stylesheet" type="text/css" href="bootstrap.min.css">
...
<script src="jquery.js" type="text/javascript"></script>
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

| option    | default                                                 | type           | accepted values                                | description                                               | example                                             |
|-----------|---------------------------------------------------------|----------------|------------------------------------------------|-----------------------------------------------------------|-----------------------------------------------------|
| name      | ''                                                      | string         |                                                | a unique name for the modal                               | myModal01                                           |
| title     | 'Hello world'                                           | string         |                                                | the modal title                                           |                                                     |
| content   | 'Hi there, this is a test content'                      | string         |                                                | the modal content                                         |                                                     |
| ok        | 'ok'                                                    | string         |                                                | the modal "ok" button text                                |                                                     |
| no_more   | 'Stop showing this'                                     | string         |                                                | button text: when clicked the modal stops showing         |                                                     |
| close     | 'Close'                                                 | string         |                                                | closes the modal                                          |                                                     |
| top       | '20px'                                                  | string|integer |                                                | the modal top position                                    |                                                     |
| max_width | '320px'                                                 | string|integer |                                                | the modal max width                                       |                                                     |
| duration  | '500ms'                                                 | string         |                                                | the modal css animation duration                          |                                                     |
| delay     | 0                                                       | integer        |                                                | the delay before the modal was shown after calling show() |                                                     |
| storage   | window.localStorage if exists otherwise false           | object         | -window.localStorage  -  window.sessionStorage | the browser storage to use                                | window.sessionStorage                               |
| template  | see the plugin sourve file | string         |                                                | modal Html                                                |                                                     |
| onOkClick | function(noti_modal) {  }                               | function       |                                                | called after the "ok" button was clicked                  | function(noti_modal) { // code noti_modal.hide(); } |

## see working demo in [demo folder](/demo)
