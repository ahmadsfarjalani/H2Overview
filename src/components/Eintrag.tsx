import { EintragResource } from "../Resources";

export function Eintrag(props: {eintrag: EintragResource})
    {
        const eintrag = props.eintrag
    return (
        <>
        <h2>
            {eintrag.erstellerName} Eintrag
        </h2>
        <p>
            Getränk {eintrag.getraenk}
        </p>
        <p>
            Menge {eintrag.menge}
        </p>
        <p>
            Kommentar {eintrag.kommentar}
        </p>
        <p>
            Ersteller {eintrag.ersteller}
        </p>
        <p>
            Ersteller Name {eintrag.erstellerName}
        </p>
        <p>
            Created At {eintrag.createdAt}
        </p>
        <p>
            Protokoll {eintrag.protokoll}
        </p>
    </>
    )


}


