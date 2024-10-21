use crate::utils::structures::Argomento;
use crate::utils::structures::Materia;
use dirs::data_dir;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

const JSON_DEFAULT: &str = include_str!("materie.json");

pub fn inizializza_file_materie() -> std::io::Result<()> {
    let data_dir = data_dir().expect("Errore nella recupero della directory di dati");
    let percorso_file = data_dir.join("materie.json");

    // Controlla se il file esiste già
    if !Path::new(&percorso_file).exists() {
        // Se non esiste, copia il file incorporato
        fs::write(&percorso_file, JSON_DEFAULT)?;
        println!("File materie.json copiato nella directory locale");
    } else {
        println!("Il file materie.json esiste già");
    }

    Ok(())
}

#[derive(Debug, Deserialize, Serialize)]
struct MaterieWrapper {
    materie: Vec<JsonMateria>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct JsonMateria {
    nome: String,
    argomenti: Vec<JsonArgomento>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct JsonArgomento {
    nome: String,
    materia: String,
    descrizione: String,
    collegamenti: String,
    voto: f32,
}

pub fn leggi_materie_da_file() -> Vec<JsonMateria> {
    let data_dir = data_dir().expect("Errore nella recupero della directory di dati");
    let percorso_file = data_dir.join("materie.json");
    let file_contenuto =
        fs::read_to_string(percorso_file).expect("Errore nella lettura del file JSON");
    let wrapper: MaterieWrapper =
        serde_json::from_str(&file_contenuto).expect("Errore nella deserializzazione del JSON");
    wrapper.materie
}

impl From<JsonMateria> for Materia {
    fn from(json_materia: JsonMateria) -> Materia {
        let argomenti: Vec<Argomento> = json_materia
            .argomenti
            .into_iter()
            .map(|a| Argomento {
                nome: a.nome,
                materia: a.materia,
                descrizione: a.descrizione,
                collegamenti: a.collegamenti,
                voto: a.voto
            })
            .collect();

        match json_materia.nome.as_str() {
            "Arte" => Materia::Arte { argomenti },
            "Filosofia" => Materia::Filosofia { argomenti },
            "Fisica" => Materia::Fisica { argomenti },
            "Inglese" => Materia::Inglese { argomenti },
            "Italiano" => Materia::Italiano { argomenti },
            "Latino" => Materia::Latino { argomenti },
            "Matematica" => Materia::Matematica { argomenti },
            "Scienze" => Materia::Scienze { argomenti },
            "Storia" => Materia::Storia { argomenti },
            _ => panic!("Materia sconosciuta: {}", json_materia.nome),
        }
    }
}

pub fn ottieni_materie() -> Result<Vec<Materia>, Box<dyn std::error::Error>> {
    let json_materie = leggi_materie_da_file();
    let materie = json_materie.into_iter().map(Materia::from).collect();
    Ok(materie)
}

#[tauri::command]
pub fn ottieni_materie_json() -> Result<Vec<JsonMateria>, tauri::Error> {
    let json_materie = leggi_materie_da_file();
    Ok(json_materie)
}

impl JsonMateria {
    pub fn from_materia(materia: &Materia) -> Self {
        let argomenti = match materia {
            Materia::Arte { argomenti } => argomenti
                .iter()
                .map(|a| JsonArgomento {
                    nome: a.nome.clone(),
                    materia: "Arte".to_string(),
                    descrizione: a.descrizione.clone(),
                    collegamenti: a.collegamenti.clone(),
                    voto: a.voto
                })
                .collect(),
            Materia::Filosofia { argomenti } => argomenti
                .iter()
                .map(|a| JsonArgomento {
                    nome: a.nome.clone(),
                    materia: "Filosofia".to_string(),
                    descrizione: a.descrizione.clone(),
                    collegamenti: a.collegamenti.clone(),
                    voto: a.voto
                })
                .collect(),
            Materia::Fisica { argomenti } => argomenti
                .iter()
                .map(|a| JsonArgomento {
                    nome: a.nome.clone(),
                    materia: "Fisica".to_string(),
                    descrizione: a.descrizione.clone(),
                    collegamenti: a.collegamenti.clone(),
                    voto: a.voto
                })
                .collect(),
            Materia::Inglese { argomenti } => argomenti
                .iter()
                .map(|a| JsonArgomento {
                    nome: a.nome.clone(),
                    materia: "Inglese".to_string(),
                    descrizione: a.descrizione.clone(),
                    collegamenti: a.collegamenti.clone(),
                    voto: a.voto
                })
                .collect(),
            Materia::Italiano { argomenti } => argomenti
                .iter()
                .map(|a| JsonArgomento {
                    nome: a.nome.clone(),
                    materia: "Italiano".to_string(),
                    descrizione: a.descrizione.clone(),
                    collegamenti: a.collegamenti.clone(),
                    voto: a.voto
                })
                .collect(),
            Materia::Latino { argomenti } => argomenti
                .iter()
                .map(|a| JsonArgomento {
                    nome: a.nome.clone(),
                    materia: "Latino".to_string(),
                    descrizione: a.descrizione.clone(),
                    collegamenti: a.collegamenti.clone(),
                    voto: a.voto
                })
                .collect(),
            Materia::Matematica { argomenti } => argomenti
                .iter()
                .map(|a| JsonArgomento {
                    nome: a.nome.clone(),
                    materia: "Matematica".to_string(),
                    descrizione: a.descrizione.clone(),
                    collegamenti: a.collegamenti.clone(),
                    voto: a.voto
                })
                .collect(),
            Materia::Scienze { argomenti } => argomenti
                .iter()
                .map(|a| JsonArgomento {
                    nome: a.nome.clone(),
                    materia: "Scienze".to_string(),
                    descrizione: a.descrizione.clone(),
                    collegamenti: a.collegamenti.clone(),
                    voto: a.voto
                })
                .collect(),
            Materia::Storia { argomenti } => argomenti
                .iter()
                .map(|a| JsonArgomento {
                    nome: a.nome.clone(),
                    materia: "Storia".to_string(),
                    descrizione: a.descrizione.clone(),
                    collegamenti: a.collegamenti.clone(),
                    voto: a.voto
                })
                .collect(),
        };

        JsonMateria {
            nome: match materia {
                Materia::Arte { .. } => "Arte".to_string(),
                Materia::Filosofia { .. } => "Filosofia".to_string(),
                Materia::Fisica { .. } => "Fisica".to_string(),
                Materia::Inglese { .. } => "Inglese".to_string(),
                Materia::Italiano { .. } => "Italiano".to_string(),
                Materia::Latino { .. } => "Latino".to_string(),
                Materia::Matematica { .. } => "Matematica".to_string(),
                Materia::Scienze { .. } => "Scienze".to_string(),
                Materia::Storia { .. } => "Storia".to_string(),
            },
            argomenti,
        }
    }
}

pub fn salva_materie(materie: Vec<Materia>) -> Result<(), std::io::Error> {
    let data_dir = data_dir().expect("Errore nella recupero della directory di dati");
    let percorso_file = data_dir.join("materie.json");

    // Converti il vettore di Materia in un vettore di JsonMateria
    let json_materie: Vec<JsonMateria> = materie.iter().map(JsonMateria::from_materia).collect();

    // Costruire un wrapper per le materie
    let wrapper = MaterieWrapper {
        materie: json_materie,
    };

    // Serializzare il wrapper
    let json = serde_json::to_string_pretty(&wrapper)?;
    fs::write(&percorso_file, json)
}
