export default class EventChannel {

  constructor(url, token) {
  	this._url = url;
  	this._token = token;

  	this.ws = new WebSocket(url + '/?token=' + token);

  	this.ws.onmessage = this._onmessage;
  	this.ws.onopen = this._onopen;
  	this.ws.onclose = this._onclose;
  	this.ws.onerror = this._onerror;
  }

  set onmessage (callback){ 
  	this._onmessage = callback;
  }

  set onopen (callback){ 
  	this._onopen = callback;
  }

  set onclose (callback){ 
  	this._onclose = callback;
  }

  set onerror (callback){ 
  	this._onerror = callback;
  }

}