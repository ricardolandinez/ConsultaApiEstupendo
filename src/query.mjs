

const cufes = [
    {
        $match: {
                numeral: "CR1488",
                created_at: { 
                $gte: new Date("2024-03-01T00:00:00-05:00"), 
                $lte: new Date("2024-03-12T23:59:59-05:00") }
            }
        
    },
    { $limit: 3 },
    {
        $project: {
            CUFE: "$cufe",
            Documento: "$numeral",
            _id: 0

        }
    }

]


export {cufes}