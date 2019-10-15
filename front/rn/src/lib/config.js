const baseUrl = {apo: "https://sfms.metalsa.com",
                et: "https://sfms-et.metalsa.com", 
                test_apo: "http://i40appslaveqa.westus.cloudapp.azure.com", 
                test_et: "http://i40appslaveqa.westus.cloudapp.azure.com/et", 
                server: "http://10.196.28.214",
                local: "http://10.196.28.127:1337"}
const envs = {
    apo: {baseUrl: baseUrl.apo, wsUrl: (baseUrl.apo +":9999")},
    et: {baseUrl: baseUrl.et, wsUrl: (baseUrl.et +":9999")},
    test_apo: {baseUrl: baseUrl.test_apo, wsUrl: (baseUrl.test_apo +":9999")},
    test_et: {baseUrl: baseUrl.test_et, wsUrl: (baseUrl.test_apo +":9998")},
    server: {baseUrl: baseUrl.server, wsUrl: (baseUrl.server +":9999")},
    local: {baseUrl: baseUrl.local, wsUrl: (baseUrl.server +":9999")},
} 
const config = {
    version: '2.0',
    development: {
        baseUrl: baseUrl.local,
        apo_schulerA: envs.local,
        apo_schulerB: envs.local,
        apo_fagorA: envs.local,
        apo_fagorB: envs.local,
        et_k14: envs.local,
        et_k15: envs.local,
        env: 'local'
    },
    server: {
        baseUrl: baseUrl.server,
        apo_schulerA: envs.server,
        apo_schulerB: envs.server,
        apo_fagorA: envs.server,
        apo_fagorB: envs.server,
        et_k14: envs.server,
        et_k15: envs.server,
        env: 'server'
    },
    testing: {
        baseUrl: baseUrl.test_apo,
        apo_schulerA: envs.test_apo,
        apo_schulerB: envs.test_apo,
        apo_fagorA: envs.test_apo,
        apo_fagorB: envs.test_apo,
        et_k14: envs.test_et,
        et_k15: envs.test_et,
        env: 'testing'
    },
    mtesting: {
        baseUrl: baseUrl.apo,
        apo_schulerA: envs.apo,
        apo_schulerB: envs.apo,
        apo_fagorA: envs.test_apo,
        apo_fagorB: envs.test_apo,
        et_k14: envs.et,
        et_k15: envs.et,
        env: 'mtesting'
    },
    etesting: {
        baseUrl: baseUrl.apo,
        apo_schulerA: envs.apo,
        apo_schulerB: envs.apo,
        apo_fagorA: envs.apo,
        apo_fagorB: envs.apo,
        et_k14: envs.et,
        et_k15: envs.et,
        env: 'etesting'
    },
    production: {
        baseUrl: baseUrl.apo,
        apo_schulerA: envs.apo,
        apo_schulerB: envs.apo,
        apo_fagorA: envs.apo,
        apo_fagorB: envs.apo,
        apo_k1200: envs.apo,
        apo_jinan: envs.apo,
        apo_e1500: envs.apo,
        apo_aida: envs.apo,
        apo_d800: envs.apo,
        apo_f3600: envs.apo,
        et_k1: envs.et,
        et_k2: envs.et,
        et_k3: envs.et,
        et_k4: envs.et,
        et_k5: envs.et,
        et_k6: envs.et,
        et_k7: envs.et,
        et_k8: envs.et,
        et_k9: envs.et,
        et_k14: envs.et,
        et_k15: envs.et,
        env: 'production'
    }
};

module.exports = config;