use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Argomento {
    pub nome: String,
    pub materia: String,
    pub descrizione: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Materia {
    Arte { argomenti: Vec<Argomento> },
    Filosofia { argomenti: Vec<Argomento> },
    Fisica { argomenti: Vec<Argomento> },
    Inglese { argomenti: Vec<Argomento> },
    Italiano { argomenti: Vec<Argomento> },
    Latino { argomenti: Vec<Argomento> },
    Matematica { argomenti: Vec<Argomento> },
    Scienze { argomenti: Vec<Argomento> },
    Storia { argomenti: Vec<Argomento> },
}

impl Argomento {
    pub fn new(nome: String, materia: String, descrizione: String) -> Self {
        Self {
            nome,
            materia,
            descrizione,
        }
    }
}

impl Materia {
    pub fn aggiungi_argomento(&mut self, argomento: Argomento) -> Result<(), String> {
        match argomento.materia.as_str().trim().to_lowercase().as_str() {
            "arte" => {
                if let Materia::Arte { argomenti } = self {
                    argomenti.push(argomento);
                    Ok(())
                } else {
                    Err("La meteria non corrisponde".into())
                }
            }
            "filosofia" => {
                if let Materia::Filosofia { argomenti } = self {
                    argomenti.push(argomento);
                    Ok(())
                } else {
                    Err("La meteria non corrisponde".into())
                }
            }
            "fisica" => {
                if let Materia::Fisica { argomenti } = self {
                    argomenti.push(argomento);
                    Ok(())
                } else {
                    Err("La meteria non corrisponde".into())
                }
            }
            "inglese" => {
                if let Materia::Inglese { argomenti } = self {
                    argomenti.push(argomento);
                    Ok(())
                } else {
                    Err("La meteria non corrisponde".into())
                }
            }
            "italiano" => {
                if let Materia::Italiano { argomenti } = self {
                    argomenti.push(argomento);
                    Ok(())
                } else {
                    Err("La meteria non corrisponde".into())
                }
            }
            "latino" => {
                if let Materia::Latino { argomenti } = self {
                    argomenti.push(argomento);
                    Ok(())
                } else {
                    Err("La meteria non corrisponde".into())
                }
            }
            "matematica" => {
                if let Materia::Matematica { argomenti } = self {
                    argomenti.push(argomento);
                    Ok(())
                } else {
                    Err("La meteria non corrisponde".into())
                }
            }
            "scienze" => {
                if let Materia::Scienze { argomenti } = self {
                    argomenti.push(argomento);
                    Ok(())
                } else {
                    Err("La meteria non corrisponde".into())
                }
            }
            "storia" => {
                if let Materia::Storia { argomenti } = self {
                    argomenti.push(argomento);
                    Ok(())
                } else {
                    Err("La meteria non corrisponde".into())
                }
            }
            _ => Err(format!("Materia sconosciuta: {}", argomento.materia)),
        }
    }
}
