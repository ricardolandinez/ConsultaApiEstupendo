

const cufes = [
    {
        $match: {
       //   receptor_id:"5dc19bbb745ded0e54558bf8",
            formaPago: "2",
            tipo_documento: "01",
            estado: { $ne: 5 },
            created_at: {

                $gte: new Date("2024-03-01T00:00:00-05:00"),
                $lte: new Date("2024-03-16T23:59:59-05:00")
            }
        }

    },
    {
        $project: {
            CUFE: "$cufe",
            Documento: "$numeral",
            _id: 1

        }
    }

]


export { cufes }