# HTMLtoastJS
Simple HTML/CSS toast displays a pop-over message.

Small, lightweight, and mobile friendly. Tested on iOS 7+, Android 4+ and Windows Phone 8+.

Hardware acceleration on mobile is enabled using the CSS transform:translate3D(0,0,0); command. No transition is used.

Works great with Cordova/PhoneGap applications.

Licensed under the [MIT License](http://opensource.org/licenses/MIT)

## Screenshots (mobile and desktop)

![](http://www.jimbergman.net/images/HTMLToastJS-demo-mobile.jpg "HTMLtoastJS mobile screenshot")
![](http://www.jimbergman.net/images/HTMLToastJS-demo-desktop.jpg "HTMLtoastJS desktop screenshot")

## Requirements

Include these in your HTML:

```
<link href="htmltoast.css" rel="stylesheet"></link>
<script src="htmltoast.js"></script>
```

## Dependencies

None. All code is vanilla JavaScript 5 and CSS 3.

## Reference

The minimum required to display a toast message:
```
toast.show( 'message' );
```

Toast can accept three options:

```
toast.show( 'message', [timeout, callback] );
```
- **message** - the text to be displayed. You can use HTML for whatever you want (text, images, SVG).

- **timeout** [optional] - time in milliseconds (1/1000) to display toast (toast.timeout defaults to 3000ms which is 3 seconds)
  toast.timeout is the default 3000ms (3 seconds). toast.infinity is useful for displaying a toast for a really long time.

- **callback** [optional] - function to call only if toast is clicked or tapped. **timeout** is required when using a **callback**.
  If not specified, the callback defaults to toast.slayer() which closes the toast.

To programmatically close a toast, use:
```
toast.slayer();```

NOTE: Opening a toast will close one that is already open, so be careful not to open a bunch quickly, because you will only see the most recent one.

## Examples

Display a toast with TEST for the default duration, and if clicked/tapped, display an alert:
```
toast.show('TEST', toast.timeout, function(){alert('HI')});
```

Use HTML and CSS to customize the message displayed, and display for 10 seconds:
```
toast.show('<span style="font-size:100px">☆</span><br>Hello!', 10000);
```

To change the vertical position of the toast, override the default CSS below. bottom is used for possible future use in supporting mutiple simultaneous toast.
```
#toastdiv { bottom: 20%; }
```

## Live Demo

http://jimbergman.net/scripts/HTMLtoastJS/

## Unit Testing

Unit tests are supported via closures (an object returned by the toast.show() call)

```
  var myToast = toast.show('TEST', toast.timeout, function(){alert('HI')});
  // unit tests
  console.assert( typeof myToast === 'object' );
  console.assert( typeof myToast.message === 'string' );
  console.assert( typeof myToast.timeout === 'number'  &&  myToast.timeout >= toast.mintimeout );
  console.assert( typeof myToast.callback === 'function' );  </script>
```