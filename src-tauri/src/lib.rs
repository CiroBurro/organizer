pub mod utils;
use utils::json_to_materia::{ottieni_materie, inizializza_file_materie, salva_materie, ottieni_materie_json};
use utils::structures::Argomento;

#[tauri::command]
fn inserisci_argomento(materia: String, nome: String, descrizione: String) -> Result<(), String> {

    if let Err(e) = inizializza_file_materie() {
        println!("Errore durante l'inizializzazione del file materie.json: {}", e);
    }

    let mut materie = match ottieni_materie() {
        Ok(materie) => materie,
        Err(_) => return Err("Errore durante l'ottenimento delle materie".into()),
    };
    
    let argomento = Argomento::new(nome, materia, descrizione);
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




#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    if let Err(e) = inizializza_file_materie() {
        println!("Errore durante l'inizializzazione del file materie.json: {}", e);
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![inserisci_argomento, ottieni_materie_json])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}