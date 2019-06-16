let selects: any = [{
    maturityArea: [{
        value: 1,
        description: 'Internacional' 
    }, {
        value: 2,
        description: 'Nacional'
    }, {
        value: 3,
        description: 'Local'
    }],
    comercialArea: [{
        value: 'comercio',
        description: 'Comércio' 
    }, {
        value: 'industria',
        description: 'Indústria' 
    }, {
        value: 'servicos',
        description: 'Serviços'
    }],
    phoneType: [{
        value: 1,
        description: 'Telefone fixo'
    }, {
        value: 2,
        description: 'Celular'
    }, {
        value: 3,
        description: 'Fax'
    }, {
        value: 4,
        description: 'Contato'
    }],
    productArea: [{
        value: 1,
        description: 'Produto 1',
        subgroups: [1,3]
    }, {
        value: 2,
        description: 'Produto 2',
        subgroups: [1,2]
    }, {
        value: 3,
        description: 'Produto 3',
        subgroups: [2]
    }, {
        value: 4,
        description: 'Produto 4',
        subgroups: [4]
    }],
    socialMedias: [{
        value: 'facebook',
        description: 'Facebook'
    }, {
        value: 'instagram',
        description: 'Instagram'
    }, {
        value: 'twitter',
        description: 'Twitter'
    }, {
        value: 'linkedin',
        description: 'Linkedin'
    }, {
        value: 'googleplus',
        description: 'Google+'
    }],
    subgroupArea: [{
        value: 1,
        description: 'Setor 1'
    }, {
        value: 2,
        description: 'Setor 2'
    }, {
        value: 3,
        description: 'Setor 3'
    }, {
        value: 4,
        description: 'Setor 4'
    }],
    treatment: [{
        value: 'sr',
        description: 'Senhor'
    }, {
        value: 'sra',
        description: 'Senhora'
    }],
    schooling: [{
        value: 'analfabeto',
        description: 'Não alfabetizado'
    }, {
        value: 'fundamental',
        description: 'Fundamental completo'
    }, {
        value: 'medio',
        description: 'Médio completo'
    }, {
        value: 'superior',
        description: 'Superior completo'
    }],
    languages: [{
        description: "Inglês"
    }, {
        description: "Francês"
    }, {
        description: "Espanhol"
    }, {
        description: "Português"
    }, {
        description: "Outros"
    }]
}]

export{selects}