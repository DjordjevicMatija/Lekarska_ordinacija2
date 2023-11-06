import mongoose from "mongoose";

const Schema = mongoose.Schema;

let VrstaPregleda = new Schema({
    naziv: {
        type: String
    },
    trajanje_u_min: {
        type: Number
    },
    cena: {
        type: Number
    },
    specijalizacija: {
        type: String
    },
    lekari: [
        { type: String }
    ]
})

export default mongoose.model('VrstaPregledaModel', VrstaPregleda, 'VrstePregleda');