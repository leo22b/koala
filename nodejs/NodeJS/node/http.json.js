{
  "source": "doc/api/http.markdown",
  "modules": [
    {
      "textRaw": "HTTP",
      "name": "http",
      "stability": 2,
      "stabilityText": "Stable",
      "desc": "<p>To use the HTTP server and client one must <code>require(&#39;http&#39;)</code>.\n\n</p>\n<p>The HTTP interfaces in Node.js are designed to support many features\nof the protocol which have been traditionally difficult to use.\nIn particular, large, possibly chunk-encoded, messages. The interface is\ncareful to never buffer entire requests or responses--the\nuser is able to stream data.\n\n</p>\n<p>HTTP message headers are represented by an object like this:\n\n</p>\n<pre><code>{ &#39;content-length&#39;: &#39;123&#39;,\n  &#39;content-type&#39;: &#39;text/plain&#39;,\n  &#39;connection&#39;: &#39;keep-alive&#39;,\n  &#39;host&#39;: &#39;mysite.com&#39;,\n  &#39;accept&#39;: &#39;*/*&#39; }</code></pre>\n<p>Keys are lowercased. Values are not modified.\n\n</p>\n<p>In order to support the full spectrum of possible HTTP applications, Node.js&#39;s\nHTTP API is very low-level. It deals with stream handling and message\nparsing only. It parses a message into headers and body but it does not\nparse the actual headers or the body.\n\n</p>\n<p>See [<code>message.headers</code>][] for details on how duplicate headers are handled.\n\n</p>\n<p>The raw headers as they were received are retained in the <code>rawHeaders</code>\nproperty, which is an array of <code>[key, value, key2, value2, ...]</code>.  For\nexample, the previous message header object might have a <code>rawHeaders</code>\nlist like the following:\n\n</p>\n<pre><code>[ &#39;ConTent-Length&#39;, &#39;123456&#39;,\n  &#39;content-LENGTH&#39;, &#39;123&#39;,\n  &#39;content-type&#39;, &#39;text/plain&#39;,\n  &#39;CONNECTION&#39;, &#39;keep-alive&#39;,\n  &#39;Host&#39;, &#39;mysite.com&#39;,\n  &#39;accepT&#39;, &#39;*/*&#39; ]</code></pre>\n",
      "classes": [
        {
          "textRaw": "Class: http.Agent",
          "type": "class",
          "name": "http.Agent",
          "desc": "<p>The HTTP Agent is used for pooling sockets used in HTTP client\nrequests.\n\n</p>\n<p>The HTTP Agent also defaults client requests to using\nConnection:keep-alive. If no pending HTTP requests are waiting on a\nsocket to become free the socket is closed. This means that Node.js&#39;s\npool has the benefit of keep-alive when under load but still does not\nrequire developers to manually close the HTTP clients using\nKeepAlive.\n\n</p>\n<p>If you opt into using HTTP KeepAlive, you can create an Agent object\nwith that flag set to <code>true</code>.  (See the [constructor options][].)\nThen, the Agent will keep unused sockets in a pool for later use.  They\nwill be explicitly marked so as to not keep the Node.js process running.\nHowever, it is still a good idea to explicitly [<code>destroy()</code>][] KeepAlive\nagents when they are no longer in use, so that the Sockets will be shut\ndown.\n\n</p>\n<p>Sockets are removed from the agent&#39;s pool when the socket emits either\na <code>&#39;close&#39;</code> event or a special <code>&#39;agentRemove&#39;</code> event. This means that if\nyou intend to keep one HTTP request open for a long time and don&#39;t\nwant it to stay in the pool you can do something along the lines of:\n\n</p>\n<pre><code class=\"js\">http.get(options, (res) =&gt; {\n  // Do stuff\n}).on(&#39;socket&#39;, (socket) =&gt; {\n  socket.emit(&#39;agentRemove&#39;);\n});</code></pre>\n<p>Alternatively, you could just opt out of pooling entirely using\n<code>agent:false</code>:\n\n</p>\n<pre><code class=\"js\">http.get({\n  hostname: &#39;localhost&#39;,\n  port: 80,\n  path: &#39;/&#39;,\n  agent: false  // create a new agent just for this one request\n}, (res) =&gt; {\n  // Do stuff with response\n})</code></pre>\n",
          "methods": [
            {
              "textRaw": "agent.createConnection(options[, callback])",
              "type": "method",
              "name": "createConnection",
              "desc": "<p>Produces a socket/stream to be used for HTTP requests.\n\n</p>\n<p>By default, this function is the same as [<code>net.createConnection()</code>][]. However,\ncustom Agents may override this method in case greater flexibility is desired.\n\n</p>\n<p>A socket/stream can be supplied in one of two ways: by returning the\nsocket/stream from this function, or by passing the socket/stream to <code>callback</code>.\n\n</p>\n<p><code>callback</code> has a signature of <code>(err, stream)</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "options"
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "agent.destroy()",
              "type": "method",
              "name": "destroy",
              "desc": "<p>Destroy any sockets that are currently in use by the agent.\n\n</p>\n<p>It is usually not necessary to do this.  However, if you are using an\nagent with KeepAlive enabled, then it is best to explicitly shut down\nthe agent when you know that it will no longer be used.  Otherwise,\nsockets may hang open for quite a long time before the server\nterminates them.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "agent.getName(options)",
              "type": "method",
              "name": "getName",
              "desc": "<p>Get a unique name for a set of request options, to determine whether a\nconnection can be reused.  In the http agent, this returns\n<code>host:port:localAddress</code>.  In the https agent, the name includes the\nCA, cert, ciphers, and other HTTPS/TLS-specific options that determine\nsocket reusability.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "options"
                    }
                  ]
                }
              ]
            }
          ],
          "properties": [
            {
              "textRaw": "agent.freeSockets",
              "name": "freeSockets",
              "desc": "<p>An object which contains arrays of sockets currently awaiting use by\nthe Agent when HTTP KeepAlive is used.  Do not modify.\n\n</p>\n"
            },
            {
              "textRaw": "agent.maxFreeSockets",
              "name": "maxFreeSockets",
              "desc": "<p>By default set to 256.  For Agents supporting HTTP KeepAlive, this\nsets the maximum number of sockets that will be left open in the free\nstate.\n\n</p>\n"
            },
            {
              "textRaw": "agent.maxSockets",
              "name": "maxSockets",
              "desc": "<p>By default set to Infinity. Determines how many concurrent sockets the agent\ncan have open per origin. Origin is either a &#39;host:port&#39; or\n&#39;host:port:localAddress&#39; combination.\n\n</p>\n"
            },
            {
              "textRaw": "agent.requests",
              "name": "requests",
              "desc": "<p>An object which contains queues of requests that have not yet been assigned to\nsockets. Do not modify.\n\n</p>\n"
            },
            {
              "textRaw": "agent.sockets",
              "name": "sockets",
              "desc": "<p>An object which contains arrays of sockets currently in use by the\nAgent.  Do not modify.\n\n</p>\n"
            }
          ],
          "signatures": [
            {
              "params": [
                {
                  "textRaw": "`options` {Object} Set of configurable options to set on the agent. Can have the following fields: ",
                  "options": [
                    {
                      "textRaw": "`keepAlive` {Boolean} Keep sockets around in a pool to be used by other requests in the future. Default = `false` ",
                      "name": "keepAlive",
                      "type": "Boolean",
                      "desc": "Keep sockets around in a pool to be used by other requests in the future. Default = `false`"
                    },
                    {
                      "textRaw": "`keepAliveMsecs` {Integer} When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = `1000`.  Only relevant if `keepAlive` is set to `true`. ",
                      "name": "keepAliveMsecs",
                      "type": "Integer",
                      "desc": "When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = `1000`.  Only relevant if `keepAlive` is set to `true`."
                    },
                    {
                      "textRaw": "`maxSockets` {Number} Maximum number of sockets to allow per host.  Default = `Infinity`. ",
                      "name": "maxSockets",
                      "type": "Number",
                      "desc": "Maximum number of sockets to allow per host.  Default = `Infinity`."
                    },
                    {
                      "textRaw": "`maxFreeSockets` {Number} Maximum number of sockets to leave open in a free state.  Only relevant if `keepAlive` is set to `true`. Default = `256`. ",
                      "name": "maxFreeSockets",
                      "type": "Number",
                      "desc": "Maximum number of sockets to leave open in a free state.  Only relevant if `keepAlive` is set to `true`. Default = `256`."
                    }
                  ],
                  "name": "options",
                  "type": "Object",
                  "desc": "Set of configurable options to set on the agent. Can have the following fields:",
                  "optional": true
                }
              ],
              "desc": "<p>The default [<code>http.globalAgent</code>][] that is used by [<code>http.request()</code>][] has all\nof these values set to their respective defaults.\n\n</p>\n<p>To configure any of them, you must create your own [<code>http.Agent</code>][] object.\n\n</p>\n<pre><code class=\"js\">const http = require(&#39;http&#39;);\nvar keepAliveAgent = new http.Agent({ keepAlive: true });\noptions.agent = keepAliveAgent;\nhttp.request(options, onResponseCallback);</code></pre>\n"
            },
            {
              "params": [
                {
                  "name": "options",
                  "optional": true
                }
              ],
              "desc": "<p>The default [<code>http.globalAgent</code>][] that is used by [<code>http.request()</code>][] has all\nof these values set to their respective defaults.\n\n</p>\n<p>To configure any of them, you must create your own [<code>http.Agent</code>][] object.\n\n</p>\n<pre><code class=\"js\">const http = require(&#39;http&#39;);\nvar keepAliveAgent = new http.Agent({ keepAlive: true });\noptions.agent = keepAliveAgent;\nhttp.request(options, onResponseCallback);</code></pre>\n"
            }
          ]
        },
        {
          "textRaw": "Class: http.ClientRequest",
          "type": "class",
          "name": "http.ClientRequest",
          "desc": "<p>This object is created internally and returned from [<code>http.request()</code>][].  It\nrepresents an <em>in-progress</em> request whose header has already been queued.  The\nheader is still mutable using the <code>setHeader(name, value)</code>, <code>getHeader(name)</code>,\n<code>removeHeader(name)</code> API.  The actual header will be sent along with the first\ndata chunk or when closing the connection.\n\n</p>\n<p>To get the response, add a listener for <code>&#39;response&#39;</code> to the request object.\n<code>&#39;response&#39;</code> will be emitted from the request object when the response\nheaders have been received.  The <code>&#39;response&#39;</code> event is executed with one\nargument which is an instance of [<code>http.IncomingMessage</code>][].\n\n</p>\n<p>During the <code>&#39;response&#39;</code> event, one can add listeners to the\nresponse object; particularly to listen for the <code>&#39;data&#39;</code> event.\n\n</p>\n<p>If no <code>&#39;response&#39;</code> handler is added, then the response will be\nentirely discarded.  However, if you add a <code>&#39;response&#39;</code> event handler,\nthen you <strong>must</strong> consume the data from the response object, either by\ncalling <code>response.read()</code> whenever there is a <code>&#39;readable&#39;</code> event, or\nby adding a <code>&#39;data&#39;</code> handler, or by calling the <code>.resume()</code> method.\nUntil the data is consumed, the <code>&#39;end&#39;</code> event will not fire.  Also, until\nthe data is read it will consume memory that can eventually lead to a\n&#39;process out of memory&#39; error.\n\n</p>\n<p>Note: Node.js does not check whether Content-Length and the length of the body\nwhich has been transmitted are equal or not.\n\n</p>\n<p>The request implements the [Writable Stream][] interface. This is an\n[<code>EventEmitter</code>][] with the following events:\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'abort'",
              "type": "event",
              "name": "abort",
              "desc": "<p><code>function () { }</code>\n\n</p>\n<p>Emitted when the request has been aborted by the client. This event is only\nemitted on the first call to <code>abort()</code>.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'checkExpectation'",
              "type": "event",
              "name": "checkExpectation",
              "desc": "<p><code>function (request, response) { }</code>\n\n</p>\n<p>Emitted each time a request with an http Expect header is received, where the\nvalue is not 100-continue. If this event isn&#39;t listened for, the server will\nautomatically respond with a 417 Expectation Failed as appropriate.\n\n</p>\n<p>Note that when this event is emitted and handled, the <code>request</code> event will\nnot be emitted.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'connect'",
              "type": "event",
              "name": "connect",
              "desc": "<p><code>function (response, socket, head) { }</code>\n\n</p>\n<p>Emitted each time a server responds to a request with a <code>CONNECT</code> method. If this\nevent isn&#39;t being listened for, clients receiving a <code>CONNECT</code> method will have\ntheir connections closed.\n\n</p>\n<p>A client server pair that show you how to listen for the <code>&#39;connect&#39;</code> event.\n\n</p>\n<pre><code class=\"js\">const http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\n// Create an HTTP tunneling proxy\nvar proxy = http.createServer( (req, res) =&gt; {\n  res.writeHead(200, {&#39;Content-Type&#39;: &#39;text/plain&#39;});\n  res.end(&#39;okay&#39;);\n});\nproxy.on(&#39;connect&#39;, (req, cltSocket, head) =&gt; {\n  // connect to an origin server\n  var srvUrl = url.parse(`http://${req.url}`);\n  var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () =&gt; {\n    cltSocket.write(&#39;HTTP/1.1 200 Connection Established\\r\\n&#39; +\n                    &#39;Proxy-agent: Node.js-Proxy\\r\\n&#39; +\n                    &#39;\\r\\n&#39;);\n    srvSocket.write(head);\n    srvSocket.pipe(cltSocket);\n    cltSocket.pipe(srvSocket);\n  });\n});\n\n// now that proxy is running\nproxy.listen(1337, &#39;127.0.0.1&#39;, () =&gt; {\n\n  // make a request to a tunneling proxy\n  var options = {\n    port: 1337,\n    hostname: &#39;127.0.0.1&#39;,\n    method: &#39;CONNECT&#39;,\n    path: &#39;www.google.com:80&#39;\n  };\n\n  var req = http.request(options);\n  req.end();\n\n  req.on(&#39;connect&#39;, (res, socket, head) =&gt; {\n    console.log(&#39;got connected!&#39;);\n\n    // make a request over an HTTP tunnel\n    socket.write(&#39;GET / HTTP/1.1\\r\\n&#39; +\n                 &#39;Host: www.google.com:80\\r\\n&#39; +\n                 &#39;Connection: close\\r\\n&#39; +\n                 &#39;\\r\\n&#39;);\n    socket.on(&#39;data&#39;, (chunk) =&gt; {\n      console.log(chunk.toString());\n    });\n    socket.on(&#39;end&#39;, () =&gt; {\n      proxy.close();\n    });\n  });\n});</code></pre>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'continue'",
              "type": "event",
              "name": "continue",
              "desc": "<p><code>function () { }</code>\n\n</p>\n<p>Emitted when the server sends a &#39;100 Continue&#39; HTTP response, usually because\nthe request contained &#39;Expect: 100-continue&#39;. This is an instruction that\nthe client should send the request body.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'response'",
              "type": "event",
              "name": "response",
              "desc": "<p><code>function (response) { }</code>\n\n</p>\n<p>Emitted when a response is received to this request. This event is emitted only\nonce. The <code>response</code> argument will be an instance of [<code>http.IncomingMessage</code>][].\n\n</p>\n<p>Options:\n\n</p>\n<ul>\n<li><code>host</code>: A domain name or IP address of the server to issue the request to.</li>\n<li><code>port</code>: Port of remote server.</li>\n<li><code>socketPath</code>: Unix Domain Socket (use one of host:port or socketPath)</li>\n</ul>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'socket'",
              "type": "event",
              "name": "socket",
              "desc": "<p><code>function (socket) { }</code>\n\n</p>\n<p>Emitted after a socket is assigned to this request.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'upgrade'",
              "type": "event",
              "name": "upgrade",
              "desc": "<p><code>function (response, socket, head) { }</code>\n\n</p>\n<p>Emitted each time a server responds to a request with an upgrade. If this\nevent isn&#39;t being listened for, clients receiving an upgrade header will have\ntheir connections closed.\n\n</p>\n<p>A client server pair that show you how to listen for the <code>&#39;upgrade&#39;</code> event.\n\n</p>\n<pre><code class=\"js\">const http = require(&#39;http&#39;);\n\n// Create an HTTP server\nvar srv = http.createServer( (req, res) =&gt; {\n  res.writeHead(200, {&#39;Content-Type&#39;: &#39;text/plain&#39;});\n  res.end(&#39;okay&#39;);\n});\nsrv.on(&#39;upgrade&#39;, (req, socket, head) =&gt; {\n  socket.write(&#39;HTTP/1.1 101 Web Socket Protocol Handshake\\r\\n&#39; +\n               &#39;Upgrade: WebSocket\\r\\n&#39; +\n               &#39;Connection: Upgrade\\r\\n&#39; +\n               &#39;\\r\\n&#39;);\n\n  socket.pipe(socket); // echo back\n});\n\n// now that server is running\nsrv.listen(1337, &#39;127.0.0.1&#39;, () =&gt; {\n\n  // make a request\n  var options = {\n    port: 1337,\n    hostname: &#39;127.0.0.1&#39;,\n    headers: {\n      &#39;Connection&#39;: &#39;Upgrade&#39;,\n      &#39;Upgrade&#39;: &#39;websocket&#39;\n    }\n  };\n\n  var req = http.request(options);\n  req.end();\n\n  req.on(&#39;upgrade&#39;, (res, socket, upgradeHead) =&gt; {\n    console.log(&#39;got upgraded!&#39;);\n    socket.end();\n    process.exit(0);\n  });\n});</code></pre>\n",
              "params": []
            }
          ],
          "methods": [
            {
              "textRaw": "request.abort()",
              "type": "method",
              "name": "abort",
              "desc": "<p>Marks the request as aborting. Calling this will cause remaining data\nin the response to be dropped and the socket to be destroyed.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "request.end([data][, encoding][, callback])",
              "type": "method",
              "name": "end",
              "desc": "<p>Finishes sending the request. If any parts of the body are\nunsent, it will flush them to the stream. If the request is\nchunked, this will send the terminating <code>&#39;0\\r\\n\\r\\n&#39;</code>.\n\n</p>\n<p>If <code>data</code> is specified, it is equivalent to calling\n[<code>response.write(data, encoding)</code>][] followed by <code>request.end(callback)</code>.\n\n</p>\n<p>If <code>callback</code> is specified, it will be called when the request stream\nis finished.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "data",
                      "optional": true
                    },
                    {
                      "name": "encoding",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "request.flushHeaders()",
              "type": "method",
              "name": "flushHeaders",
              "desc": "<p>Flush the request headers.\n\n</p>\n<p>For efficiency reasons, Node.js normally buffers the request headers until you\ncall <code>request.end()</code> or write the first chunk of request data.  It then tries\nhard to pack the request headers and data into a single TCP packet.\n\n</p>\n<p>That&#39;s usually what you want (it saves a TCP round-trip) but not when the first\ndata isn&#39;t sent until possibly much later.  <code>request.flushHeaders()</code> lets you bypass\nthe optimization and kickstart the request.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "request.setNoDelay([noDelay])",
              "type": "method",
              "name": "setNoDelay",
              "desc": "<p>Once a socket is assigned to this request and is connected\n[<code>socket.setNoDelay()</code>][] will be called.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "noDelay",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "request.setSocketKeepAlive([enable][, initialDelay])",
              "type": "method",
              "name": "setSocketKeepAlive",
              "desc": "<p>Once a socket is assigned to this request and is connected\n[<code>socket.setKeepAlive()</code>][] will be called.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "enable",
                      "optional": true
                    },
                    {
                      "name": "initialDelay",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "request.setTimeout(timeout[, callback])",
              "type": "method",
              "name": "setTimeout",
              "desc": "<p>Once a socket is assigned to this request and is connected\n[<code>socket.setTimeout()</code>][] will be called.\n\n</p>\n<ul>\n<li><code>timeout</code> {Number} Milliseconds before a request is considered to be timed out.</li>\n<li><code>callback</code> {Function} Optional function to be called when a timeout occurs. Same as binding to the <code>timeout</code> event.</li>\n</ul>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "timeout"
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "request.write(chunk[, encoding][, callback])",
              "type": "method",
              "name": "write",
              "desc": "<p>Sends a chunk of the body.  By calling this method\nmany times, the user can stream a request body to a\nserver--in that case it is suggested to use the\n<code>[&#39;Transfer-Encoding&#39;, &#39;chunked&#39;]</code> header line when\ncreating the request.\n\n</p>\n<p>The <code>chunk</code> argument should be a [<code>Buffer</code>][] or a string.\n\n</p>\n<p>The <code>encoding</code> argument is optional and only applies when <code>chunk</code> is a string.\nDefaults to <code>&#39;utf8&#39;</code>.\n\n</p>\n<p>The <code>callback</code> argument is optional and will be called when this chunk of data\nis flushed.\n\n</p>\n<p>Returns <code>request</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "chunk"
                    },
                    {
                      "name": "encoding",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "textRaw": "Class: http.Server",
          "type": "class",
          "name": "http.Server",
          "desc": "<p>This class inherits from [<code>net.Server</code>][] and has the following additional events:\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'checkContinue'",
              "type": "event",
              "name": "checkContinue",
              "desc": "<p><code>function (request, response) { }</code>\n\n</p>\n<p>Emitted each time a request with an http Expect: 100-continue is received.\nIf this event isn&#39;t listened for, the server will automatically respond\nwith a 100 Continue as appropriate.\n\n</p>\n<p>Handling this event involves calling [<code>response.writeContinue()</code>][] if the client\nshould continue to send the request body, or generating an appropriate HTTP\nresponse (e.g., 400 Bad Request) if the client should not continue to send the\nrequest body.\n\n</p>\n<p>Note that when this event is emitted and handled, the <code>&#39;request&#39;</code> event will\nnot be emitted.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'clientError'",
              "type": "event",
              "name": "clientError",
              "desc": "<p><code>function (exception, socket) { }</code>\n\n</p>\n<p>If a client connection emits an <code>&#39;error&#39;</code> event, it will be forwarded here.\n\n</p>\n<p><code>socket</code> is the [<code>net.Socket</code>][] object that the error originated from.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'close'",
              "type": "event",
              "name": "close",
              "desc": "<p><code>function () { }</code>\n\n</p>\n<p>Emitted when the server closes.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'connect'",
              "type": "event",
              "name": "connect",
              "desc": "<p><code>function (request, socket, head) { }</code>\n\n</p>\n<p>Emitted each time a client requests a http <code>CONNECT</code> method. If this event isn&#39;t\nlistened for, then clients requesting a <code>CONNECT</code> method will have their\nconnections closed.\n\n</p>\n<ul>\n<li><code>request</code> is the arguments for the http request, as it is in the request\nevent.</li>\n<li><code>socket</code> is the network socket between the server and client.</li>\n<li><code>head</code> is an instance of Buffer, the first packet of the tunneling stream,\nthis may be empty.</li>\n</ul>\n<p>After this event is emitted, the request&#39;s socket will not have a <code>&#39;data&#39;</code>\nevent listener, meaning you will need to bind to it in order to handle data\nsent to the server on that socket.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'connection'",
              "type": "event",
              "name": "connection",
              "desc": "<p><code>function (socket) { }</code>\n\n</p>\n<p>When a new TCP stream is established. <code>socket</code> is an object of type\n[<code>net.Socket</code>][]. Usually users will not want to access this event. In\nparticular, the socket will not emit <code>&#39;readable&#39;</code> events because of how\nthe protocol parser attaches to the socket. The <code>socket</code> can also be\naccessed at <code>request.connection</code>.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'request'",
              "type": "event",
              "name": "request",
              "desc": "<p><code>function (request, response) { }</code>\n\n</p>\n<p>Emitted each time there is a request. Note that there may be multiple requests\nper connection (in the case of keep-alive connections).\n <code>request</code> is an instance of [<code>http.IncomingMessage</code>][] and <code>response</code> is\nan instance of [<code>http.ServerResponse</code>][].\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'upgrade'",
              "type": "event",
              "name": "upgrade",
              "desc": "<p><code>function (request, socket, head) { }</code>\n\n</p>\n<p>Emitted each time a client requests a http upgrade. If this event isn&#39;t\nlistened for, then clients requesting an upgrade will have their connections\nclosed.\n\n</p>\n<ul>\n<li><code>request</code> is the arguments for the http request, as it is in the request\nevent.</li>\n<li><code>socket</code> is the network socket between the server and client.</li>\n<li><code>head</code> is an instance of Buffer, the first packet of the upgraded stream,\nthis may be empty.</li>\n</ul>\n<p>After this event is emitted, the request&#39;s socket will not have a <code>&#39;data&#39;</code>\nevent listener, meaning you will need to bind to it in order to handle data\nsent to the server on that socket.\n\n</p>\n",
              "params": []
            }
          ],
          "methods": [
            {
              "textRaw": "server.close([callback])",
              "type": "method",
              "name": "close",
              "desc": "<p>Stops the server from accepting new connections.  See [<code>net.Server.close()</code>][].\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "server.listen(handle[, callback])",
              "type": "method",
              "name": "listen",
              "signatures": [
                {
                  "params": [
                    {
                      "textRaw": "`handle` {Object} ",
                      "name": "handle",
                      "type": "Object"
                    },
                    {
                      "textRaw": "`callback` {Function} ",
                      "name": "callback",
                      "type": "Function",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "handle"
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>The <code>handle</code> object can be set to either a server or socket (anything\nwith an underlying <code>_handle</code> member), or a <code>{fd: &lt;n&gt;}</code> object.\n\n</p>\n<p>This will cause the server to accept connections on the specified\nhandle, but it is presumed that the file descriptor or handle has\nalready been bound to a port or domain socket.\n\n</p>\n<p>Listening on a file descriptor is not supported on Windows.\n\n</p>\n<p>This function is asynchronous. The last parameter <code>callback</code> will be added as\na listener for the <code>&#39;listening&#39;</code> event. See also [<code>net.Server.listen()</code>][].\n\n</p>\n<p>Returns <code>server</code>.\n\n</p>\n"
            },
            {
              "textRaw": "server.listen(path[, callback])",
              "type": "method",
              "name": "listen",
              "desc": "<p>Start a UNIX socket server listening for connections on the given <code>path</code>.\n\n</p>\n<p>This function is asynchronous. The last parameter <code>callback</code> will be added as\na listener for the <code>&#39;listening&#39;</code> event.  See also [<code>net.Server.listen(path)</code>][].\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "path"
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "server.listen(port[, hostname][, backlog][, callback])",
              "type": "method",
              "name": "listen",
              "desc": "<p>Begin accepting connections on the specified <code>port</code> and <code>hostname</code>. If the\n<code>hostname</code> is omitted, the server will accept connections on any IPv6 address\n(<code>::</code>) when IPv6 is available, or any IPv4 address (<code>0.0.0.0</code>) otherwise. A\nport value of zero will assign a random port.\n\n</p>\n<p>To listen to a unix socket, supply a filename instead of port and hostname.\n\n</p>\n<p>Backlog is the maximum length of the queue of pending connections.\nThe actual length will be determined by your OS through sysctl settings such as\n<code>tcp_max_syn_backlog</code> and <code>somaxconn</code> on linux. The default value of this\nparameter is 511 (not 512).\n\n</p>\n<p>This function is asynchronous. The last parameter <code>callback</code> will be added as\na listener for the <code>&#39;listening&#39;</code> event.  See also [<code>net.Server.listen(port)</code>][].\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "port"
                    },
                    {
                      "name": "hostname",
                      "optional": true
                    },
                    {
                      "name": "backlog",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "server.setTimeout(msecs, callback)",
              "type": "method",
              "name": "setTimeout",
              "signatures": [
                {
                  "params": [
                    {
                      "textRaw": "`msecs` {Number} ",
                      "name": "msecs",
                      "type": "Number"
                    },
                    {
                      "textRaw": "`callback` {Function} ",
                      "name": "callback",
                      "type": "Function"
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "msecs"
                    },
                    {
                      "name": "callback"
                    }
                  ]
                }
              ],
              "desc": "<p>Sets the timeout value for sockets, and emits a <code>&#39;timeout&#39;</code> event on\nthe Server object, passing the socket as an argument, if a timeout\noccurs.\n\n</p>\n<p>If there is a <code>&#39;timeout&#39;</code> event listener on the Server object, then it\nwill be called with the timed-out socket as an argument.\n\n</p>\n<p>By default, the Server&#39;s timeout value is 2 minutes, and sockets are\ndestroyed automatically if they time out.  However, if you assign a\ncallback to the Server&#39;s <code>&#39;timeout&#39;</code> event, then you are responsible\nfor handling socket timeouts.\n\n</p>\n<p>Returns <code>server</code>.\n\n</p>\n"
            }
          ],
          "properties": [
            {
              "textRaw": "server.listening",
              "name": "listening",
              "desc": "<p>A Boolean indicating whether or not the server is listening for\nconnections.\n\n</p>\n"
            },
            {
              "textRaw": "server.maxHeadersCount",
              "name": "maxHeadersCount",
              "desc": "<p>Limits maximum incoming headers count, equal to 1000 by default. If set to 0 -\nno limit will be applied.\n\n</p>\n"
            },
            {
              "textRaw": "`timeout` {Number} Default = 120000 (2 minutes) ",
              "type": "Number",
              "name": "timeout",
              "desc": "<p>The number of milliseconds of inactivity before a socket is presumed\nto have timed out.\n\n</p>\n<p>Note that the socket timeout logic is set up on connection, so\nchanging this value only affects <em>new</em> connections to the server, not\nany existing connections.\n\n</p>\n<p>Set to 0 to disable any kind of automatic timeout behavior on incoming\nconnections.\n\n</p>\n",
              "shortDesc": "Default = 120000 (2 minutes)"
            }
          ]
        },
        {
          "textRaw": "Class: http.ServerResponse",
          "type": "class",
          "name": "http.ServerResponse",
          "desc": "<p>This object is created internally by a HTTP server--not by the user. It is\npassed as the second parameter to the <code>&#39;request&#39;</code> event.\n\n</p>\n<p>The response implements the [Writable Stream][] interface. This is an\n[<code>EventEmitter</code>][] with the following events:\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'close'",
              "type": "event",
              "name": "close",
              "desc": "<p><code>function () { }</code>\n\n</p>\n<p>Indicates that the underlying connection was terminated before\n[<code>response.end()</code>][] was called or able to flush.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'finish'",
              "type": "event",
              "name": "finish",
              "desc": "<p><code>function () { }</code>\n\n</p>\n<p>Emitted when the response has been sent. More specifically, this event is\nemitted when the last segment of the response headers and body have been\nhanded off to the operating system for transmission over the network. It\ndoes not imply that the client has received anything yet.\n\n</p>\n<p>After this event, no more events will be emitted on the response object.\n\n</p>\n",
              "params": []
            }
          ],
          "methods": [
            {
              "textRaw": "response.addTrailers(headers)",
              "type": "method",
              "name": "addTrailers",
              "desc": "<p>This method adds HTTP trailing headers (a header but at the end of the\nmessage) to the response.\n\n</p>\n<p>Trailers will <strong>only</strong> be emitted if chunked encoding is used for the\nresponse; if it is not (e.g., if the request was HTTP/1.0), they will\nbe silently discarded.\n\n</p>\n<p>Note that HTTP requires the <code>Trailer</code> header to be sent if you intend to\nemit trailers, with a list of the header fields in its value. E.g.,\n\n</p>\n<pre><code class=\"js\">response.writeHead(200, { &#39;Content-Type&#39;: &#39;text/plain&#39;,\n                          &#39;Trailer&#39;: &#39;Content-MD5&#39; });\nresponse.write(fileData);\nresponse.addTrailers({&#39;Content-MD5&#39;: &#39;7895bf4b8828b55ceaf47747b4bca667&#39;});\nresponse.end();</code></pre>\n<p>Attempting to set a header field name or value that contains invalid characters\nwill result in a [<code>TypeError</code>][] being thrown.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "headers"
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "response.end([data][, encoding][, callback])",
              "type": "method",
              "name": "end",
              "desc": "<p>This method signals to the server that all of the response headers and body\nhave been sent; that server should consider this message complete.\nThe method, <code>response.end()</code>, MUST be called on each response.\n\n</p>\n<p>If <code>data</code> is specified, it is equivalent to calling\n[<code>response.write(data, encoding)</code>][] followed by <code>response.end(callback)</code>.\n\n</p>\n<p>If <code>callback</code> is specified, it will be called when the response stream\nis finished.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "data",
                      "optional": true
                    },
                    {
                      "name": "encoding",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "response.getHeader(name)",
              "type": "method",
              "name": "getHeader",
              "desc": "<p>Reads out a header that&#39;s already been queued but not sent to the client.  Note\nthat the name is case insensitive.  This can only be called before headers get\nimplicitly flushed.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">var contentType = response.getHeader(&#39;content-type&#39;);</code></pre>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "name"
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "response.removeHeader(name)",
              "type": "method",
              "name": "removeHeader",
              "desc": "<p>Removes a header that&#39;s queued for implicit sending.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">response.removeHeader(&#39;Content-Encoding&#39;);</code></pre>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "name"
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "response.setHeader(name, value)",
              "type": "method",
              "name": "setHeader",
              "desc": "<p>Sets a single header value for implicit headers.  If this header already exists\nin the to-be-sent headers, its value will be replaced.  Use an array of strings\nhere if you need to send multiple headers with the same name.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">response.setHeader(&#39;Content-Type&#39;, &#39;text/html&#39;);</code></pre>\n<p>or\n\n</p>\n<pre><code class=\"js\">response.setHeader(&#39;Set-Cookie&#39;, [&#39;type=ninja&#39;, &#39;language=javascript&#39;]);</code></pre>\n<p>Attempting to set a header field name or value that contains invalid characters\nwill result in a [<code>TypeError</code>][] being thrown.\n\n</p>\n<p>When headers have been set with [<code>response.setHeader()</code>][], they will be merged with\nany headers passed to [<code>response.writeHead()</code>][], with the headers passed to\n[<code>response.writeHead()</code>][] given precedence.\n\n</p>\n<pre><code class=\"js\">// returns content-type = text/plain\nconst server = http.createServer((req,res) =&gt; {\n  res.setHeader(&#39;Content-Type&#39;, &#39;text/html&#39;);\n  res.setHeader(&#39;X-Foo&#39;, &#39;bar&#39;);\n  res.writeHead(200, {&#39;Content-Type&#39;: &#39;text/plain&#39;});\n  res.end(&#39;ok&#39;);\n});</code></pre>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "name"
                    },
                    {
                      "name": "value"
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "response.setTimeout(msecs, callback)",
              "type": "method",
              "name": "setTimeout",
              "signatures": [
                {
                  "params": [
                    {
                      "textRaw": "`msecs` {Number} ",
                      "name": "msecs",
                      "type": "Number"
                    },
                    {
                      "textRaw": "`callback` {Function} ",
                      "name": "callback",
                      "type": "Function"
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "msecs"
                    },
                    {
                      "name": "callback"
                    }
                  ]
                }
              ],
              "desc": "<p>Sets the Socket&#39;s timeout value to <code>msecs</code>.  If a callback is\nprovided, then it is added as a listener on the <code>&#39;timeout&#39;</code> event on\nthe response object.\n\n</p>\n<p>If no <code>&#39;timeout&#39;</code> listener is added to the request, the response, or\nthe server, then sockets are destroyed when they time out.  If you\nassign a handler on the request, the response, or the server&#39;s\n<code>&#39;timeout&#39;</code> events, then it is your responsibility to handle timed out\nsockets.\n\n</p>\n<p>Returns <code>response</code>.\n\n</p>\n"
            },
            {
              "textRaw": "response.write(chunk[, encoding][, callback])",
              "type": "method",
              "name": "write",
              "desc": "<p>If this method is called and [<code>response.writeHead()</code>][] has not been called,\nit will switch to implicit header mode and flush the implicit headers.\n\n</p>\n<p>This sends a chunk of the response body. This method may\nbe called multiple times to provide successive parts of the body.\n\n</p>\n<p><code>chunk</code> can be a string or a buffer. If <code>chunk</code> is a string,\nthe second parameter specifies how to encode it into a byte stream.\nBy default the <code>encoding</code> is <code>&#39;utf8&#39;</code>. The last parameter <code>callback</code>\nwill be called when this chunk of data is flushed.\n\n</p>\n<p><strong>Note</strong>: This is the raw HTTP body and has nothing to do with\nhigher-level multi-part body encodings that may be used.\n\n</p>\n<p>The first time [<code>response.write()</code>][] is called, it will send the buffered\nheader information and the first body to the client. The second time\n[<code>response.write()</code>][] is called, Node.js assumes you&#39;re going to be streaming\ndata, and sends that separately. That is, the response is buffered up to the\nfirst chunk of body.\n\n</p>\n<p>Returns <code>true</code> if the entire data was flushed successfully to the kernel\nbuffer. Returns <code>false</code> if all or part of the data was queued in user memory.\n<code>&#39;drain&#39;</code> will be emitted when the buffer is free again.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "chunk"
                    },
                    {
                      "name": "encoding",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "response.writeContinue()",
              "type": "method",
              "name": "writeContinue",
              "desc": "<p>Sends a HTTP/1.1 100 Continue message to the client, indicating that\nthe request body should be sent. See the [<code>&#39;checkContinue&#39;</code>][] event on <code>Server</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "response.writeHead(statusCode[, statusMessage][, headers])",
              "type": "method",
              "name": "writeHead",
              "desc": "<p>Sends a response header to the request. The status code is a 3-digit HTTP\nstatus code, like <code>404</code>. The last argument, <code>headers</code>, are the response headers.\nOptionally one can give a human-readable <code>statusMessage</code> as the second\nargument.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">var body = &#39;hello world&#39;;\nresponse.writeHead(200, {\n  &#39;Content-Length&#39;: body.length,\n  &#39;Content-Type&#39;: &#39;text/plain&#39; });</code></pre>\n<p>This method must only be called once on a message and it must\nbe called before [<code>response.end()</code>][] is called.\n\n</p>\n<p>If you call [<code>response.write()</code>][] or [<code>response.end()</code>][] before calling this,\nthe implicit/mutable headers will be calculated and call this function for you.\n\n</p>\n<p>When headers have been set with [<code>response.setHeader()</code>][], they will be merged with\nany headers passed to [<code>response.writeHead()</code>][], with the headers passed to\n[<code>response.writeHead()</code>][] given precedence.\n\n</p>\n<pre><code class=\"js\">// returns content-type = text/plain\nconst server = http.createServer((req,res) =&gt; {\n  res.setHeader(&#39;Content-Type&#39;, &#39;text/html&#39;);\n  res.setHeader(&#39;X-Foo&#39;, &#39;bar&#39;);\n  res.writeHead(200, {&#39;Content-Type&#39;: &#39;text/plain&#39;});\n  res.end(&#39;ok&#39;);\n});</code></pre>\n<p>Note that Content-Length is given in bytes not characters. The above example\nworks because the string <code>&#39;hello world&#39;</code> contains only single byte characters.\nIf the body contains higher coded characters then <code>Buffer.byteLength()</code>\nshould be used to determine the number of bytes in a given encoding.\nAnd Node.js does not check whether Content-Length and the length of the body\nwhich has been transmitted are equal or not.\n\n</p>\n<p>Attempting to set a header field name or value that contains invalid characters\nwill result in a [<code>TypeError</code>][] being thrown.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "statusCode"
                    },
                    {
                      "name": "statusMessage",
                      "optional": true
                    },
                    {
                      "name": "headers",
                      "optional": true
                    }
                  ]
                }
              ]
            }
          ],
          "properties": [
            {
              "textRaw": "response.finished",
              "name": "finished",
              "desc": "<p>Boolean value that indicates whether the response has completed. Starts\nas <code>false</code>. After [<code>response.end()</code>][] executes, the value will be <code>true</code>.\n\n</p>\n"
            },
            {
              "textRaw": "response.headersSent",
              "name": "headersSent",
              "desc": "<p>Boolean (read-only). True if headers were sent, false otherwise.\n\n</p>\n"
            },
            {
              "textRaw": "response.sendDate",
              "name": "sendDate",
              "desc": "<p>When true, the Date header will be automatically generated and sent in\nthe response if it is not already present in the headers. Defaults to true.\n\n</p>\n<p>This should only be disabled for testing; HTTP requires the Date header\nin responses.\n\n</p>\n"
            },
            {
              "textRaw": "response.statusCode",
              "name": "statusCode",
              "desc": "<p>When using implicit headers (not calling [<code>response.writeHead()</code>][] explicitly),\nthis property controls the status code that will be sent to the client when\nthe headers get flushed.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">response.statusCode = 404;</code></pre>\n<p>After response header was sent to the client, this property indicates the\nstatus code which was sent out.\n\n</p>\n"
            },
            {
              "textRaw": "response.statusMessage",
              "name": "statusMessage",
              "desc": "<p>When using implicit headers (not calling [<code>response.writeHead()</code>][] explicitly), this property\ncontrols the status message that will be sent to the client when the headers get\nflushed. If this is left as <code>undefined</code> then the standard message for the status\ncode will be used.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">response.statusMessage = &#39;Not found&#39;;</code></pre>\n<p>After response header was sent to the client, this property indicates the\nstatus message which was sent out.\n\n</p>\n"
            }
          ]
        },
        {
          "textRaw": "Class: http.IncomingMessage",
          "type": "class",
          "name": "http.IncomingMessage",
          "desc": "<p>An <code>IncomingMessage</code> object is created by [<code>http.Server</code>][] or\n[<code>http.ClientRequest</code>][] and passed as the first argument to the <code>&#39;request&#39;</code>\nand <code>&#39;response&#39;</code> event respectively. It may be used to access response status,\nheaders and data.\n\n</p>\n<p>It implements the [Readable Stream][] interface, as well as the\nfollowing additional events, methods, and properties.\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'close'",
              "type": "event",
              "name": "close",
              "desc": "<p><code>function () { }</code>\n\n</p>\n<p>Indicates that the underlying connection was closed.\nJust like <code>&#39;end&#39;</code>, this event occurs only once per response.\n\n</p>\n",
              "params": []
            }
          ],
          "properties": [
            {
              "textRaw": "message.headers",
              "name": "headers",
              "desc": "<p>The request/response headers object.\n\n</p>\n<p>Key-value pairs of header names and values. Header names are lower-cased.\nExample:\n\n</p>\n<pre><code class=\"js\">// Prints something like:\n//\n// { &#39;user-agent&#39;: &#39;curl/7.22.0&#39;,\n//   host: &#39;127.0.0.1:8000&#39;,\n//   accept: &#39;*/*&#39; }\nconsole.log(request.headers);</code></pre>\n<p>Duplicates in raw headers are handled in the following ways, depending on the\nheader name:\n\n</p>\n<ul>\n<li>Duplicates of <code>age</code>, <code>authorization</code>, <code>content-length</code>, <code>content-type</code>,\n<code>etag</code>, <code>expires</code>, <code>from</code>, <code>host</code>, <code>if-modified-since</code>, <code>if-unmodified-since</code>,\n<code>last-modified</code>, <code>location</code>, <code>max-forwards</code>, <code>proxy-authorization</code>, <code>referer</code>,\n<code>retry-after</code>, or <code>user-agent</code> are discarded.</li>\n<li><code>set-cookie</code> is always an array. Duplicates are added to the array.</li>\n<li>For all other headers, the values are joined together with &#39;, &#39;.</li>\n</ul>\n"
            },
            {
              "textRaw": "message.httpVersion",
              "name": "httpVersion",
              "desc": "<p>In case of server request, the HTTP version sent by the client. In the case of\nclient response, the HTTP version of the connected-to server.\nProbably either <code>&#39;1.1&#39;</code> or <code>&#39;1.0&#39;</code>.\n\n</p>\n<p>Also <code>response.httpVersionMajor</code> is the first integer and\n<code>response.httpVersionMinor</code> is the second.\n\n</p>\n"
            },
            {
              "textRaw": "message.method",
              "name": "method",
              "desc": "<p><strong>Only valid for request obtained from [<code>http.Server</code>][].</strong>\n\n</p>\n<p>The request method as a string. Read only. Example:\n<code>&#39;GET&#39;</code>, <code>&#39;DELETE&#39;</code>.\n\n</p>\n"
            },
            {
              "textRaw": "message.rawHeaders",
              "name": "rawHeaders",
              "desc": "<p>The raw request/response headers list exactly as they were received.\n\n</p>\n<p>Note that the keys and values are in the same list.  It is <em>not</em> a\nlist of tuples.  So, the even-numbered offsets are key values, and the\nodd-numbered offsets are the associated values.\n\n</p>\n<p>Header names are not lowercased, and duplicates are not merged.\n\n</p>\n<pre><code class=\"js\">// Prints something like:\n//\n// [ &#39;user-agent&#39;,\n//   &#39;this is invalid because there can be only one&#39;,\n//   &#39;User-Agent&#39;,\n//   &#39;curl/7.22.0&#39;,\n//   &#39;Host&#39;,\n//   &#39;127.0.0.1:8000&#39;,\n//   &#39;ACCEPT&#39;,\n//   &#39;*/*&#39; ]\nconsole.log(request.rawHeaders);</code></pre>\n"
            },
            {
              "textRaw": "message.rawTrailers",
              "name": "rawTrailers",
              "desc": "<p>The raw request/response trailer keys and values exactly as they were\nreceived.  Only populated at the <code>&#39;end&#39;</code> event.\n\n</p>\n"
            },
            {
              "textRaw": "message.statusCode",
              "name": "statusCode",
              "desc": "<p><strong>Only valid for response obtained from [<code>http.ClientRequest</code>][].</strong>\n\n</p>\n<p>The 3-digit HTTP response status code. E.G. <code>404</code>.\n\n</p>\n"
            },
            {
              "textRaw": "message.statusMessage",
              "name": "statusMessage",
              "desc": "<p><strong>Only valid for response obtained from [<code>http.ClientRequest</code>][].</strong>\n\n</p>\n<p>The HTTP response status message (reason phrase). E.G. <code>OK</code> or <code>Internal Server Error</code>.\n\n</p>\n"
            },
            {
              "textRaw": "message.socket",
              "name": "socket",
              "desc": "<p>The [<code>net.Socket</code>][] object associated with the connection.\n\n</p>\n<p>With HTTPS support, use [<code>request.socket.getPeerCertificate()</code>][] to obtain the\nclient&#39;s authentication details.\n\n</p>\n"
            },
            {
              "textRaw": "message.trailers",
              "name": "trailers",
              "desc": "<p>The request/response trailers object. Only populated at the <code>&#39;end&#39;</code> event.\n\n</p>\n"
            },
            {
              "textRaw": "http://npm.taobao.org/mirrors/node/latest/docs/api/message.url",
              "name": "url",
              "desc": "<p><strong>Only valid for request obtained from [<code>http.Server</code>][].</strong>\n\n</p>\n<p>Request URL string. This contains only the URL that is\npresent in the actual HTTP request. If the request is:\n\n</p>\n<pre><code>GET /status?name=ryan HTTP/1.1\\r\\n\nAccept: text/plain\\r\\n\n\\r\\n</code></pre>\n<p>Then <code>request.url</code> will be:\n\n</p>\n<pre><code>&#39;/status?name=ryan&#39;</code></pre>\n<p>If you would like to parse the URL into its parts, you can use\n<code>require(&#39;url&#39;).parse(request.url)</code>.  Example:\n\n</p>\n<pre><code>$ node\n&gt; require(&#39;url&#39;).parse(&#39;/status?name=ryan&#39;)\n{\n  href: &#39;/status?name=ryan&#39;,\n  search: &#39;?name=ryan&#39;,\n  query: &#39;name=ryan&#39;,\n  pathname: &#39;/status&#39;\n}</code></pre>\n<p>If you would like to extract the params from the query string,\nyou can use the <code>require(&#39;querystring&#39;).parse</code> function, or pass\n<code>true</code> as the second argument to <code>require(&#39;url&#39;).parse</code>.  Example:\n\n</p>\n<pre><code>$ node\n&gt; require(&#39;url&#39;).parse(&#39;/status?name=ryan&#39;, true)\n{\n  href: &#39;/status?name=ryan&#39;,\n  search: &#39;?name=ryan&#39;,\n  query: {name: &#39;ryan&#39;},\n  pathname: &#39;/status&#39;\n}</code></pre>\n"
            }
          ],
          "methods": [
            {
              "textRaw": "message.setTimeout(msecs, callback)",
              "type": "method",
              "name": "setTimeout",
              "signatures": [
                {
                  "params": [
                    {
                      "textRaw": "`msecs` {Number} ",
                      "name": "msecs",
                      "type": "Number"
                    },
                    {
                      "textRaw": "`callback` {Function} ",
                      "name": "callback",
                      "type": "Function"
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "msecs"
                    },
                    {
                      "name": "callback"
                    }
                  ]
                }
              ],
              "desc": "<p>Calls <code>message.connection.setTimeout(msecs, callback)</code>.\n\n</p>\n<p>Returns <code>message</code>.\n\n</p>\n"
            }
          ]
        }
      ],
      "properties": [
        {
          "textRaw": "`METHODS` {Array} ",
          "type": "Array",
          "name": "METHODS",
          "desc": "<p>A list of the HTTP methods that are supported by the parser.\n\n</p>\n"
        },
        {
          "textRaw": "`STATUS_CODES` {Object} ",
          "type": "Object",
          "name": "STATUS_CODES",
          "desc": "<p>A collection of all the standard HTTP response status codes, and the\nshort description of each.  For example, <code>http.STATUS_CODES[404] === &#39;Not\nFound&#39;</code>.\n\n</p>\n"
        },
        {
          "textRaw": "http.globalAgent",
          "name": "globalAgent",
          "desc": "<p>Global instance of Agent which is used as the default for all http client\nrequests.\n\n</p>\n"
        }
      ],
      "methods": [
        {
          "textRaw": "http.createClient([port][, host])",
          "type": "method",
          "name": "createClient",
          "stability": 0,
          "stabilityText": "Deprecated: Use [`http.request()`][] instead.",
          "desc": "<p>Constructs a new HTTP client. <code>port</code> and <code>host</code> refer to the server to be\nconnected to.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "port",
                  "optional": true
                },
                {
                  "name": "host",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "http.createServer([requestListener])",
          "type": "method",
          "name": "createServer",
          "desc": "<p>Returns a new instance of [<code>http.Server</code>][].\n\n</p>\n<p>The <code>requestListener</code> is a function which is automatically\nadded to the <code>&#39;request&#39;</code> event.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "requestListener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "http.get(options[, callback])",
          "type": "method",
          "name": "get",
          "desc": "<p>Since most requests are GET requests without bodies, Node.js provides this\nconvenience method. The only difference between this method and [<code>http.request()</code>][]\nis that it sets the method to GET and calls <code>req.end()</code> automatically.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">http.get(&#39;http://www.google.com/index.html&#39;, (res) =&gt; {\n  console.log(`Got response: ${res.statusCode}`);\n  // consume response body\n  res.resume();\n}).on(&#39;error&#39;, (e) =&gt; {\n  console.log(`Got error: ${e.message}`);\n});</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "options"
                },
                {
                  "name": "callback",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "http.request(options[, callback])",
          "type": "method",
          "name": "request",
          "desc": "<p>Node.js maintains several connections per server to make HTTP requests.\nThis function allows one to transparently issue requests.\n\n</p>\n<p><code>options</code> can be an object or a string. If <code>options</code> is a string, it is\nautomatically parsed with [<code>url.parse()</code>][].\n\n</p>\n<p>Options:\n\n</p>\n<ul>\n<li><code>protocol</code>: Protocol to use. Defaults to <code>&#39;http:&#39;</code>.</li>\n<li><code>host</code>: A domain name or IP address of the server to issue the request to.\nDefaults to <code>&#39;localhost&#39;</code>.</li>\n<li><code>hostname</code>: Alias for <code>host</code>. To support [<code>url.parse()</code>][] <code>hostname</code> is\npreferred over <code>host</code>.</li>\n<li><code>family</code>: IP address family to use when resolving <code>host</code> and <code>hostname</code>.\nValid values are <code>4</code> or <code>6</code>. When unspecified, both IP v4 and v6 will be\nused.</li>\n<li><code>port</code>: Port of remote server. Defaults to 80.</li>\n<li><code>localAddress</code>: Local interface to bind for network connections.</li>\n<li><code>socketPath</code>: Unix Domain Socket (use one of host:port or socketPath).</li>\n<li><code>method</code>: A string specifying the HTTP request method. Defaults to <code>&#39;GET&#39;</code>.</li>\n<li><code>path</code>: Request path. Defaults to <code>&#39;/&#39;</code>. Should include query string if any.\nE.G. <code>&#39;/index.html?page=12&#39;</code>. An exception is thrown when the request path\ncontains illegal characters. Currently, only spaces are rejected but that\nmay change in the future.</li>\n<li><code>headers</code>: An object containing request headers.</li>\n<li><code>auth</code>: Basic authentication i.e. <code>&#39;user:password&#39;</code> to compute an\nAuthorization header.</li>\n<li><code>agent</code>: Controls [<code>Agent</code>][] behavior. When an Agent is used request will\ndefault to <code>Connection: keep-alive</code>. Possible values:<ul>\n<li><code>undefined</code> (default): use [<code>http.globalAgent</code>][] for this host and port.</li>\n<li><code>Agent</code> object: explicitly use the passed in <code>Agent</code>.</li>\n<li><code>false</code>: opts out of connection pooling with an Agent, defaults request to\n<code>Connection: close</code>.</li>\n</ul>\n</li>\n<li><code>createConnection</code>: A function that produces a socket/stream to use for the\nrequest when the <code>agent</code> option is not used. This can be used to avoid\ncreating a custom Agent class just to override the default <code>createConnection</code>\nfunction. See [<code>agent.createConnection()</code>][] for more details.</li>\n</ul>\n<p>The optional <code>callback</code> parameter will be added as a one time listener for\nthe <code>&#39;response&#39;</code> event.\n\n</p>\n<p><code>http.request()</code> returns an instance of the [<code>http.ClientRequest</code>][]\nclass. The <code>ClientRequest</code> instance is a writable stream. If one needs to\nupload a file with a POST request, then write to the <code>ClientRequest</code> object.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">var postData = querystring.stringify({\n  &#39;msg&#39; : &#39;Hello World!&#39;\n});\n\nvar options = {\n  hostname: &#39;www.google.com&#39;,\n  port: 80,\n  path: &#39;/upload&#39;,\n  method: &#39;POST&#39;,\n  headers: {\n    &#39;Content-Type&#39;: &#39;application/x-www-form-urlencoded&#39;,\n    &#39;Content-Length&#39;: postData.length\n  }\n};\n\nvar req = http.request(options, (res) =&gt; {\n  console.log(`STATUS: ${res.statusCode}`);\n  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);\n  res.setEncoding(&#39;utf8&#39;);\n  res.on(&#39;data&#39;, (chunk) =&gt; {\n    console.log(`BODY: ${chunk}`);\n  });\n  res.on(&#39;end&#39;, () =&gt; {\n    console.log(&#39;No more data in response.&#39;)\n  })\n});\n\nreq.on(&#39;error&#39;, (e) =&gt; {\n  console.log(`problem with request: ${e.message}`);\n});\n\n// write data to request body\nreq.write(postData);\nreq.end();</code></pre>\n<p>Note that in the example <code>req.end()</code> was called. With <code>http.request()</code> one\nmust always call <code>req.end()</code> to signify that you&#39;re done with the request -\neven if there is no data being written to the request body.\n\n</p>\n<p>If any error is encountered during the request (be that with DNS resolution,\nTCP level errors, or actual HTTP parse errors) an <code>&#39;error&#39;</code> event is emitted\non the returned request object. As with all <code>&#39;error&#39;</code> events, if no listeners\nare registered the error will be thrown.\n\n</p>\n<p>There are a few special headers that should be noted.\n\n</p>\n<ul>\n<li><p>Sending a &#39;Connection: keep-alive&#39; will notify Node.js that the connection to\nthe server should be persisted until the next request.</p>\n</li>\n<li><p>Sending a &#39;Content-length&#39; header will disable the default chunked encoding.</p>\n</li>\n<li><p>Sending an &#39;Expect&#39; header will immediately send the request headers.\nUsually, when sending &#39;Expect: 100-continue&#39;, you should both set a timeout\nand listen for the <code>&#39;continue&#39;</code> event. See RFC2616 Section 8.2.3 for more\ninformation.</p>\n</li>\n<li><p>Sending an Authorization header will override using the <code>auth</code> option\nto compute basic authentication.</p>\n</li>\n</ul>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "options"
                },
                {
                  "name": "callback",
                  "optional": true
                }
              ]
            }
          ]
        }
      ],
      "type": "module",
      "displayName": "HTTP"
    }
  ]
}
