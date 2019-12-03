var fs = require('fs');

function loadData() {
    var file_data =fs.readFileSync('property_data.json');
    return file_data==""?"":JSON.parse(file_data);
    //return JSON.parse(fs.readFileSync('property_data.json'));

}

function saveData(data) {
    // poke.json stores the pokemon array under key "pokemon",
    // so we are recreating the same structure with this object
    var obj = {
        property_posts: data
    };

    fs.writeFileSync('property_data.json', JSON.stringify(obj));
}

function getMaxId(data) {
    var tempid =0
    if(data){
        for(var i = 0; i < data.length; i++) {
            if(data[i].id>tempid){
                tempid=data[i].id;
            }
        }
    }
    return tempid;
}

function getDetailById(id,data){
    for(var i = 0; i < data.length; i++) {
        if(data[i].id==id){
            return data[i];
        }
    }
    return "";
}

function getPropertyByType(type,data){
    var propertyList=[];
    for(var i = 0; i < data.length; i++) {
        if(data[i].type==type){
            propertyList.push(data[i]);
        }
    }
    return propertyList;
}

function getPropertyByPurpose(purpose,data){
    var propertyList=[];
    for(var i = 0; i < data.length; i++) {
        if(data[i].purpose==purpose){
            propertyList.push(data[i]);
        }
    }
    return propertyList;
}
function searchByZip() {
    data =loadData()
    var input =  $("#searchbar").val();
    input=input.toLowerCase();
    var x = $(".property_info")
    if(input){
        for(var i = 0; i <  data.length; i++) {
            if(!data[i].zip.includes(input)){
                var content=$("#"+data[i].id.toString())
                content.style.display="none";
            }
        }
    }else{
        for(var i = 0; i < data.length; i++) {
            var content=$("#"+data[i].id.toString())
            content.style.display="true";
        }
    }
}
module.exports = {
    loadData: loadData,
    saveData: saveData,
    getMaxId: getMaxId,
    getDetailById: getDetailById,
    getPropertyByType: getPropertyByType,
    getPropertyByPurpose: getPropertyByPurpose,
    searchByZip: searchByZip
}
