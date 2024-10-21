#![allow(unused)]

pub mod utils;
use utils::json_to_materia::{inizializza_file_materie, leggi_materie_da_file, ottieni_materie, ottieni_materie_json, salva_materie};
use utils::structures::{Argomento, Materia};

#[tauri::command]
fn inserisci_argomento(materia: String, nome: String, descrizione: String, collegamenti: String, voto:String) -> Result<(), String> {

    if let Err(e) = inizializza_file_materie() {
        println!("Errore durante l'inizializzazione del file materie.json: {}", e);
    }

    let mut materie = match ottieni_materie() {
        Ok(materie) => materie,
        Err(_) => return Err("Errore durante l'ottenimento delle materie".into()),
    };
    
    let argomento = Argomento::new(nome, materia, descrizione, collegamenti, voto.parse().unwrap());
    let materia_lowercase = argomento.materia.as_str().trim().to_lowercase();
    
    let indice_materia = match materia_lowercase.as_str() {
        "arte" => 0,
        "filosofia" => 1,
        "fisica" => 2,
        "inglese" => 3,
        "italiano" => 4,
        "latino" => 5,
        "matematica" => 6,
        "scienze" => 7,
        "storia" => 8,
        _ => return Err(format!("Materia sconosciuta: {}", argomento.materia)),
    };
    
    materie[indice_materia].aggiungi_argomento(argomento).unwrap();
    salva_materie(materie).map_err(|_| "Errore durante il salvataggio delle materie".into())

}

#[tauri::command]
fn modifica_argomento(materia: String, nome: String, descrizione: String, collegamenti: String, voto: String) -> Result<(), String> {
    // Inizializzazione file materie.json
    if let Err(e) = inizializza_file_materie() {
        return Err(format!("Errore durante l'inizializzazione del file materie.json: {}", e));
    }

    // Ottieni le materie
    let mut materie = match ottieni_materie() {
        Ok(materie) => materie,
        Err(_) => return Err("Errore durante l'ottenimento delle materie".into()),
    };

    let materia_lowercase = materia.trim().to_lowercase();

    // Trova l'indice della materia
    let indice_materia = match materia_lowercase.as_str() {
        "arte" => 0,
        "filosofia" => 1,
        "fisica" => 2,
        "inglese" => 3,
        "italiano" => 4,
        "latino" => 5,
        "matematica" => 6,
        "scienze" => 7,
        "storia" => 8,
        _ => return Err(format!("Materia sconosciuta: {}", materia)),
    };

    // Funzione per modificare l'argomento
    let  modifica_argomento = |argomenti: &mut Vec<Argomento>| {
        for argomento in argomenti.iter_mut() {
            if argomento.nome.to_lowercase() == nome.to_lowercase() {
                if !descrizione.is_empty() {
                    argomento.descrizione = descrizione.clone();
                }
                if !collegamenti.is_empty() {
                    argomento.collegamenti = collegamenti.clone();
                }
                if !voto.is_empty() {
                    argomento.voto = voto.parse().unwrap();
                }
                argomento.nome = nome.clone();
                return Ok(());
            }
        }
        Err(format!("Argomento '{}' non trovato nella materia '{}'", nome, materia))
    };

    // Modifica l'argomento nella materia giusta
    let risultato = match &mut materie[indice_materia] {
        Materia::Arte { argomenti }
        | Materia::Filosofia { argomenti }
        | Materia::Fisica { argomenti }
        | Materia::Inglese { argomenti }
        | Materia::Italiano { argomenti }
        | Materia::Latino { argomenti }
        | Materia::Matematica { argomenti }
        | Materia::Scienze { argomenti }
        | Materia::Storia { argomenti } => modifica_argomento(argomenti),
    };

    // Controlla se c'è stato un errore durante la modifica
    risultato?;

    // Salva le materie aggiornate nel file JSON
    if let Err(e) = salva_materie(materie) {
        return Err(format!("Errore durante il salvataggio delle materie: {}", e));
    }
    Ok(())
}


#[tauri::command]
fn elimina_argomento(materia: String, nome: String) -> Result<(), String> {
    // Inizializzazione file materie.json
    if let Err(e) = inizializza_file_materie() {
        return Err(format!("Errore durante l'inizializzazione del file materie.json: {}", e));
    }

    // Ottieni le materie
    let mut materie = match ottieni_materie() {
        Ok(materie) => materie,
        Err(_) => return Err("Errore durante l'ottenimento delle materie".into()),
    };

    let materia_lowercase = materia.trim().to_lowercase();

    let indice_materia = match materia_lowercase.as_str() {
        "arte" => 0,
        "filosofia" => 1,
        "fisica" => 2,
        "inglese" => 3,
        "italiano" => 4,
        "latino" => 5,
        "matematica" => 6,
        "scienze" => 7,
        "storia" => 8,
        _ => return Err(format!("Materia sconosciuta: {}", materia)),
    };

    let argomenti = match &mut materie[indice_materia] {
        Materia::Arte { argomenti }
        | Materia::Filosofia { argomenti }
        | Materia::Fisica { argomenti }
        | Materia::Inglese { argomenti }
        | Materia::Italiano { argomenti }
        | Materia::Latino { argomenti }
        | Materia::Matematica { argomenti }
        | Materia::Scienze { argomenti }
        | Materia::Storia { argomenti } => argomenti,
    };

    let num_argomenti_iniziale = argomenti.len();

    //eliminare l'argomento
    argomenti.retain(|a| a.nome.to_lowercase() != nome.to_lowercase());

    if argomenti.len() == num_argomenti_iniziale {
        return Err(format!("Argomento '{}' non trovato nella materia '{}'", nome, materia));
    }

    salva_materie(materie).map_err(|_| "Errore durante il salvataggio delle materie".into())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    if let Err(e) = inizializza_file_materie() {
        println!("Errore durante l'inizializzazione del file materie.json: {}", e);
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![inserisci_argomento, ottieni_materie_json, modifica_argomento, elimina_argomento])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}