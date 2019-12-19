L.UGeoJSONLayer = L.GeoJSON.extend({
    options: {
        debug: false,
        light: true,
        usebbox: true,
        endpoint: "-1",
        parameters: {},
        headers: {},
        maxRequests: 5,
        pollTime: 0,
        once: false,
        enctype: "urlencoded", //"form-data", //urlencoded || form-data || json
        afterFetch: function () {},
        after: function (data) {}
    },

    callback: function (data) {
        if (this.options.light) {
            this.clearLayers(); //if needed, we clean the layers
        }

        //Then we add the new data
        this.addData(data);
        this.options.after(data);
    },

    initialize: function (uOptions, options) {
        L.GeoJSON.prototype.initialize.call(this, undefined, options);
        L.Util.setOptions(this, uOptions);

        this._layersOld = [];
        this._requests = [];
    },

    onMoveEnd: function () {
        if (this.options.debug) {
            console.debug("load Data");
        }

        while (this._requests.length > this.options.maxRequests) //This allows to stop the oldest requests
        {
            this._requests.shift().abort();
        }

        var postData = {};

        for (var k in this.options.parameters) {
            if (this.options.parameters[k].scope != undefined) {
                postData[k] = this.options.parameters[k].scope[k];
            } else {
                if (typeof (postData[k] = this.options.parameters[k]) == "function")
                    postData[k] = this.options.parameters[k]();
                else {
                    postData[k] = this.options.parameters[k];
                }
            }
        }

        var bounds = this._map.getBounds();
        var url = new URL(this.options.endpoint);
        var cql_filter = url.searchParams.get("cql_filter");

        if (this.options.usebbox) {
            if (cql_filter === null) {
                postData.bbox = bounds.toBBoxString();
            } else {
                var cql_filter_List = cql_filter.split(" and ");
                var bbox = "BBOX(geom," + bounds.toBBoxString() + ")";
                for (var i = 0; i < cql_filter_List.length; i++) {
                    var every_cql_filter = cql_filter_List[i];
                    if (every_cql_filter.toString().indexOf("BBOX") != -1) {
                        cql_filter_List[i] = bbox;
                    }
                }

                var new_cql_filter = cql_filter_List.join(" and ");
                if (new_cql_filter.indexOf("BBOX") == -1)
                    new_cql_filter = new_cql_filter + " and " + bbox;
                url.searchParams.set('cql_filter', new_cql_filter);
                this.options.endpoint = url;
            }
        } else {
            postData.south = bounds.getSouth();
            postData.north = bounds.getNorth();
            postData.east = bounds.getEast();
            postData.west = bounds.getWest();
        }

        postData.zoom = this._map.getZoom();
        var currentZoom = this._map.getZoom();
        var processesRequest = true;

        if (this.options.minZoom && currentZoom < this.options.minZoom) {
            processesRequest = false;
        }
        if (this.options.maxZoom && currentZoom > this.options.maxZoom) {
            processesRequest = false;
        }

        var self = this;
        var request = new XMLHttpRequest();
        request.open("GET", this.options.endpoint, true);
        for (var k in this.options.headers) {
            if (this.options.headers[k].scope != undefined) {
                request.setRequestHeader(k, this.options.headers[k].scope[k]);
            } else {
                request.setRequestHeader(k, this.options.headers[k]);
            }
        }

        request.onload = function () {
            for (var i in self._requests) {
                if (self._requests[i] === request) {
                    self._requests.splice(i, 1); //We remove the request from the list of currently running requests.
                    break;
                }
            }

            if (this.status >= 200 && this.status < 400) {
                self.options.afterFetch();
                self.callback(JSON.parse(this.responseText));
            }
        };

        this._requests.push(request);
        if (processesRequest) {
            if (this.options.enctype == "urlencoded" || this.options.enctype == "json") {
                if (this.options.enctype == "urlencoded") {
                    // urlencoded request
                    var urlencoded = "";
                    for (var p in postData) {
                        if (urlencoded.length > 0) urlencoded += "&";
                        urlencoded += encodeURIComponent(p) + "=" + encodeURIComponent(postData[p]);
                    }
                    var url = this.options.endpoint + "&" + urlencoded;

                    request.open("GET", url, true);
                    request.send(urlencoded);
                } else {
                    // json request
                    request.send(JSON.stringify(postData));
                }

            } else {
                var postFormData = new FormData();
                for (var p in postData) {
                    postFormData.append(p, postData[p]);
                }
                request.send(postFormData);
            }
        } else {
            this.clearLayers();
        }
    },

    onAdd: function (map) {
        this._map = map;

        if (this.options.endpoint != undefined && this.options.endpoint != "-1") {
            this.onMoveEnd();

            if (!this.options.once) {
                map.on('dragend', this.onMoveEnd, this);
                map.on('zoomend', this.onMoveEnd, this);
                map.on("refresh", this.onMoveEnd, this);

                if (this.options.pollTime > 0) {
                    this.intervalID = window.setInterval(this.onMoveEnd.bind(this), this.options.pollTime);
                }
            }
        }

        if (this.options.debug) {
            console.debug("add layer");
        }
    },

    onRemove: function (map) {
        if (this.options.debug) {
            console.debug("remove layer");
        }
        L.LayerGroup.prototype.onRemove.call(this, map);

        if (!this.options.once && this.options.pollTime > 0) {
            window.clearInterval(this.intervalID);
        }

        while (this._requests.length > 0) {
            this._requests.shift().abort();
        }

        if (!this.options.once) {
            map.off({
                'dragend': this.onMoveEnd
            }, this);
            map.off({
                'zoomend': this.onMoveEnd
            }, this);
            map.off({
                'refresh': this.onMoveEnd
            }, this);
        }

        this._map = null;
    }

});

L.uGeoJSONLayer = function (uOptions, options) {
    return new L.UGeoJSONLayer(uOptions, options);
};