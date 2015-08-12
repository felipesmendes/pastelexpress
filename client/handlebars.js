Handlebars.registerHelper('arrayify',function(obj){
    result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});
Template.registerHelper('toFixed', function (originalData , length) {
    // Format the original data
    return originalData.toFixed(length);
});
