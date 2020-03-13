function OpenweathermapBuilder(key) {
    var queryStringParams;
    var baseApiUrl;

    baseApiUrl = 'http://api.openweathermap.org/data/2.5/weather';
    queryStringParams = [];
    
    addParam('appid', key);
    
    function init() {
        
    }
    
    function addParam(key, val) {
        queryStringParams.push(key + '=' + val.replace(' ', '%20'));
    }

    function appendQuery(q) {
        addParam('q', q);
    }
    function appendUnits(units) {
        queryStringParams.push('units=' + units);
    }

    function appendLang(lang) {
        queryStringParams.push('lang=' + lang);
    }

    function appendMode(mode) {
        queryStringParams.push('mode=' + mode);
    }

    function build() {
        let params =  queryStringParams.join('&');
        queryStringParams.length = 0;
        addParam('appid', key);
    
        return baseApiUrl + '?' + params;
    }

    return {
        addParam: addParam,
        appendQuery: appendQuery,
        appendLang: appendLang,
        appendUnits: appendUnits,
        appendMode: appendMode,
        build:build 
    }
}