import { EintragResource, LoginResource, ProtokollResource } from "../Resources";
import { LoginInfo } from "../components/LoginManager";
import { fetchWithErrorHandling } from "./fetchWithErrorHandling";

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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name : benutzername , password:passwort}),
        credentials: "include" as RequestCredentials    });

    return await response.json();
}


export async function loginstatus(): Promise<LoginInfo | false>   {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/login/`;

    const response = await fetchWithErrorHandling(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        },
        credentials: "include" as RequestCredentials    });

    return await response.json();
}



export async function logout() {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/login`;

    const response = await fetchWithErrorHandling(url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json'
        },
        credentials: "include" as RequestCredentials    });

};





