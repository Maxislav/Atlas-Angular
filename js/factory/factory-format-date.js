app.factory('factoryFormatDate', function () {

    function stringToGetTime(string, offset) {
        offset && (offset = parseFloat(offset));
        var arr = ('' + string).split('');
        var yy = '' + arr[0] + arr[1];
        var mm = '' + arr[2] + arr[3];
        mm = parseFloat(mm);
        mm--;
        var dd = '' + arr[4] + arr[5];
        var hh = '' + arr[6] + arr[7];
        hh = parseFloat(hh) + (offset ? offset : 0);
        var mi = '' + arr[8] + arr[9];
        var ss = '' + arr[10] + arr[11];
        var date = new Date('20' + yy, mm, dd, hh, mi, ss);
        return date.getTime();
    }

    function difTime(date){


    }


    return {
        stringToGetTime: stringToGetTime
    }
})
