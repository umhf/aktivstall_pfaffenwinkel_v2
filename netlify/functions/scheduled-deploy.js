import fetch from "node-fetch"
import { schedule } from '@netlify/functions'
import { shouldDeploy } from "./should-start-deploy";
const BUILD_HOOK = "https://api.netlify.com/build_hooks/6371e615528c7870cd4659e3";

async function startDeploy() {
    await fetch(BUILD_HOOK, {
        method: "POST"
    }).then(response => {
        console.log("Build hook response:", response)
    })
}

export const handler = schedule("0-59/5 * * * *", async () => {
    return shouldDeploy().then(res => {
        if (res) {
            return startDeploy().then(() => {
                return {
                    statusCode: 200,
                    body: JSON.stringify(res)

                }
            })
        }
    })
    
})