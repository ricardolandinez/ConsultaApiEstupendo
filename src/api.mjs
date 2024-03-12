import axios from "axios"
import { closeConnection, connect } from "./db.mjs"
import { cufes } from "./query.mjs"
import fs from "fs"
import path from "path"
import { cwd } from "./utils.mjs"
import dotenv from "dotenv"

dotenv.config()

const documentos032 = []
const client =  connect()
const getCustomersData = async () => {
  const db = client.db("stupendo")
  const result = await db.collection("documentos_rec")
    .aggregate(cufes)
    .toArray()

  return result
}

const callApi = async () => {
  const data = await getCustomersData()
  for(const item of data ) {
    const {data} = await axios.post("https://app.estupendo.com.co/api/documento/consultar/estado/dian",{cufe: item.CUFE},{
      headers: {
        Authorization: process.env.API_AUTHORIZATION_KEY,
      },
      method: "POST",
    })
    if(Object.keys(data.Eventos).length == 1 && '032' in data.Eventos){
      const documento = item.Documento
      documentos032.push(documento)
      
      fs.appendFileSync(path.join(cwd(),"output.txt"),documento)
    }
  }
  closeConnection(client)
}


export { callApi }
