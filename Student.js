var jpdbBaseURL = "http://api.login2explore.com:5577";
        var jpdbIRL = "/api/irl";
        var jpdbIMl = "/api/iml ";
        var DBName = "Student";
        var RelationName = "StudentRel";
        var connToken = "90932264|-31949270916674963|90954432";
        
        function validate() 
        {
        var Id = $("#Id").val();
                if (Id === "") {
        alert("Enter your Roll No.");
                $("#Id").focus();
                return "";
        }
        var name = $("#name").val();
                if (name === "") {
        alert("Enter your full name");
                $("#name").focus();
                return "";
        }
        var stdclass = $("#stdclass").val();
                if (stdclass === "") {
        alert("Enter your class");
                $("#stdclass").focus();
                return "";
        }
        var dob = $("#dob").val();
                if (dob === "") {
        alert("Enter your date of birth");
                $("#dob").focus();
                return "";
        }
        var address = $("#address").val();
                if (address === "") {
        alert("Enter your address");
                $("#address").focus();
                return "";
        }
        var enrollmentdate = $("#enrollmentdate").val();
                if (enrollmentdate === "") {
        alert("Enter date of enrollment");
                $("#enrollmentdate").focus();
                return "";
        }
        var jsonStrObj = {
                id: Id,
                name: name,
                stcdlass: stdclass,
                dob: dob,
                address:address,
                enrollmentdate:enrollmentdate
        };
                return JSON.stringify(jsonStrObj);
     }

function resetForm() {
$("#Id").val("");
        $("#name").val("");
        $("#class").val("");
        $("#dob").val("");
        $("#address").val("");
        $("#enrollmentdate").val("");
        $("#Id").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#update").prop("disabled", true);
        $("#reset").prop("disabled", true);
        $("#Id").focus();
}

function saveData() {
var jsonStrObj = validate();
        if (jsonStrObj === ""){
return"";
        }
var putRequest = createPUTRequest(connToken, jsonStrObj, Student, StudentRel);
        jQuery.ajaxSetup({async:false});
        var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML)
        jQuesry.ajaxSetup({async:true});
        resetForm();
        $("#Id").focus;
}

function updateData(){
$("update").prop("disabled", true);
        jsonUpdate = validate();
        var updateRequest = createUPDATERcordRequest(connToken, jsonUpdate, Student, StudentRel, localStorage.getItem("recno"));
        jQuery.ajaxSetup({async:false});
        var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
        jQuery.ajaxSetup({async:true});
        console.log(resJsonObj);
        resetForm();
        $("Id").focus;
        }

function getStd(){
var IdJsonObj = getIdAsJsonObj();
        var getRequest = createGET_BY_KEYRequest(connToken, Student, StudentRel, IdJsonObj);
        jQuery.ajaxSetup({async:false});
        var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
        jQuery.ajaxSetup({async:true});
        if (resJsonObj.status === 400)
        {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#Id").focus();
        }      
        else if (resJsonObj.status === 200)
        {
        $("#Id").prop("disabled", true);
        fillData(resJsonObj);
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#Id").focus();
      }

}

function getIdAsJsonObj() {
        var id = $("#Id").val();
        var jsonStr = {
        Id: id
        };
        return JSON.stringify(jsonStr);
}

function saveRecNo2LS(jsonObj) {
var lvData = JSON.parse(jsonObj.data);
        localStorage.setItem("recno", lvData.rec_no);
}

function fillData(jsonObj) {
saveRecNo2LS(jsonObj);
        var record = JSON.parse(jsonObj.data).record;
        $("#name").val(data.name);
        $("#class").val(data.class);
        $("#dob").val(data.dob);
        $("#address").val(data.address);
        $("#enrollmentdate").val(data.enrollmentdate);
}
