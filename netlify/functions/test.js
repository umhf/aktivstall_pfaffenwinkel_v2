import fetch from "node-fetch"
import { shouldDeploy } from "./should-start-deploy";
const BUILD_HOOK = "https://api.netlify.com/build_hooks/6371e615528c7870cd4659e3";

async function startDeploy() {
    await fetch(BUILD_HOOK, {
        method: "POST"
    }).then(response => {
        console.log("Build hook response:", response)
    })
}

export const handler =  async () => {
    return shouldDeploy().then(res => {
        res && startDeploy()
        console.log(res)
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }
    })
    
}