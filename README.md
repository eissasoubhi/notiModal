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
## Demo
https://netfox01.github.io/notiModal

## Methods
| method | description                     | usage                                                                                                                                   | options                                                                                          | example                                                                                                                                                                    |
|--------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| init   | creats a new modal              | $.notiModal.init(unique_name, options);                                                                                                 | **unique_name** : a unique name for the modal.  **options** : See the [options](#options) section below.             | $.notiModal.init('mymodal01', {title: 'hello', content: 'hey there, this is a notification'});                                                                             |
| get    | get a created modal (with init) | $.notiModal.get(unique_name);                                                                                                           | **Unique_name** : the modal name.                                                                    | $.notiModal.get('mymodal01');                                                                                                                                              |
| show   | shows selected modal            | a modal can be selected with get method or after when it is created :  $.notiModal.get(unique_name).show({force: false, sound: false}); | **force** : the [force option](#global-options) for a particular show.  **sound** : the [sound option](#global-options) for a particular show. *(those options overrides global and init options)*| $.notiModal.init('mymodal02', {title: 'hello', content: 'hey there, this is a notification'}).show({sound: true}); or    $.notiModal.get('mymodal02').show({sound: true}); |
| hide   | hide selected modal             | $.notiModal.get(unique_name).hide();                                                                                                    | -                                                                                                | $.notiModal.get('mymodal02').hide();                                                                                                                                       |

## Options

| option    | default                                       | type              | accepted values                                | description                                                | example                                             |
|-----------|-----------------------------------------------|-------------------|------------------------------------------------|------------------------------------------------------------|-----------------------------------------------------|
| name      | ''                                            | string            |                                                | a unique name for the modal                                | myModal01                                           |
| title     | 'Hello world'                                 | string            |                                                | the modal title                                            |                                                     |
| content   | 'Hi there, this is a test content'            | string            |                                                | the modal content                                          |                                                     |
| ok        | 'ok'                                          | string            |                                                | the modal "ok" button text                                 |                                                     |
| no_more   | 'Stop showing this'                           | string            |                                                | button text: when clicked the modal stops showing          |                                                     |
| close     | 'Close'                                       | string            |                                                | closes the modal                                           |                                                     |
| top       | '20px'                                        | string or integer |                                                | the modal top position                                     |                                                     |
| max_width | '320px'                                       | string or integer |                                                | the modal max width                                        |                                                     |
| duration  | '500ms'                                       | string            |                                                | the modal css animation duration                           |                                                     |
| delay     | 0                                             | integer           |                                                | the delay before the modal was shown after calling show()  |                                                     |
| storage   | window.localStorage if exists otherwise false | object            | -window.localStorage  -  window.sessionStorage | the browser storage to use                                 | window.sessionStorage                               |
| force     | false                                         | boolean           | boolean                                        | the [force option](#global-options) for a particular modal |                                                     |
| sound     | false                                         | boolean           | boolean                                        | the [sound option](#global-options) for a particular modal |                                                     |
| template  | see the plugin sourve file                    | string            |                                                | modal Html                                                 |                                                     |
| onOkClick | function(noti_modal) {  }                     | function          |                                                | called after the "ok" button was clicked                   | function(noti_modal) { // code noti_modal.hide(); } |

## Global options

| option | default | type    | description                                                                                                                                        | example                         |
|--------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| sound  | false   | boolean | plays a sound when showing the modal.  you can set this option to a specified modal.. see **show** and **init** methods options                                      | $.notiModal.config.sound = true; |
| force  | false   | boolean | forces the modal show (even if the "*never show again*" button was clicked).  you can set this option to a specified modal.. see **show** and **init** methods options | $.notiModal.config.force = true; |

## see [working demo](https://netfox01.github.io/notiModal) in [demo folder](/demo)
##Credits
[unsplash.it](https://unsplash.it)
