import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ZahtevPregled = new Schema({
    naziv: {
        type: String
    },
    specijalizacija: {
        type: String
    }
})

export default mongoose.model('ZahtevPregledModel', ZahtevPregled, 'ZahteviZaPreglede');