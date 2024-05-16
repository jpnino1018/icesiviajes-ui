import {request} from "./BackendService.tsx";
class ServiceClient{

    createAClient(idTiid,identificationNumber,name,firstLastName,secondLastName,phone1,email,gender,birthdate,creationDate,creatorUser){
        return request('POST','api/v1/client/save',{idTiid:idTiid ,identificationNumber: identificationNumber, name: name,firstLastName: firstLastName, secondLastName: secondLastName, phone1: phone1, email: email, status: 'A',gender: 'M', birthDate: birthdate, creationDate: creationDate, creatorUser: creatorUser}).then((response => response.data));
    }


}
export default new ServiceClient(); 