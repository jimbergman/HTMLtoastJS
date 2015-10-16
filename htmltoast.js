/*
** HTML Toast JS
** copyright 2015 Jim Bergman
** v1.00 Oct 16, 2015 initial release

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var toast = {};
    toast.mintimeout  = 250;
    toast.timeout     = 3000;
    toast.infinity    = 9999999999;
    toast.tracker     = false;
    toast.initialized = false;

toast.init = function( )
{
  var toastdiv = document.createElement('div');
      toastdiv.setAttribute('id', 'toastdiv');
      toastdiv.innerHTML = '<div id="toast" class="toast"></div>';
  document.body.appendChild( toastdiv );
  toast.initialized = true;
};

toast.show = function( msg, d, fn )
{
  // init & add toastdiv to DOM
  if ( !toast.initialized ) { toast.init(); }

  // kill any existing displayed toast
  if ( toast.tracker ) { toast.slayer(); }

  // timeout defaults to 3 second & prevents too short a display time
  if ( d === 0  ||  d === toast.infinity ) {
    console.log('toast infinity');
    d = toast.infinity;
  }
  else if ( !d  ||  d < toast.mintimeout ) {
    d = toast.timeout;
  }

  // do toast tap/click ( default action is dismiss toast )
  toast.callback = fn || toast.slayer;
  document.getElementById('toastdiv').addEventListener( 'click', toast.callback );

  document.getElementById('toast').innerHTML = msg;
  toast.tracker = setTimeout( toast.slayer, d );
  document.getElementById('toastdiv').style.display = 'block';

  return{ message:msg, timeout:d, callback:toast.callback };
};

toast.slayer = function( )
{
  // exit if hasn't been initialized
  if ( !toast.initialized ) { toast.init(); }

  window.clearTimeout( toast.tracker );
  toast.tracker = false;
  // document.getElementById('toastdiv').style.display = 'none';
  document.getElementById('toastdiv').removeAttribute('style');
  document.getElementById('toastdiv').removeEventListener( 'click', toast.callback );
  document.getElementById('toast').innerHTML = '';
  delete toast.callback;
};
