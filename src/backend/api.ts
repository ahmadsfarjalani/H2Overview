import { EintragResource, LoginResource, ProtokollResource } from "../Resources";
import { Eintrag } from "../components/Eintrag";
import { LoginInfo } from "../components/LoginManager";
import { fetchWithErrorHandling } from "./fetchWithErrorHandling";
import { eintraege } from "./testdata";
export let id : any;

export async function getAlleProtokolle(): Promise<ProtokollResource[]> {
    
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/alle`;
    const response = await fetchWithErrorHandling(url, {
        credentials: 'include' as RequestCredentials,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const loadedData = await response.json();
    return loadedData;
}

export async function getProtokoll(protokollId:string): Promise<ProtokollResource> {
    const response = await fetchWithErrorHandling(`${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/${protokollId}`,
    {credentials: "include" as RequestCredentials});
    const loadedData = await response.json();
    return loadedData;
}

export async function getAlleEintraege (protokollId:string): Promise<EintragResource[]> {
    const response = await fetchWithErrorHandling(`${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/${protokollId}/eintraege`,
    {credentials: "include" as RequestCredentials});
    const loadedData = await response.json();
    return loadedData;
}

export async function getEintrag(eintragId: string): Promise<EintragResource> {
    const response = await fetchWithErrorHandling(`${process.env.REACT_APP_API_SERVER_URL}/api/eintrag/${eintragId}`,
    {credentials: "include" as RequestCredentials});
    const loadedData = await response.json();
    return loadedData;
}

export async function postLogin(benutzername: string, passwort: string): Promise<LoginResource> {

    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/login/`;
    const response = await fetchWithErrorHandling(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name : benutzername , password:passwort}),
        credentials: "include" as RequestCredentials    });

    let i = await response.json();
    if (i) {
        id = i.id
        console.log(id)
    }
    return i;
}


export async function loginstatus(): Promise<LoginInfo | false>   {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/login/`;

    const response = await fetchWithErrorHandling(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        "Content-Type": "application/json"
        },
        credentials: "include" as RequestCredentials    });
        const responseKheir = await response.json()

        if(responseKheir){
            id = responseKheir.id;
        }
    return responseKheir;
}

export async function logout() {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/login`;

    const response = await fetchWithErrorHandling(url, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
        "Content-Type": "application/json"
        },
        credentials: "include" as RequestCredentials    });

};

export async function createProtokoll(protokollDaten : ProtokollResource) {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/`;

    const response = await fetchWithErrorHandling(url, {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(protokollDaten),
            credentials: "include" as RequestCredentials
    });

    return await response.json(); 
}


export async function updateProtokoll(protokollDaten: ProtokollResource) {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/${protokollDaten.id}`;
  
    const response = await fetchWithErrorHandling(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"

      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify(protokollDaten),
    });
  
    return await response.json(); 
  }
  
  export async function deleteProtokoll(id : string) {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/${id}`;
  
    const response = await fetchWithErrorHandling(url, {
      method: "DELETE",
      credentials: "include" as RequestCredentials
    });
  
    }
  
  
    export async function createEintrag(EintragDaten : EintragResource) {
        const url = `${process.env.REACT_APP_API_SERVER_URL}/api/eintrag/`;
        console.log("ICH BIN DABEI " + EintragDaten.ersteller)
        const response = await fetchWithErrorHandling(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
        
              },
                body: JSON.stringify(EintragDaten),
                credentials: "include" as RequestCredentials
        });
    
        return await response.json(); 
    }


    export async function updateEintrag(EintragDaten: EintragResource) {
        const url = `${process.env.REACT_APP_API_SERVER_URL}/api/eintrag/${EintragDaten.id}`;
      
        const response = await fetchWithErrorHandling(url, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
    
          },
          credentials: "include" as RequestCredentials,
          body: JSON.stringify(EintragDaten),
        });
      
        return await response.json(); 
      }



      export async function deleteEintrag(id : string) {
        const url = `${process.env.REACT_APP_API_SERVER_URL}/api/eintrag/${id}`;
      
        const response = await fetchWithErrorHandling(url, {
          method: "DELETE",
          credentials: "include" as RequestCredentials
        });
      
        }