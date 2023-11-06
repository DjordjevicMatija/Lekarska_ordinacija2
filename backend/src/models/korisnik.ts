import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    imejl: {
        type: String
    },
    licenca: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    ogranak: {
        type: String
    },
    tip: {
        type: String
    },
    slika: {
        type: String
    }
})

export default mongoose.model('KorisnikModel', Korisnik, 'Korisnici');