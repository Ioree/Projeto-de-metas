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

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensADeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itensADeletar.length == 0) {
        console.log("Nenhum item selecionado")
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("metas(s) deleta(s) com sucesso!")

}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para alterna entre as metas, o Espaço para selecionar e o Enter para confirmar",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada")
        return
    }

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
        message: "Metas realizadas:" + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        console.log("Não existem metas abertas")
        return
    }

    await select ({
        message: "Metas Abertas:" + abertas.length,
        choices: [...abertas]
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
                    name: "Deletar Meta",
                    value: "deletar"
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
                    name: "Metas Abertas" ,
                    value: "abertas"
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
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Saindo...")
                return
        }
    }
}

    

start()