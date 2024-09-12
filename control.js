const { select, input } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar agua todo dia',
    checked: false,
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta:"})

    if(meta.length == 0) {
        console.log("Você precisa escrever uma meta.")
        return
    }

    metas.push(
        { value: meta, checked: false }
    )

}

const start = async () => {

    while(true){
        
        const opcao = await select({
            message: "menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas" ,
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })


        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                console.log("vamos listar")  
                break
            case "sair":
                console.log("Saindo...")
                return
        }
    }
}

    

start()