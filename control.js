const { select, input, checkbox } = require('@inquirer/prompts')

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

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para alterna entre as metas, o Espaço para selecionar e o Enter para confirmar",
        choices: [...metas],
        instructions: false,
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })


        meta.checked = true
    })

    console.log('Meta(s) concluida)(s)')

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log("Não há metas realizadas")
        return
    }

    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })
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
                name: "Metas Realizadas" ,
                value: "realizadas"
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
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "sair":
                console.log("Saindo...")
                return
        }
    }
}

    

start()