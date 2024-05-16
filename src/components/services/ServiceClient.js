import {request} from "./BackendService.tsx";
import { getAuthToken } from "./BackendService.tsx";
import axios from 'axios'
class ServiceClient{

    async createAClient(idTiid,identificationNumber,name,firstLastName,secondLastName,phone1,email,gender,birthdate,creationDate,creatorUser){
        /*return request('POST','api/v1/client/save',{idTiid:idTiid ,identificationNumber: identificationNumber, name: name,firstLastName: firstLastName, secondLastName: secondLastName, phone1: phone1, email: email, status: 'A',gender: 'M', birthDate: birthdate, creationDate: creationDate, creatorUser: creatorUser}).then((response => response.data));*/
        const config = {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        }
        
        
        return await axios.post('http://localhost:9091/api/v1/client/save',
        {idClie: 34, identificationNumber: identificationNumber,firstLastName: firstLastName, secondLastName: secondLastName, name: name, phone1: phone1, phone2: "3133245676", email: email,gender: 'M', birthdate: birthdate, creationDate: creationDate, modificationDate: '', creatorUser: creatorUser, modifierUser: 'admin', status: 'A', idTiid:2 },
        config)
    }


}
export default new ServiceClient(); 