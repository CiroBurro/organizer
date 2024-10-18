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
}

pub fn leggi_materie_da_file() -> Vec<JsonMateria> {
    let data_dir = data_dir().expect("Errore nella recupero della directory di dati");
    let percorso_file = data_dir.join("materie.json");
    let file_contenuto = fs::read_to_string(percorso_file).expect("Errore nella lettura del file JSON");
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

pub fn salva_materie(materie: Vec<Materia>) -> Result<(), std::io::Error> {
    let data_dir = data_dir().expect("Errore nella recupero della directory di dati");
    let percorso_file = data_dir.join("materie.json");

    let json = serde_json::to_string_pretty(&materie)?;
    fs::write(&percorso_file, json)
}