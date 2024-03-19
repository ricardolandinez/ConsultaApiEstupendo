import axios from "axios"
import { closeConnection, connect } from "./db.mjs"
import { cufes } from "./query.mjs"
import fs from "fs"
import path from "path"
import { cwd } from "./utils.mjs"
import dotenv from "dotenv"

dotenv.config()

const documentos032 = []
const noProcessDocument = [];
const client = connect()
const getCustomersData = async () => {
  const db = client.db("stupendo")
  const result = await db.collection("documentos_rec")
    .aggregate(cufes)
    .toArray()

  return result
}

const callApi = async () => {

  const data = await getCustomersData()
  for (const item of data) {
    try {
      const { data, status } = await axios.post("https://app.estupendo.com.co/api/documento/consultar/estado/dian", { cufe: item.CUFE }, {
        headers: {
          Authorization: process.env.API_AUTHORIZATION_KEY,
        },
        method: "POST",
      })
    console.log(item.Documento, status)
      if (!data?.Eventos) continue;
      if (Object.keys(data.Eventos).length == 1 && '032' in data.Eventos) {
        const documento = `${item.Documento},${item._id}  \n`
        documentos032.push(documento)
  
        fs.appendFileSync(path.join(cwd(), "output.txt"), documento)
      }
    }catch (error) {
      noProcessDocument.push({
        documento : item.Documento,
        status : error.status,
        errorMessage : error.message
      })
      continue;
    }
  }
  fs.writeFileSync(path.join(cwd(), "error.json"),JSON.stringify(noProcessDocument,null,4))
  closeConnection(client)

}


export { callApi }
